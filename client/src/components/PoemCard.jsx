import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Container, Divider } from "@mui/material";
import { Paper } from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function PoemCard({
  poemTitle,
  poemContent,
  likeCount,
  commentCount,
  saveCount,
  authorName,
  authorImg,
  createdAtDate,
}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={poemTitle}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Container>{poemContent}</Container>
      </CardContent>
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
            avatar={<Avatar aria-label="user-photo" src={authorImg}></Avatar>}
            title={authorName}
          />
        </Box>
      </CardActions>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Typography pr={1}>{createdAtDate}</Typography>
      </Box>
      <Box
        idth="100%"
        sx={{ display: "flex", flex: 1, justifyContent: "flex-start" }}
      >
        <IconButton aria-label="like" sx={{ p: 2 }}>
          <FavoriteIcon />
        </IconButton>
        <Typography p={2}>{likeCount}</Typography>
        <IconButton aria-label="comment" sx={{ p: 2 }}>
          <ModeCommentIcon />
        </IconButton>
        <Typography p={2}>{commentCount}</Typography>
        <IconButton aria-label="add-to-saved" sx={{ p: 2 }}>
          <BookmarkIcon />
        </IconButton>
        <Typography p={2}>{saveCount}</Typography>
      </Box>
    </Card>
  );
}
