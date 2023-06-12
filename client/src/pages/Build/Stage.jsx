import React from "react";
import { useDrop } from "react-dnd";

// Utilities
import { ItemTypes } from "../../utils/items";

// Components
import Tile from "../../components/Tile";

// Materials
import { Container } from "@mui/material";

const Stage = ({ toStagedDragHandler, staged }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TILE,
    drop: (item, monitor) => toStagedDragHandler(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop}>
      <Container
        className="stage"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "wrap",
          width: "100%",
          minHeight: "3rem",
          height: "auto",

          border: isOver ? "3px solid lightgreen" : "2px solid gray",
          borderRadius: 5,

          backgroundColor: "lightyellow",
        }}
      >
        {staged &&
          staged.map(({ key, tileStr }) => {
            return (
              <Tile
                key={key}
                tileStr={tileStr}
                tileStyle={{
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
                }}
              />
            );
          })}
      </Container>
    </div>
  );
};

export default Stage;
