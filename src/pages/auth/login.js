"use client";
import { useState,useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Stack, Card,TextField, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Image from "next/image";
import { API_BASE_URL } from "../../utils/Api.js";
import { useAuthContext } from "src/contexts/auth-context";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuthContext();;
  useEffect(() => {
    if(window.sessionStorage.getItem("authenticated") === "true"){
      router.push("/");
    }
  }, []);
  const handleLogin = async () => {
    event.preventDefault();
    setLoading(true);
    const f = new FormData();
    f.append("action", "login_admin");
    f.append("username", email);
    f.append("password", password);

    axios({
      method: "post",
      url: API_BASE_URL+"/admins",
      data: f,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {

        setLoading(false);
        console.log(response);
        if(response.data.status === 1) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          signIn(token);
          toast.success(response.data.msg);
          signIn(email,password);
         router.push("/");

        }else{
         
          toast.error(response.data.msg);
         
        }
      
      })
      .catch(function (response) {
        setLoading(false);
        console.log(response);
        toast.error("Something want wrong");
      });
  };

  return (
    <>
      <Head>
        <title>Viyu Games</title>
      </Head>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor:"#FFFFFF",
          borderBottom:"2px solid #6366f1"
        }}
      >
        <img
          src="/assets/favicon.png"
          style={{ height: "4em", margin: "1em" }}
        />
        <Typography variant="h6" style={{ marginRight: "1em" }}>
          Viyu Games
        </Typography>
      </div>
      <Box
        sx={{
          backgroundColor: "#EEECED",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          padding: 1,
        }}
      >
          <Card sx={{ minWidth: 450,borderRadius:1 ,  padding:1,}}>
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "60px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 5 }}>
              <Typography variant="h4" sx={{textAlign: "center"}}>Login</Typography>
            </Stack>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email "
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                value={email}
              />
              <TextField
                fullWidth
                label="Password "
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                value={password}
              />
            </Stack>

            <Button
              fullWidth
              size="large"
              sx={{ mt: 5 }}
              type="submit"
              variant="contained"
              onClick={handleLogin}
            >
              {loading && ( <CircularProgress color="inherit" sx={{mr:1}} />)}
                 LOGIN
            </Button>
          </div>
        </Box>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Page;
