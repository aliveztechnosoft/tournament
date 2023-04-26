import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
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
  Button,
  TextField,
  CardHeader,
} from "@mui/material";
import { useCallback, useState } from "react";
const Page = () => {
  const [values, setValues] = useState({
    title: " ",
    message: "",
    email: "",
    phone: "",
    state: "",
    country: "",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const [age, setAge] = useState("");
  return (
    <>
      <Head>
        <title>Notification | Viyu Games</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} marginTop="20px" marginBottom="50px">
            <div>
              <Typography variant="h6">Send Notifications</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={12} lg={12}>
                  <Card sx={{borderRadius:"10px"}}>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Avatar
                          src={""}
                          sx={{
                            height: 100,
                            mb: 2,
                            width: 100,
                          }}
                        />
                        <Typography gutterBottom variant="h5">
                          Notification Image
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
                              label="Notification Title"
                              name="title"
                              onChange={handleChange}
                              required
                              value={values.country}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Notification Message"
                              name="NotificationTitle"
                              onChange={handleChange}
                              required
                              value={values.message}
                            />
                          </Grid>
                          <Grid xs={12} md={6}>
                            <FormControl
                              variant="standard"
                              sx={{ m: 1, minWidth: 120, width: "100%" }}
                            >
                              <InputLabel id="demo-simple-select-standard-label">
                                Select App
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={() => {}}
                                label="Select App"
                              >
                                <MenuItem value={10}>android</MenuItem>
                                <MenuItem value={20}>IOS</MenuItem>
                                <MenuItem value={30}>Both</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid xs={12} md={6}>
                            <FormControl
                              variant="standard"
                              sx={{ m: 1, minWidth: 120, width: "100%" }}
                            >
                              <InputLabel id="demo-simple-select-standard-label">
                                Action
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={() => {}}
                                label="Action"
                              >
                                <MenuItem value={10}>Open URL</MenuItem>
                                <MenuItem value={20}>Open App</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid xs={12} md={12}>
                            <TextField
                              fullWidth
                              label="URL Destination"
                              name="url"
                              onChange={handleChange}
                              required
                              value={values.country}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <CardHeader subheader="Note : For Better Notification Service we Recommend to Use oneSignal." />
                    </CardContent>
                    <Divider />
                    <CardActions
                      sx={{
                        justifyContent: "flex-start",
                        marginLeft: "15px",
                      }}
                    >
                      <Button variant="contained">Send Notification</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
