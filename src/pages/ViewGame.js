"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Card, InputAdornment, OutlinedInput } from "@mui/material";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { Layout as DashboardLayout } from "../components/Navbar/layout";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { applyPagination } from "src/utils/apply-pagination";
import json2csv from "json2csv";
import { GameTable } from "@/components/GameTable";
import { API_BASE_URL } from "@/utils/Api";

import axios from "axios";
const now = new Date();

const usePagination = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const Page = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const GameItems = usePagination(games, page, rowsPerPage);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true); // set loading state to true
    const randomString = Math.random().toString(36).substring(7);
    axios
      .get(`${API_BASE_URL}/games?${randomString}`, {
        params: {
          search: searchTerm,
          order: "ASC",
          order_by: "id",
          row_count: 10,
          page: 1,
          token: token,
        },
      })
      .then((response) => {
        setGames(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // set loading state back to false
      });
  }, [token, searchTerm]);

  const [type, setType] = useState("");
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleExport = useCallback(() => {
    const csvData = json2csv.parse(games);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Games_${now.toISOString()}.csv`;
    a.click();
  }, [games]);
  return (
    <>
      <Head>
        <title>View Game | Viyu Games</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3} marginTop="20px" marginBottom="50px">
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h6">View Games</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    onClick={handleExport}
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <BsArrowDownSquareFill />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Card sx={{ p: 2,borderRadius:"10px" }}>
              <OutlinedInput
                fullWidth
                placeholder="Search Game"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <RxMagnifyingGlass />
                    </SvgIcon>
                  </InputAdornment>
                }
                sx={{ maxWidth: 500 }}
              />
            </Card>
            <GameTable
              count={games.length}
              items={GameItems}
              setItems={setGames}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              isLoading={isLoading}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
