import React, { useRef } from "react";
import { Container, Box } from "@mui/material";

import Draggable from "react-draggable";

const Sandbox = ({ tiles, addToStaged }) => {
  const nodeRef = useRef(null);

  let isDragging = false;
  function onDrag(e) {
    isDragging = true;
  }
  function onStop(e) {
    setTimeout(() => (isDragging = false), 0);
  }

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
              <div key={key} id={key}>
                <Draggable nodeRef={nodeRef} onDrag={onDrag} onStop={onStop}>
                  <Box
                    className="tile"
                    style={{
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
                    ref={nodeRef}
                    onClick={(e) => {
                      if (isDragging === true) {
                        return;
                      } else {
                        addToStaged({
                          id: key,
                          str: str,
                        });
                      }
                    }}
                  >
                    {str}
                  </Box>
                </Draggable>
              </div>
            );
          })}
        </Container>
      </Container>
    </div>
  );
};

export default Sandbox;
