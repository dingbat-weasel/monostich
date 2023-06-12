import React from "react";

// Utilities

// Components
import Tile from "../../components/Tile";

// Materials
import { Container, Box } from "@mui/material";

const Stage = (props) => {
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
        {props.staged.length > 0 &&
          props.staged.map(({ id, str }, i) => {
            return (
              <div key={i} id={id}>
                <Box
                  className="tile"
                  style={{
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
                  onClick={(e) => {
                    props.removeFromStaged(i);
                  }}
                >
                  {str}
                </Box>
              </div>
            );
          })}
      </Container>
    </div>
  );
};

export default Stage;
