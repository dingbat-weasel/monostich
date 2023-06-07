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
import { Box, Container } from "@mui/material";
import { Paper } from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function PoemCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={"Poem title goes here"}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Container>Here is where the poem will go</Container>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <ModeCommentIcon />
        </IconButton>
        <IconButton aria-label="add-to-saved">
          <BookmarkIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

{
  /* <Typography
sx={{ fontSize: 14 }}
color="text.secondary"
gutterBottom
backgroundColor={"lightgray"}
>
Title
</Typography>
<Container>
<Item>xs=0 md=4</Item>
</Container>
<Typography sx={{ mb: 1.5 }} color="text.secondary">
Author
</Typography>
<Typography variant="body2">Date and Time</Typography> */
}
