import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Auth from "../utils/auth";
import { DELETE_POEM } from "../utils/mutations";
import { useParams } from "react-router-dom";

// Components
import AuthorSnippet from "./AuthorSnippet";

// Materials
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";

// Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@apollo/client";

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

export default function PoemCard({ poem, includeAuthor, author, marginVar }) {
  const theme = useTheme();
  const loggedInUser = Auth.getUser()?.data.username || [];
  const [removePoem, {error,data}] = useMutation(DELETE_POEM);
  const username = useParams();
  console.log(poem._id,username)
  const handleDeleteClick = async function (e) {
    e.preventDefault();
    try {
      await removePoem({
        variables: {poemId: poem._id, poemAuthor: username.username}
      });
      document.location = `/profile/${author}`;
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(author, poem._id);

  return (
    <Card
      sx={{ minWidth: 275, my: 4, border: "2px solid gray", borderRadius: 5 }}
    >
      {loggedInUser === author ? (
        <CardHeader
          action={
            <IconButton aria-label="delete-poem" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          }
        />
      ) : (
        <CardHeader />
      )}
      <CardContent>
        <Container
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
          {poem.poemText.map((str) => {
            return (
              <div key={str}>
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
                  }}
                >
                  {str}
                </Box>
              </div>
            );
          })}
        </Container>
      </CardContent>
      {includeAuthor && <AuthorSnippet poemAuthor={poem.poemAuthor} />}
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
