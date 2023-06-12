import React from "react";

// Utilities

import { Box } from "@mui/material";

const Tile = ({ props }) => {
  return (
    <div>
      <Box className="tile" style={props.tileStyle}>
        {props.str}
      </Box>
    </div>
  );
};
export default Tile;
