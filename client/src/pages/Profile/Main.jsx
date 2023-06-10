import * as React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// Materials
import { Grid, Box, Tab, Tabs, Typography } from "@mui/material";

// Components
import PoemCard from "../../components/PoemCard";

// Queries
import { QUERY_USER_POEMS } from "../../utils/queries";
import { QUERY_USER } from "../../utils/queries";

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

function a11yProps(index) {
  return {
    id: `Tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

// Main Tabbed Section of Profile
export default function Main() {
  // username or id more secure?
  const { username } = useParams();

  // State
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Queries
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER, {
    variables: { username: username },
  });

  const { loading: poemLoading, data: poemData } = useQuery(QUERY_USER_POEMS, {
    variables: { username: username },
  });

  // Data
  const user = userData?.user || [];
  const poems = poemData?.user.poems || [];

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
              <Tab label="Home" {...a11yProps(0)} />
              <Tab label="Saved" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {poems &&
              poems.map((poem) => <PoemCard poem={poem} key={poem._id} />)}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* Map saved poems here */}
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
}
