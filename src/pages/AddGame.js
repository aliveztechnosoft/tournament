"use client";
import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Button,
  TextField,
} from "@mui/material";
import { Layout as DashboardLayout } from "../components/Navbar/layout";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import { getGenre } from "@/utils/genre";
import axios from "axios";
import { API_BASE_URL } from "@/utils/Api";
const Page = ({ posts }) => {
  console.log("i am data", posts);
  const [gameName, setGameName] = useState([]);
  const [shortDesc, setShortDesc] = useState([]);
  const [longDesc, setLongDesc] = useState([]);
  const [image, setImage] = useState([]);
  const [gameUrl, setGameUrl] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (event, id) => {
    setSelectedGenre(event.target.value, id);
    console.log(id);
  };
  const [zipFileBlob, setZipFileBlob] = useState([]);
  // useEffect(() => {
  //   const token =
  //     typeof window !== "undefined" && localStorage.getItem("token");
  //   axios
  //     .get(`${API_BASE_URL}/categories`, {
  //       params: {
  //         order: "ASC",
  //         order_by: "id",
  //         row_count: 10,
  //         page: 1,
  //         token: token,
  //       },
  //     })
  //     .then((response) => {
  //       setGenre(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  const handleSubmit = async (event) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    event.preventDefault();

    const f = new FormData();
    f.append("action", "add_new_game");
    f.append("name", gameName);
    f.append("category_id", selectedGenre.id);
    f.append("image", image);
    f.append("short_description", shortDesc);
    f.append("long_description", longDesc);
    f.append("game_url", gameUrl);
    //f.append("zipFile", zipFileBlob, "filename.zip");

    axios({
      method: "post",
      url: `${API_BASE_URL}/games?token=${token}`,
      data: f,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        toast.success(response.data.msg);
      })
      .catch(function (response) {});
  };
  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <>
      <Head>
        <title>Add Games | Viyu Games</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} marginTop="20px">
            <div>
              <Typography variant="h4">Add Games</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={8}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Avatar
                          src={image}
                          sx={{
                            height: 100,
                            mb: 2,
                            width: 100,
                          }}
                        />
                        <Typography gutterBottom variant="h5">
                          Game Thumbnail
                        </Typography>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <FormControl fullWidth>
                        <input
                          id="zip-file-input"
                          type="file"
                          name="url"
                          onChange={handleChange}
                          required
                          accept="image/*"
                          style={{ display: "none" }}
                        />
                        <Button
                          variant="outlined"
                          component="label"
                          htmlFor="zip-file-input"
                          style={{ margin: "10px" }}
                        >
                          Upload Image
                        </Button>
                      </FormControl>
                    </CardActions>

                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3}>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Game Name"
                              name="GameName"
                              onChange={(e) => setGameName(e.target.value)}
                              required
                              type="text"
                              value={gameName}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <FormControl sx={{ minWidth: 120, width: "100%" }}>
                              <InputLabel id="demo-simple-select-autowidth-label">
                                Genre
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={selectedGenre}
                                onChange={(id) => {
                                  handleGenreChange(id);
                                }}
                                label="Action"
                              >
                                {genre.map((item) => {
                                  return (
                                    <MenuItem key={item.id} value={item.id}>
                                      {item.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid xs={12} md={12}>
                            <TextField
                              fullWidth
                              label="Short Description"
                              name="ShortDescription"
                              onChange={(e) => setShortDesc(e.target.value)}
                              type="text"
                              value={shortDesc}
                            />
                          </Grid>
                          <Grid xs={12} md={12}>
                            <TextField
                              fullWidth
                              multiline
                              rows={6}
                              label="Long Description"
                              name="LongDescription"
                              onChange={(e) => setLongDesc(e.target.value)}
                              required
                              value={longDesc}
                            />
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={5}>
                              <TextField
                                fullWidth
                                label="Game URL"
                                name="url"
                                onChange={(e) => setGameUrl(e.target.value)}
                                required
                                value={gameUrl}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={1}
                              mt={1}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="subtitle2">OR</Typography>
                            </Grid>

                            <Grid item xs={12} md={5}>
                              <FormControl fullWidth>
                                <input
                                  id="zip-file-input"
                                  type="file"
                                  name="url"
                                  onChange={handleChange}
                                  required
                                  accept="application/zip"
                                  style={{ display: "none" }}
                                />
                                <Button
                                  variant="outlined"
                                  component="label"
                                  htmlFor="zip-file-input"
                                  style={{ marginTop: "7px" }}
                                >
                                  Upload Zip File
                                </Button>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions
                      sx={{
                        justifyContent: "flex-start",
                        marginLeft: "15px",
                      }}
                    >
                      <Button variant="contained" onClick={handleSubmit}>
                        Add Game
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
        <ToastContainer />
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const data = await getGenre();

  return { props: { posts: data } };
}
