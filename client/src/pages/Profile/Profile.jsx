import * as React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import PoemCard from "../../components/PoemCard";
import Navbar from "../../components/Navbar";
import Main from "./Main";
import Sidebar from "./Sidebar";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { QUERY_USER_USERNAME } from "../../utils/queries";

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

const Profile = () => {
  const [value, setValue] = React.useState(0);

  const { loading, data } = useQuery(QUERY_USER);
  const user = data?.user || [];
  console.log(user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar />
      <Grid container>
        {/* Top Spacing */}
        <Grid item xs={12} m={4}></Grid>
        {/* Page */}
        <Grid container mx={{ xs: 2, md: 6, lg: 10 }}>
          {/* Sidebar Container */}
          <Grid item xs={12} md={4}>
            <Sidebar user={user} />
          </Grid>

          {/* Main Container */}
          <Grid item xs={12} md={8}>
            <Main user={user} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
