import React from "react";

// Materials
import { Container, Grid, Box, Paper } from "@mui/material";

// Components
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";
import Tile from "../../components/Tile";

// Data
import { tileArr, keyedTiles, tileMap } from "../../data/tileSet";

// Functions
const randomizeTilePosition = (tileEl) => {
  const marginVar = 50;
  tileEl.style.marginTop = Math.floor(Math.random() * marginVar) + "px";
  tileEl.style.marginRight = Math.floor(Math.random() * marginVar) + "px";
  tileEl.style.marginLeft = Math.floor(Math.random() * marginVar) + "px";
  tileEl.style.marginBottom = Math.floor(Math.random() * marginVar) + "px";
};

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

// Variables
const renderTiles = true;
const subArrSize = 50;
const keyedTileSubArr = getRandomSubArr(keyedTiles, subArrSize);

const Build = () => {
  return (
    <>
      <Navbar />
      <Grid container>
        {/* Top Spacing */}
        <Grid item xs={12} m={4}></Grid>
        {/* Page */}
        <Grid container mx={{ xs: 2, md: 6, lg: 10 }}>
          {/* Main Container */}
          <Grid item xs={12} lg={8}>
            <Grid item>
              <Container
                className="stage"
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  backgroundColor: "lightblue",

                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
              ></Container>
            </Grid>

            <Grid item>
              <Container
                className="sandbox"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  backgroundColor: "antiquewhite",
                  padding: "1rem",
                }}
              >
                {keyedTileSubArr.map(([key, tileStr]) => {
                  return <Tile key={key} tileStr={tileStr} />;
                })}
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
