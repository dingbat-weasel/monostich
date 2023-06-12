import React, { useRef, useState } from "react";
import Draggable, { DraggableCore } from "react-draggable";

// Utilities

import { Box } from "@mui/material";

const Tile = (props) => {
  return (
    <div>
      <Box className="tile" style={props.tileStyle}>
        {props.str}
      </Box>
    </div>
  );
};
export default Tile;
