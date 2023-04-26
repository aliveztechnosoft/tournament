import { useCallback, useState } from "react";
import {
  Avatar,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "../components/Navbar/layout";
import axios from "axios";
import { API_BASE_URL } from "@/utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";

export const Page = (event) => {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);
  const handleSubmit = async (event) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    event.preventDefault();

    const f = new FormData();
    f.append("action", "add_new_category");
    f.append("name", category);
    f.append("image", image);

    setIsLoading(true); // Set isLoading to true when submitting the form

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
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch(function (error) {})
      .finally(function () {
        setIsLoading(false);
        setCategory(null);
        setIsApiCallInProgress(false); // Set isLoading to false when the response comes
      });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
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
              <Typography variant="h4">Add Genre</Typography>
            </div>
            <div>
              <Card>
                <CardContent sx={{ pt: 3 }}>
                  <Box sx={{ m: -1.5 }}>
                    <Grid container spacing={3}>
                      <Grid xs={12} md={12}>
                        <FileUpload file={image} handleImageChange={setImage} />
                      </Grid>
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
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions
                  sx={{ justifyContent: "flex-start", paddingBottom: "20px" }}
                >
                  <Button variant="contained" onClick={handleSubmit}>
                    Save
                  </Button>
                  {isLoading && (
                    <Box sx={{ ml: 2 }}>
                      {/* Replace this with your loader component */}
                      <CircularProgress size={24} color="inherit" />
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
