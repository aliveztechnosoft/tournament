"use client";
import { useCallback, useState } from "react";

import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { API_BASE_URL } from "@/utils/Api";
import axios from "axios";
import { Layout as DashboardLayout } from "../components/Navbar/layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subDomain, setSubDomain] = useState("");
  const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);
  const handleSubmit = async (event) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    event.preventDefault();

    if (isApiCallInProgress) {
      return; // Don't do anything if API call is already in progress
    }

    setIsApiCallInProgress(true);

    try {
      const f = new FormData();
      f.append("action", "add_new_sub_domain");
      f.append("sub_domain", subDomain);
      setIsLoading(true);
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
      setIsApiCallInProgress(false);
      setIsLoading(false);
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} marginTop="20px">
            <div>
              <Typography variant="h4">Add Sub Domain</Typography>
            </div>
            <div>
              <Card>
                <CardContent sx={{ pt: 3 }}>
                  <Box sx={{ m: -1.5 }}>
                    <Grid container spacing={3}>
                      <Grid xs={12} md={6}>
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
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "flex-start" }}>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={isApiCallInProgress}
                  >
                    {isApiCallInProgress ? "Loading..." : " Add Sub Domain "}
                  </Button>
                  {isLoading && (
                    <Box sx={{ ml: 2 }}>
                      {/* Replace this with your loader component */}
                      <CircularProgress size={24} />
                    </Box>
                  )}
                </CardActions>
              </Card>
            </div>
          </Stack>
        </Container>
      </Box>
      <ToastContainer />
    </form>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
