import React from "react";

// Materials
import { Container, Box } from "@mui/material";

const Stage = (props) => {
  const marginVar = 10;
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
          padding: "1rem",
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
                    marginTop: Math.floor(Math.random() * marginVar) + "px",
                    marginBottom: Math.floor(Math.random() * marginVar) + "px",
                    marginLeft: Math.floor(Math.random() * marginVar) + "px",
                    marginRight: Math.floor(Math.random() * marginVar) + "px",
                    padding: "5px",

                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    props.removeFromStaged(i, id);
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
