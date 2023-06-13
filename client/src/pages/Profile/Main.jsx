import * as React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// Materials
import { Grid, Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Components
import AboutUser from "./AboutUser";
import PoemCard from "../../components/PoemCard";

// Queries
import {
  QUERY_USER,
  QUERY_USER_POEMS,
  QUERY_USER_SAVES,
} from "../../utils/queries";

// TO DO:
// Poem cards need to be mapped to tabs from data
// All link functionality
// Search bar and functionality
// Need clear loggedIn version and loggedOut version (Saved only if loggedIn)

// Tab Functionality
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Main Tabbed Section of Profile
export default function Main() {
  // username or id more secure?
  const { username } = useParams();

  // State
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // This is temporary value !!!!!!!!!!!!
  let isAuthenticatedUser = true;
  const theme = useTheme();
  const smallViewport = useMediaQuery(theme.breakpoints.down("md"));

  // Queries
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER, {
    variables: { username: username },
  });

  const { loading: poemLoading, data: poemData } = useQuery(QUERY_USER_POEMS, {
    variables: { username: username },
  });

  const { loading: savesLoading, data: savesData } = useQuery(
    QUERY_USER_SAVES,
    {
      variables: { username: username },
    }
  );

  // Data
  const user = userData?.user || [];
  const poems = poemData?.user.poems || [];
  const saves = savesData?.user.savedPoems || [];

  return (
    <Grid container>
      {/* User Name Heading at MD+*/}
      <Grid item>
        <Typography variant="h1" display={{ xs: "none", md: "block" }}>
          {user.username}
        </Typography>
      </Grid>
      {/* Tabs */}
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Profile Tabs"
            >
              <Tab label="Home" />
              {isAuthenticatedUser && <Tab label="Saved" />}
              {smallViewport && <Tab label="About" />}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {poems &&
              poems.map((poem) => (
                <PoemCard poem={poem} includeAuthor={false} key={poem._id} />
              )).reverse()}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* Map saved poems here */}
            {saves.length > 0 &&
              saves.map((savedPoem) => (
                <PoemCard
                  poem={savedPoem}
                  includeAuthor={true}
                  key={savedPoem._id}
                />
              ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AboutUser />
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
}
