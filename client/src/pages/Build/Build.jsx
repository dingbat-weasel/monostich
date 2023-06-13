import React, { useState } from "react";
import Auth from "../../utils/auth";
import { ADD_POEM } from "../../utils/mutations";
// Materials
import { Grid, Button } from "@mui/material";

// Components
import Sidebar from "./Sidebar";
import Stage from "./Stage";
import Navbar from "../../components/Navbar";

// Utilities

// Data
import { tileObj } from "../../data/tileSet";
import Sandbox from "./Sandbox";
import { useMutation } from "@apollo/client";

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

// Variables
const subArrSize = 55;

// Arr of tiles
// [{key: "", str: ""}]
const tileObjSubArr = getRandomSubArr(tileObj, subArrSize);

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

  const tilesArr = tiles;
  const stagedArr = staged;

  const addToStaged = function ({ id, str }) {
    let newStagedArr = [];
    stagedArr.push({ id, str });
    newStagedArr = [...stagedArr];
    setStaged(newStagedArr);

    // Update tiles state with new staged value
    let newTilesArr = [];
    const indexInTiles = tilesArr.findIndex((tile) => tile.key === id);
    tilesArr[indexInTiles].staged = true;
    newTilesArr = [...tilesArr];

    setTiles(newTilesArr);

    return staged;
  };

  const removeFromStaged = function (i, id) {
    // Remove the tile {id, str} from staged using stagedArr and updating state
    // stagedArr = staged;

    let newStagedArr = [];
    stagedArr.splice(i, 1);
    newStagedArr = [...stagedArr];
    setStaged(newStagedArr);

    // Update tiles state with new staged value
    let newTilesArr = [];
    const indexInTiles = tilesArr.findIndex((tile) => tile.key === id);
    tilesArr[indexInTiles].staged = false;
    newTilesArr = [...tilesArr];

    setTiles(newTilesArr);
  };
  const [addPoem, { error, data }] = useMutation(ADD_POEM);
  const submitPoem = async function () {
    const stagedPoem = staged;
    const poem = stagedPoem.map((a) => a.str);
    // Save poem to db
    // console.log(poem);
    if (Auth.loggedIn()) {
      try {
        console.log(Auth.getUser());
        const { data } = await addPoem({
          variables: {
            "poemText": poem,
            "poemAuthor": Auth.getUser().data.username,
          },
        });
        console.log(data);
        document.location = `/profile/${Auth.getUser().data.username}`
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Grid container>
        {/* Top Spacing */}
        <Grid item xs={12}></Grid>
        {/* Page */}
        <Grid container mx={{ xs: 2, md: 6, lg: 10 }}>
          {/* Main Container */}
          <Grid
            item
            xs={12}
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
                <Stage staged={staged} removeFromStaged={removeFromStaged} />
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
                    submitPoem();
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
        </Grid>
      </Grid>
    </>
  );
};

export default Build;
