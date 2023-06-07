import { Avatar, Card, CardHeader } from "@mui/material";
import React from "react";

export default function userSnapshot () {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="user-photo">:)</Avatar>}
        title={"Here goes the username"}
      />
    </Card>
  );
};


