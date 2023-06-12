import React from "react";
import { Container } from "@mui/material";
import Tile from "../../components/Tile";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/items";

const Sandbox = ({ tiles, addToStaged }) => {
  //   const [{ isOver }, drop] = useDrop({
  //     accept: ItemTypes.TILE,
  //     drop: (item, monitor) => {
  //       props.onSandboxDrop(item);
  //     },
  //     collect: (monitor) => ({
  //       isOver: !!monitor.isOver(),
  //     }),
  //   });

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          width: "100%",
          height: "70vh",

          alignItems: "center",
          padding: "2rem",
        }}
      >
        <Container
          id="sandbox"
          sx={{
            position: "relative",
            display: "flex",

            flexWrap: "wrap",
            width: "100%",
            height: "100%",

            padding: "3rem",
          }}
        >
          {tiles.map(({ key, str, staged, top, left }) => {
            return (
              <Tile
                key={key}
                id={key}
                str={str}
                addToStaged={addToStaged}
                tileStyle={{
                  position: "absolute",
                  visibility: staged ? "hidden" : "visible",

                  top: top,
                  left: left,
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
      </Container>
    </div>
  );
};

export default Sandbox;
