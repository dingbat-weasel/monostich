import { Box, Grid } from "@mui/material";
import React from "react";

import Navbar from "../../components/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />

      {/* Top Spacing */}
      <Grid item xs={12} m={4}></Grid>

      {/* Page */}
      <Grid container mx={{ xs: 2, md: 6, lg: 10 }}>
        {/* Left Container */}
        <Grid item xs={12} md={8}></Grid>

        {/* Center Container */}
        <Grid item xs={12} md={8}></Grid>

        {/* Right Container */}
        <Grid item md={4} sx={{ display: { xs: "none", md: "grid" } }}></Grid>
      </Grid>
    </>
  );
};

export default Profile;
