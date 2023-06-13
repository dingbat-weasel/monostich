import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import PoemCard from "../../components/PoemCard";
import { QUERY_ALL_POEMS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
// TO DO:
// Poem cards need to be mapped to tabs from data
// All link functionality
// Search bar and functionality
// Need clear loggedIn version and loggedOut version (No following tab?)

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Main() {
  const [value, setValue] = React.useState(0);
  const { loading: poemLoading, data: poemData } = useQuery(QUERY_ALL_POEMS);
  const poems = poemData?.allPoems || [];
  console.log(poems);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //a11yProps(1) FIX FOR FOLLOWING
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          <Tab label="Explore" {...a11yProps(0)} />
          <Tab label="Following" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {poems &&
          poems.map((poem) => (
            <PoemCard poem={poem} includeAuthor={true} key={poem._id} />
          ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {poems &&
          poems.map((poem) => (
            <PoemCard poem={poem} includeAuthor={true} key={poem._id} />
          ))}
      </TabPanel>
    </Box>
  );
}
