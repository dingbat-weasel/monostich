import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { useParams } from "react-router-dom";
import { QUERY_USER_ABOUT } from "../../utils/queries";
import { UPDATE_ABOUT } from "../../utils/mutations";

// Materials
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Box,
  Button,
  Grid,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import Auth from "../../utils/auth";

export default function AboutUser(user) {
  const { username } = useParams();
  const [editAbout, setEditAbout] = useState(false);
  let editAboutShadow = editAbout;

  // Queries
  const { loading: aboutLoading, data: aboutData } = useQuery(
    QUERY_USER_ABOUT,
    {
      variables: { username: username },
    }
  );

  const about = aboutData?.user.about || [];
  const loggedInUser = Auth.getUser()?.data.username || [];

  const [aboutInput, setAboutInput] = useState(about);
  let aboutInputShadow = aboutInput;
  // console.log(loggedInUser);

  // Mutation

  const [updateAbout, { error, data }] = useMutation(UPDATE_ABOUT);

  const handleEditClick = function () {
    editAboutShadow = !editAbout;
    setEditAbout(editAboutShadow);
    return editAboutShadow;
  };

  const handleAboutChange = function (e) {
    const { name, value } = e.target;

    setAboutInput(value);
  };

  const handleAboutSubmit = async function (e) {
    e.preventDefault();
    try {
      await updateAbout({
        variables: { username: username, aboutStr: aboutInput },
      });
      setEditAbout(!editAbout);
      document.location = `/profile/${username}`;
    } catch (err) {
      console.error(err);
    }
  };

  //TODO: change lines 26-29 (secondhalf of turnary)
  return (
    <Card>
      {loggedInUser === username ? (
        <CardHeader
          title="About"
          action={
            <IconButton aria-label="edit-about" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          }
        />
      ) : (
        <CardHeader title="About" />
      )}

      {editAbout ? (
        <CardContent>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  id="about"
                  name="about"
                  label="Edit"
                  multiline
                  rows={4}
                  defaultValue={about}
                  sx={{ width: "100%" }}
                  onChange={handleAboutChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                color="secondary"
                size="small"
                variant="outlined"
                onClick={handleAboutSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      ) : (
        <CardContent>
          <Typography p={1}>{about}</Typography>
        </CardContent>
      )}
    </Card>
  );
}
