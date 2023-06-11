import { Card, CardContent, CardHeader, Container, Grid } from "@mui/material";
import React from "react";
import PoemCard from "../../components/PoemCard";

// TO DO:
// Logic for rendering TOP poems (most likes?)
// Create a separate poemCard component that fits better here,
// Smaller and cleaner, title poem and author?

const poem = {
  poemTitle: "Here is my title",
  poemText: ["Here", "is", "my", "poem", "text", "!"],

  createdAt: "Wed, June 7 2023 at 12:00pm",
  likeCount: 30,
  commentCount: 5,
  saveCount: 4,
  poemAuthor: "Some user name from user.id",
  authorImg: "A",
};

const Sidebar = () => {
  return (
    <Grid container padding={2} borderLeft={"1px gray solid"}>
      <Grid item xs={12}>
        {/* Instructions */}
        <Card>
          <CardHeader title={"Instructions"} />
          <CardContent>
            <PoemCard poem={poem} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
