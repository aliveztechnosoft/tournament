import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { TotalUser } from "../components/overview/TotalUser";
import { Top10Table } from "../components/overview/Top10Table";
import { TodayUser } from "../components/overview/TodayUser";
import { TotalGames } from "../components/overview/TotalGames";
import { NewGames } from "../components/overview/NewGames";
import { Layout as DashboardLayout } from "../components/Navbar/layout";
import { API_BASE_URL } from "@/utils/Api";
import axios from "axios";
import { useEffect, useState } from "react";
const now = new Date();

const Page = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/dashboard?token=${token}`, {})
      .then((response) => {
        setData(response.data);
        setDataLoaded(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // set loading state back to false
      });
  }, [token]);
  return (
    <>
      <Head>
        <title>Viyu</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: "20px",
          marginBottom: "50px",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <TotalUser
                difference={12}
                positive
                sx={{ height: "80%", marginBottom: "10px",borderRadius:"10px" }}
                value={data.total_subscribers}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <TodayUser
                difference={16}
                positive={false}
                sx={{ height: "80%",borderRadius:"10px" }}
                value={data.new_subscribers}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <NewGames sx={{ height: "80%",borderRadius:"10px" }} value={data.new_games} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <TotalGames sx={{ height: "80%",borderRadius:"10px" }} value={data.total_games} />
            </Grid>

            <Grid xs={12} md={12} lg={12}>
              {dataLoaded && (
                <Top10Table orders={data.top_games} sx={{ height: "100%" ,borderRadius:"10px"}} />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
