import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import PoemCard from "../../components/PoemCard";
import { Grid } from "@mui/material";

import { useQuery } from "@apollo/client";
import { QUERY_POEMS_BY_SINGLE_USER } from "../../utils/queries";
import { QUERY_USER_USERNAME } from "../../utils/queries";

// TO DO:
// Poem cards need to be mapped to tabs from data
// All link functionality
// Search bar and functionality
// Need clear loggedIn version and loggedOut version (Saved only if loggedIn)

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

export default function Main() {
  const [value, setValue] = React.useState(0);

  const { loading, data } = useQuery(QUERY_USER_USERNAME);
  const user = data?.user || [];
  console.log(user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item>
        <Typography
          variant="h1"
          display={{ xs: "none", md: "block" }}
          user={user}
        >
          {user.username}
        </Typography>
      </Grid>
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
            {/* Example for now, needs to be dynamically rendered */}
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
            <PoemCard poem={poem} />
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
}
