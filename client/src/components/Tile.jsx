import React, { useRef, useState } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import { useDrag } from "react-dnd";

// Utilities
import { ItemTypes } from "../utils/items";

import { Box } from "@mui/material";

const Tile = (props) => {
  // This fixes a bug causing unwanted warning output to console
  const nodeRef = useRef(null);

  let isDragging = false;
  function onDrag(e) {
    console.log("onDrag");
    isDragging = true;
  }
  function onStop(e) {
    console.log("onStop");
    setTimeout(() => (isDragging = false), 0);
  }

  function onClick(e) {
    if (isDragging === true) {
      return;
    } else {
      props.addToStaged();
    }
  }
  return (
    <div>
      <Draggable nodeRef={nodeRef} onDrag={onDrag} onStop={onStop}>
        <Box
          className="tile"
          style={props.tileStyle}
          ref={nodeRef}
          onClick={onClick}
        >
          {props.str}
        </Box>
      </Draggable>
    </div>
  );
};
export default Tile;
