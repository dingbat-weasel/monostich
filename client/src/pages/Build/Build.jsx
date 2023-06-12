import React, { useState } from "react";

// Materials
import { Container, Grid, Box, Paper, Button } from "@mui/material";

// Components
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";
import Tile from "../../components/Tile";

// Data
import { tileArr, keyedTiles, tileMap } from "../../data/tileSet";

// Functions
const getRandomSubArr = (arr, size) => {
  let shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
};

// const setStartingPos = () => {
// Random start position and non overlapping as default pos in draggable comp
// }

// Variables
const renderTiles = true;
const subArrSize = 55;
const marginVar = 50;
const keyedTileSubArr = getRandomSubArr(keyedTiles, subArrSize);

const Build = () => {
  // Set Staged State to keep track of tiles entering stage

  return (
    <>
      <Navbar />
      <Grid container>
        {/* Top Spacing */}
        <Grid item xs={12} m={4}></Grid>
        {/* Page */}
        <Grid container mx={{ xs: 2, md: 6, lg: 10 }}>
          {/* Main Container */}
          <Grid
            item
            xs={12}
            lg={8}
            sx={{
              overflow: "hidden",
              border: "2px solid gray",
              borderRadius: 5,
            }}
          >
            <Grid
              container
              p={2}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item xs={10}>
                <Container
                  className="stage"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "100%",
                    minHeight: "3rem",
                    height: "auto",

                    border: "2px solid gray",
                    borderRadius: 5,

                    backgroundColor: "lightyellow",
                  }}
                >
                  <Tile
                    tileStr={"test"}
                    tileStyle={{
                      flexGrow: 0,
                      flexShrink: 1,
                      flexBasis: "max-content",
                      height: "max-content",

                      color: "black",
                      backgroundColor: "rgb(240, 240, 240)",
                      borderWidth: "1px 3px 3px 1px",
                      borderStyle: "solid",
                      borderColor: "black",

                      padding: "5px",
                      cursor: "pointer",
                    }}
                  />
                </Container>
              </Grid>
              <Grid
                item
                xs={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  variant={"contained"}
                  size={"large"}
                  sx={{ borderRadius: 5, height: "3rem", margin: "1rem" }}
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>

            <Grid item>
              <Container
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "70vh",

                  alignItems: "center",
                  padding: "2rem",
                }}
              >
                <Container
                  id="sandbox"
                  sx={{
                    position: "relative",
                    display: "flex",

                    flexWrap: "wrap",
                    width: "100%",
                    height: "100%",

                    padding: "3rem",
                  }}
                >
                  {/* {keyedTileSubArr.map(([key, tileStr]) => {
                    return (
                      <Tile
                        key={key}
                        tileStr={tileStr}
                        tileStyle={{
                          position: "absolute",

                          left: Math.floor(Math.random() * 100) + "%",
                          top: Math.floor(Math.random() * 100) + "%",

                          flexGrow: 0,
                          flexShrink: 1,
                          flexBasis: "max-content",
                          height: "max-content",

                          color: "black",
                          backgroundColor: "rgb(240, 240, 240)",
                          borderWidth: "1px 3px 3px 1px",
                          borderStyle: "solid",
                          borderColor: "black",

                          padding: "5px",
                          cursor: "pointer",
                        }}
                      />
                    );
                  })} */}
                  <Tile
                    tileStr={"test"}
                    tileStyle={{
                      flexGrow: 0,
                      flexShrink: 1,
                      flexBasis: "max-content",
                      height: "max-content",

                      color: "black",
                      backgroundColor: "rgb(240, 240, 240)",
                      borderWidth: "1px 3px 3px 1px",
                      borderStyle: "solid",
                      borderColor: "black",

                      padding: "5px",
                      cursor: "pointer",
                    }}
                  />
                </Container>
              </Container>
            </Grid>
          </Grid>

          {/* Sidebar Container */}
          <Grid item xs={0} lg={4}>
            <Sidebar />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Build;
