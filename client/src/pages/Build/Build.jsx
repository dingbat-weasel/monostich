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
import { tileArr, keyedTiles, tileObj } from "../../data/tileSet";
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
const subArrSize = 5;
const marginVar = 50;

// Arr of tiles
// [{key: "", str: ""}]
const tileObjSubArr = getRandomSubArr(tileObj, subArrSize);

const Build = () => {
  const [tiles, setTiles] = useState(
    tileObjSubArr.map((tiles) => ({ ...tiles, staged: false }))
  );
  const tilesArr = tiles;

  const setStagedArr = function () {
    const stagedArr = tilesArr.filter((tile) => tile.staged === true);
    return stagedArr;
  };
  const setUnstagedArr = function () {
    const unstagedArr = tilesArr.filter((tile) => tile.staged === false);
    return unstagedArr;
  };

  const moveTile = function (item) {
    // item is {id: props.id, tileStr: props.str, staged: props.staged}
    // Find index of item in tilesArr
    const objIndex = tilesArr.findIndex((obj) => obj.key === item.key);
    // Update tilesArr with new staged value
    tilesArr[objIndex].staged = !item.staged;
    // Update State with new tile staged status
    setTiles(tilesArr);
    setStagedArr();
    setUnstagedArr();
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
                <Stage moveTile={moveTile} />
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
              <Sandbox tiles={tiles} moveTile={moveTile} />
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
