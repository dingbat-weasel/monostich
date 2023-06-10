import * as React from "react";

import { Grid } from "@mui/material";

import Navbar from "../../components/Navbar";
import Main from "./Main";
import Sidebar from "./Sidebar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <Grid container>
        {/* Top Spacing */}
        <Grid item xs={12} m={4}></Grid>

        {/* Page */}
        <Grid container mx={{ xs: 2, md: 6, lg: 10 }}>
          {/* Sidebar Container */}
          <Grid item xs={12} md={4}>
            <Sidebar />
          </Grid>

          {/* Main Container */}
          <Grid item xs={12} md={8}>
            <Main />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
