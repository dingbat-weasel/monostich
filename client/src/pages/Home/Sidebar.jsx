import { Card, CardContent, CardHeader, Container, Grid } from "@mui/material";
import React from "react";
import PoemCard from "../../components/PoemCard";

// TO DO:
// Logic for rendering TOP poems (most likes?)
//

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
        {/* Top Poems Container */}
        <Card>
          <CardHeader title={"Top Poems This Week"} />
          <CardContent>
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
