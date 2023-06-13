import React from "react";

// Materials
import { Avatar, CardActions, CardHeader, Box } from "@mui/material";

const AuthorSnippet = ({ poemAuthor }) => {
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
        <CardHeader
          // avatar={
          //   // TO DO: Set up to render author avatar
          //   <Avatar
          //     aria-label="user-photo"
          //     src={"poem.poemAuthor.profileImg"}
          //   ></Avatar>
          // }
          title={poemAuthor}
        />
      </Box>
    </CardActions>
  );
};

export default AuthorSnippet;
