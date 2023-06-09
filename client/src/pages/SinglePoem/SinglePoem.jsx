import React, { Fragment } from "react";
import Navbar from "../../components/Navbar";

import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Sidebar from "./Sidebar";

const SinglePoem = () => {
  return (
    <>
      <Navbar />
      <Grid container>
        {/* Top Spacing */}
        <Grid item xs={12} m={4}></Grid>
        {/* Page */}
        <Grid container mx={{ xs: 2, md: 6, lg: 10 }}>
          {/* Main Container */}
          <Grid item xs={12} lg={8}></Grid>

          {/* Sidebar Container */}
          <Grid item xs={0} lg={4}></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SinglePoem;
