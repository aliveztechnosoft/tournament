import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Card, InputAdornment, OutlinedInput } from "@mui/material";
import { BsArrowDownSquareFill } from "react-icons/bs";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import json2csv from "json2csv";
import { applyPagination } from "src/utils/apply-pagination";
import { GenreTable } from "@/components/GenreTable";
import { API_BASE_URL } from "@/utils/Api";
import axios from "axios";
import { Layout as DashboardLayout } from "../components/Navbar/layout";
import { getGenre } from "@/utils/genre";
const now = new Date();

const usePagination = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};
const Page = ({ getGenre }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [genre, setGenre] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const GenreItems = usePagination(genre, page, rowsPerPage);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  useEffect(() => {
    const randomString = Math.random().toString(36).substring(7);
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/categories?${randomString}`, {
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
        setGenre(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // set loading state back to false
      });
  }, [token, searchTerm]);
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleExport = useCallback(() => {
    const csvData = json2csv.parse(genre);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Genre_${now.toISOString()}.csv`;
    a.click();
  }, [genre]);

  return (
    <>
      <Head>
        <title>View Genre | Viyu Games</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3} marginTop="20px">
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">View Genre</Typography>
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
            <Card sx={{ p: 2 }}>
              <OutlinedInput
                fullWidth
                placeholder="Search Genre"
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
            <GenreTable
              count={genre.length}
              items={GenreItems}
              setItems={setGenre}
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
