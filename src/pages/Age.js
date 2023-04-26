import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { BsArrowDownSquareFill } from "react-icons/bs";

import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Card, InputAdornment, OutlinedInput } from "@mui/material";
import { applyPagination } from "src/utils/apply-pagination";
import { AgeTable } from "@/components/Analytics/AgeTable";
import { Layout as DashboardLayout } from "../components/Navbar/layout";
const now = new Date();

const data = [
  {
    id: 1,
    location: "Punjab",
    one: 10,
    two: 10,
    three: 10,
    four: 10,
    five: 10,
    six: 10,
  },
  {
    id: 2,
    location: "Delhi",
    one: 10,
    two: 10,
    three: 10,
    four: 10,
    five: 10,
    six: 10,
  },
];

const usePagination = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Age | Viyu Games</title>
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
                <Typography variant="h4">Age</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
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
                defaultValue=""
                fullWidth
                placeholder="Search"
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
            <AgeTable
              count={data.length}
              items={customers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
