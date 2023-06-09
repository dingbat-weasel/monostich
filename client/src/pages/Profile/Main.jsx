import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import PoemCard from "../../components/PoemCard";

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
        <Box sx={{ p: 3 }}>
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

const user = [];

export default function Main() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          <Tab label="Explore" {...a11yProps(0)} />
          <Tab label="Following" {...a11yProps(1)} />
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
  );
}
