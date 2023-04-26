import React from "react";
import { Box, Container } from "@mui/material";
const Layout = ({ children }) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Container maxWidth="xl" sx={{ mt: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
