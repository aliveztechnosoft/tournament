"use client";
import Head from "next/head";
import NextLink from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import Image from "next/image";

const Page = () => (
  <>
    <Head>
      <title>404 | Viyu Games</title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <Image
              alt="Under development"
              src="/assets/errors/error-404.png"
              width="400"
              height="400"
              style={{
                display: "inline-block",
                maxWidth: "100%",
              }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="text.secondary" variant="body1">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Button
            component={NextLink}
            href="/"
            startIcon={
              <SvgIcon fontSize="small">
                <AiOutlineArrowLeft />
              </SvgIcon>
            }
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back to dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
