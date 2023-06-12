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

// Notes for morning
// Need to setup functionality for moving tile from staged->unstaged, just a reverse of what we have so far
// understand what you did while sleep deprived, read your code and understand
// check it works with larger number of tiles
// bring back normal dragging within the component... remember our friend <dragging>, how do we get the two to work together
// setup functionality for reading the array of strings from the staging area
// create submit button function that posts mutation to db

const Build = () => {
  const [tiles, setTiles] = useState(
    tileObjSubArr.map((tiles) => ({
      ...tiles,
      staged: false,
      top: Math.floor(Math.random() * 100) + "%",
      left: Math.floor(Math.random() * 100) + "%",
    }))
  );
  const [staged, setStaged] = useState([]);
  // const [unstaged, setUnstaged] = useState(tiles);
  const tilesArr = tiles;
  const stagedArr = staged;
  // const unstagedArr = unstaged;

  const addToStaged = function ({ id, str }) {
    stagedArr.push({ id, str });
    setStaged(stagedArr);
    console.log(staged);
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
                <Stage staged={staged} />
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
              <Sandbox tiles={tiles} addToStaged={addToStaged} />
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
