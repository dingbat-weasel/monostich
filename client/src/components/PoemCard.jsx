import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function PoemCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Title
        </Typography>
        <Typography variant="h5" component="div">
          Here is a poem
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Author
        </Typography>
        <Typography variant="body2">Date and Time</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Comment</Button>
      </CardActions>
    </Card>
  );
}
