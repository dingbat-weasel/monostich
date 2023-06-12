import React from "react";
import { useDrop } from "react-dnd";

// Utilities
import { ItemTypes } from "../../utils/items";

// Components
import Tile from "../../components/Tile";

// Materials
import { Container } from "@mui/material";

const Stage = (props) => {
  //   const [{ isOver }, drop] = useDrop({
  //     accept: ItemTypes.TILE,
  //     drop: (item, monitor) => {
  //       props.onStageDrop(item);
  //     },
  //     collect: (monitor) => ({
  //       isOver: !!monitor.isOver(),
  //     }),
  //   });

  return (
    <div>
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

          border: "2px solid gray",
          borderRadius: 5,

          backgroundColor: "lightyellow",
        }}
      >
        {props.stagedTiles.map(({ key, str, staged }) => {
          return (
            <Tile
              key={key}
              id={key}
              str={str}
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
