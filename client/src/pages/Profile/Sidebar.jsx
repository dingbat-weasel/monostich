import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import PoemCard from "../../components/PoemCard";

const Sidebar = ({ user }) => {
  return (
    <Grid container rowSpacing={2} px={2}>
      {/* User Section */}
      <Grid item xs={12}>
        <Box display={"flex"} justifyContent={"center"}>
          <Avatar
            sx={{
              width: 200,
              height: 200,
            }}
          ></Avatar>
        </Box>
        <Typography variant="h1" display={{ xs: "block", md: "none" }}>
          {user.username}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography># Followers</Typography>
      </Grid>
      <Grid item display={"flex"} xs={12}>
        <Button sx={{ flexGrow: 1 }}>Follow</Button>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title="About" />
          <CardContent>
            <Typography>
              kalsdjf lksdf lskdf jajksdfh kalsdjf kasdj fhaklsjdf halksjdf
              hlaksdjf haskljd fhaklsjd fhlaksjd fhaskl jdhaksld jfhaskl djhaksl
              jdhfaskld jfhkas ldjfh lkasdjfhaslk djfhas ldkjf hasdklj
              askdjfhasdkljf hasd kljfhaskdj kjlh.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
