import React from "react";
import { Container } from "@mui/material";
import Tile from "../../components/Tile";

const Sandbox = (props) => {
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
          {props.tiles.map(({ key, str, staged }) => {
            return (
              <Tile
                key={key}
                id={key}
                str={str}
                tileStyle={{
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
                }}
              />
            );
          })}

          {/* <Tile
            tileStr={"test"}
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
          /> */}
        </Container>
      </Container>
    </div>
  );
};

export default Sandbox;
