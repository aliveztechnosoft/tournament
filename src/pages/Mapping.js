import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Card, InputAdornment, OutlinedInput } from "@mui/material";
import { BsArrowDownSquareFill } from "react-icons/bs";
import json2csv from "json2csv";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "../components/Navbar/layout";
import { applyPagination } from "src/utils/apply-pagination";

import { API_BASE_URL } from "@/utils/Api";
import axios from "axios";
import { MappingTable } from "@/components/MappingTable";

const now = new Date();

const usePagination = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const Page = () => {
  const [mapping, setMapping] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const MappingItems = usePagination(mapping, page, rowsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  useEffect(() => {
    const randomString = Math.random().toString(36).substring(7);
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/mappings?${randomString}`, {
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
        setMapping(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // set loading state back to false
      });
  }, [token, searchTerm]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);
  const handleExport = useCallback(() => {
    const csvData = json2csv.parse(mapping);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Mapping_${now.toISOString()}.csv`;
    a.click();
  }, [mapping]);
  return (
    <>
      <Head>
        <title>Mapping| Viyu Games</title>
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
                <Typography variant="h4">View Mapping</Typography>
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
            <MappingTable
              count={data.length}
              items={MappingItems}
              setItems={setMapping}
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
