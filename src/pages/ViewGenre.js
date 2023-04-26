import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { RxMagnifyingGlass } from "react-icons/rx";
import {
  Card,
  InputAdornment,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import { BsArrowDownSquareFill, BsFillPlusSquareFill } from "react-icons/bs";
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
import json2csv from "json2csv";
import { applyPagination } from "src/utils/apply-pagination";
import { GenreTable } from "@/components/GenreTable";
import { API_BASE_URL } from "@/utils/Api";
import axios from "axios";
import { Layout as DashboardLayout } from "../components/Navbar/layout";
import { getGenre } from "@/utils/genre";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [searchTerm, setSearchTerm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const GenreItems = usePagination(genre, page, rowsPerPage);
  const [loading, setLoading] = useState(false);
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

    const f = new FormData();
    f.append("action", "add_new_category");
    f.append("name", category);
    f.append("image", image);

    setLoading(true); // Set isLoading to true when submitting the form
    if (category) {
      axios({
        method: "post",
        url: `${API_BASE_URL}/categories?token=${token}`,
        data: f,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          if (isApiCallInProgress) {
            return; // Don't do anything if API call is already in progress
          }
          if (response.data.status === 1) {
            setIsApiCallInProgress(true);
            toast.success(response.data.msg);
            handleClose();
          } else {
            toast.error(response.data.msg);
          }
        })
        .catch(function (error) {})
        .finally(function () {
          setLoading(false);
          fetchMain();
          setCategory(null);
          setIsApiCallInProgress(false); // Set isLoading to false when the response comes
        });
    } else {
      setLoading(false);
      toast.error("Enter Name");
    }
  };
  const fetchMain = async () => {
    const randomString = Math.random().toString(36).substring(7);
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/categories?${randomString}`, {
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
        setGenre(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // set loading state back to false
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
    const csvData = json2csv.parse(genre);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Genre_${now.toISOString()}.csv`;
    a.click();
  }, [genre]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageName(e.target.files[0].name);
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  

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
          <Stack spacing={3} marginTop="20px" marginBottom="50px">
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h6">View Genre</Typography>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Genre</DialogTitle>
        <DialogContent>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Enter Name"
                  name="title"
                  onChange={(event) => setCategory(event.target.value)}
                  required
                  value={category}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <label htmlFor="btn-upload">
                  <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span"
                    sx={{ mr: 1 }}
                  >
                    Choose Files
                  </Button>
                  {imageName.length > 10
                    ? "..." +
                      imageName.slice(imageName.length - 10, imageName.length)
                    : imageName}
                </label>
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
