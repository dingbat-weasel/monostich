import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// Materials
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";

// Components

// Queries
import { QUERY_USER } from "../../utils/queries";
import AboutUser from "./AboutUser";

export default function Sidebar() {
  const { username } = useParams();

  // Queries
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER, {
    variables: { username: username },
  });

  // Data
  const user = userData?.user || [];

  return (
    <Grid container rowSpacing={2} px={2}>
      {/* User Section */}
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent={"center"}>
          <Avatar
            sx={{
              width: 200,
              height: 200,
            }}
          ></Avatar>
        </Box>
        <Typography variant="h1" display={{ xs: "block", md: "none" }}>
          {user.username}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography># Followers</Typography>
      </Grid>
      <Grid item display={"flex"} xs={12}>
        <Button sx={{ flexGrow: 1 }}>Follow</Button>
      </Grid>

      <Grid item display={{ xs: "none", md: "block" }}>
        <AboutUser />
      </Grid>
    </Grid>
  );
}
