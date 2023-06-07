import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";
import Main from "./Main";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Home = () => {
  return (
    <>
      <Navbar />

      <Grid container>
        {/* Top Spacing */}
        <Grid item xs={12} md={12}>
          <Item>xs=12 md=12</Item>
        </Grid>
        <Grid container mx={{ xs: 2, md: 6, lg: 10 }}>
          {/* Main Container */}
          <Grid item xs={12} md={8}>
            <Item>xs=12 md=8</Item>
            <Main />
          </Grid>

          {/* Sidebar Container */}
          <Grid item md={4} sx={{ display: { xs: "none", md: "grid" } }}>
            <Item>xs=0 md=4</Item>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
