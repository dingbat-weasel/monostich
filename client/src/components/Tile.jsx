import React, { useRef } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import { useDrag } from "react-dnd";

// Utilities
import { ItemTypes } from "../utils/items";

import { Box } from "@mui/material";

const Tile = (props) => {
  // This fixes a bug causing unwanted warning output to console
  const nodeRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TILE,
    item: {
      id: props.id,
      tileStr: props.str,
      staged: props.staged,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag}>
      <Draggable nodeRef={nodeRef}>
        <Box className="tile" style={props.tileStyle} ref={nodeRef}>
          {props.str}
        </Box>
      </Draggable>
    </div>
  );
};

export default Tile;
