import React, { useState } from "react";

// Materials
import { Container, Grid, Box, Paper, Button } from "@mui/material";

// Components
import Sidebar from "./Sidebar";
import Stage from "./Stage";
import Navbar from "../../components/Navbar";
import Tile from "../../components/Tile";

// Utilities

// Data
import { tileArr, keyedTiles, tileMap } from "../../data/tileSet";
import Sandbox from "./Sandbox";

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
  const [sandboxed, setSandboxed] = useState();
  const [staged, setStaged] = useState();
  const sandboxedArr = sandboxed || [];
  const stageArr = staged || [];

  const toStagedDragHandler = (item) => {
    stageArr.push(item);
    setStaged(stageArr);

    return staged;
  };

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
                <Stage
                  toStagedDragHandler={toStagedDragHandler}
                  staged={staged}
                />
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
              <Sandbox />
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
