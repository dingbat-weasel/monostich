import React from "react";

// Materials
import { Avatar, CardActions, CardHeader, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AuthorSnippet = ({ poemAuthor }) => {
  // const handleUsernameClick = function () {};
  return (
    <CardActions
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      <Box
        aria-label="poem-author"
        sx={{
          display: "flex",
          flexGrow: 1,
          flexShrink: 1,
          justifyContent: "flex-end",
        }}
      >
        <Button color="primary" size="large" href={`/profile/${poemAuthor}`}>
          {poemAuthor}
        </Button>
      </Box>
    </CardActions>
  );
};

export default AuthorSnippet;
