import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { useRouter } from "next/navigation";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "src/contexts/auth-context";
import { useNProgress } from "src/hooks/use-nprogress";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import { useState,useEffect } from "react";
const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();
  useEffect(() => {
    if(window.sessionStorage.getItem("authenticated") === "false"){
      router.push("/auth/login");
    }
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Viyu Games</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthConsumer >
            {(auth) =>
              auth.isLoading ? (
                <SplashScreen />
              ) : (
                getLayout(<Component {...pageProps} />)
              )
            }
          </AuthConsumer>
        </ThemeProvider>
      </AuthProvider>
    </CacheProvider>
  );
};

export default App;
