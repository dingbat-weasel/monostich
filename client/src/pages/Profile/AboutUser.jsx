import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_ABOUT } from "../../utils/queries";
import { useParams } from "react-router-dom";
// Materials
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import Auth from "../../utils/auth";

export default function AboutUser(user) {
  const { username } = useParams();
  const { loading: userLoading, data: aboutData } = useQuery(QUERY_USER_ABOUT, {
    variables: { username: username },
  });
  const about = aboutData?.user.about || [];
  const loggedInUser = Auth.getUser().data?.username || [];
  console.log(loggedInUser)
 //TODO: change lines 26-29 (secondhalf of turnary)
  return (
    <Card>
      <CardHeader title="About" />
      {loggedInUser === username ? (
        <CardContent>
          <Typography p={1}>{about}</Typography>
        </CardContent>
      ) : (
        <CardContent>
          <Typography p={1}>not logged in user</Typography>
        </CardContent>
      )}
    </Card>
  );
}

// export default AboutUser;
