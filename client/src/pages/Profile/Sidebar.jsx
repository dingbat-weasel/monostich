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
import { QUERY_USER, QUERY_USER_POEMS } from "../../utils/queries";

import AboutUser from "./AboutUser";
import PoemCard from "../../components/PoemCard";

export default function Sidebar() {
  const { username } = useParams();
  const featuredMarginVar = 100;

  // Queries
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER, {
    variables: { username: username },
  });

  // Data
  const user = userData?.user || [];
  console.log(user);
  const usernameTile = [`${user.username}'s`, "Profile"];

  return (
    <Grid container rowSpacing={2} px={2}>
      {/* User Section */}
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent={"center"}>
          {/* Featured Poem */}
          <Card
            sx={{
              minWidth: 275,
              my: 4,
              border: "2px solid gray",
              borderRadius: 5,
            }}
          >
            <CardContent>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexWrap: "wrap",
                  width: "100%",
                  minHeight: "3rem",
                  height: "auto",
                  padding: "1rem",
                  border: "2px solid gray",
                  borderRadius: 5,

                  backgroundColor: "lightyellow",
                }}
              >
                {usernameTile.map((str, i) => {
                  return (
                    <Box
                      key={i + str}
                      className="tile"
                      style={{
                        flexGrow: 0,
                        flexShrink: 1,
                        flexBasis: "max-content",
                        height: "max-content",

                        color: "black",
                        backgroundColor: "rgb(240, 240, 240)",
                        borderWidth: "1px 3px 3px 1px",
                        borderStyle: "solid",
                        borderColor: "black",
                        marginTop:
                          Math.floor(Math.random() * featuredMarginVar) + "px",
                        marginBottom:
                          Math.floor(Math.random() * featuredMarginVar) + "px",
                        marginLeft:
                          Math.floor(Math.random() * featuredMarginVar) + "px",
                        marginRight:
                          Math.floor(Math.random() * featuredMarginVar) + "px",
                        padding: "5px",
                      }}
                    >
                      {str}
                    </Box>
                  );
                })}
              </Container>
            </CardContent>
          </Card>
        </Box>
        <Typography variant="h1" display={{ xs: "block", md: "none" }}>
          Profile
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography># Followers</Typography>
      </Grid>
      <Grid item display={"flex"} xs={12}>
        <Button sx={{ flexGrow: 1 }}>Follow</Button>
      </Grid>

      <Grid item xs={12} display={{ xs: "none", md: "block" }}>
        <AboutUser />
      </Grid>
    </Grid>
  );
}
