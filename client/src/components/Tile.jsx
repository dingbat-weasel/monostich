import React, { useRef } from "react";
import { Box } from "@mui/material";

const Tile = ({ tileStr }) => {
  const tileStyle = useRef({
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
  });
  return (
    <Box className="tile" style={tileStyle.current}>
      {tileStr}
    </Box>
  );
};

export default Tile;
