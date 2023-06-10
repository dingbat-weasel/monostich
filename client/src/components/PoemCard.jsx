import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Container } from "@mui/material";

import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// TO DO:
// This poemcard needs to be configured to read from data coming in
// Variable names will need to be changed to match data structures,
// DS will need to be mapped over with map()

// Actual styling of poem tile array
// Cleanup of all styles

// username clickable

// animations on like, comment, save

// Shift user info to its own component and render it as a prop on Main?
// Then poemcard can be reused on profiles with minimal changes
// Or just move poem card to Home dir and copy it for profile

export default function PoemCard({ poem }) {
  return (
    <Card sx={{ minWidth: 275, my: 4 }}>
      <CardHeader
        title={poem.poemTitle}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        {/* Render array correctly with tile styling */}
        <Container>{poem.poemText}</Container>
      </CardContent>

      <Box
        idth="100%"
        sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", flex: 1 }}>
          <IconButton aria-label="like" sx={{ p: 2 }}>
            <FavoriteIcon />
          </IconButton>
          <Typography p={2}>{poem.likeCount}</Typography>
          <IconButton aria-label="comment" sx={{ p: 2 }}>
            <ModeCommentIcon />
          </IconButton>
          <Typography p={2}>{poem.commentCount}</Typography>
          <IconButton aria-label="add-to-saved" sx={{ p: 2 }}>
            <BookmarkIcon />
          </IconButton>
          <Typography p={2}>{poem.saveCount}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography pr={2}>{poem.createdAt}</Typography>
        </Box>
      </Box>
    </Card>
  );
}
