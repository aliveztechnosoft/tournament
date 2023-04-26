import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Card, InputAdornment, OutlinedInput,CircularProgress } from "@mui/material";
import { BsArrowDownSquareFill,BsFillPlusSquareFill } from "react-icons/bs";
import json2csv from "json2csv";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  
  Unstable_Grid2 as Grid,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Layout as DashboardLayout } from "../components/Navbar/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { DomainTable } from "@/components/DomainTable";
import { API_BASE_URL } from "@/utils/Api";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const now = new Date();

const usePagination = (data, page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [data, page, rowsPerPage]);
};
const Page = () => {
  const [domain, setDomain] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const DomainItems = usePagination(domain, page, rowsPerPage);
  
  const [subDomain, setSubDomain] = useState("");
  const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    event.preventDefault();

    if (isApiCallInProgress) {
      return; // Don't do anything if API call is already in progress
    }
    if(subDomain){
    setIsApiCallInProgress(true);

    try {
      const f = new FormData();
      f.append("action", "add_new_sub_domain");
      f.append("sub_domain", subDomain);
      setLoading(true);
      
      const response = await axios({
        method: "post",
        url: `${API_BASE_URL}/sub-domains?token=${token}`,
        data: f,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      handleClose();
      fetchMain(); 
      setSubDomain("");
      setIsApiCallInProgress(false);
    }
  }
  };


  
  const fetchMain = async () => {
    const randomString = Math.random().toString(36).substring(7);
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/sub-domains?${randomString}`, {
        params: {
          search: searchTerm,
          order: "ASC",
          order_by: "id",
          row_count: 100,
          page: 1,
          token: token,
        },
      })
      .then((response) => {
        setIsLoading(false)
        setDomain(response.data);
        console.log(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);// set loading state back to false
      });
  }
  useEffect(() => {
    fetchMain()
  }, [token, searchTerm]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);
  const handleExport = useCallback(() => {
    const csvData = json2csv.parse(domain);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SubDomain_${now.toISOString()}.csv`;
    a.click();
  }, [domain]);
  return (
    <>
      <Head>
        <title>View Domains| Viyu Games</title>
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
                <Typography variant="h6">View Domain</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    onClick={handleExport}
                    color="inherit"
                    variant="outlined"
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
              <Stack spacing={1}>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    onClick={handleClickOpen}
                    color="primary"
                    variant="outlined"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <BsFillPlusSquareFill />
                      </SvgIcon>
                    }
                  >
                    Add New
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
            <DomainTable
              count={domain.length}
              items={DomainItems}
              setItems={setDomain}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              isLoading={isLoading}
            />
          </Stack>
        </Container>
      </Box>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Genre</DialogTitle>
        <DialogContent>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Enter Sub Domain "
                  name="title"
                  onChange={(event) => setSubDomain(event.target.value)}
                  required
                  value={subDomain}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {loading && (
              <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
            )}
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
