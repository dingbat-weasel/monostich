import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Create, Notifications } from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import CreateIcon from "@mui/icons-material/Create";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../assets/theme";

import { Link } from "react-router-dom";

import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

const pages = ["Profile", "Notifications", "Dark/Light Toggle", "Logout"];
const navItemsAtLargeScreen = ["Create Poem", "Notifications"];
// const settings = ["Profile", "Dark/Light Toggle", "Logout"];

// TO DO:
// Nav will need to change based on state, light/dark mode toggles, colors etc
// But also if user is logged in/out
// if not signed in: Only render create poem icon, d/l toggle, and login/signup options

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userName = Auth.getUser()?.data.username || [];

  //   TO DO: profile pic functionality for navbar

  const profilePicture = "profile picture src path";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    // document.location.href = '/signin'
    if (Auth.loggedIn()) {
      handleCloseUserMenu();
      Auth.logout();
      document.location.href = "/signin";
    }
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const HamburgerMenuLink = ({ text, href, handleClose }) => {
    const handleLinkClick = () => {
      handleClose && handleClose();
    };

    return (
      <MenuItem component={Link} to={href} onClick={handleLinkClick}>
        <Typography align="center" variant="body1">
          {text}
        </Typography>
      </MenuItem>
    );
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* TO DO: Logo here instead */}
          {/* Logo at md+ */}
          <Typography
            variant="poemTile"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Monostich
          </Typography>

          {/* Hamburger left-side at md- */}
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
            {Auth.loggedIn() ? (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={Link}
                  to={`/profile/${userName}`}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`#toggle`}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Dark/Light Toggle</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={Link}
                  to={`/signin`}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Sign in</Typography>
                </MenuItem>
              </Menu>
            )}

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="poemTile"
            noWrap
            component="a"
            href=""
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              justifyContent: "center",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Monostich
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              href="/build"
              color="inherit"
            >
              {/* <Link to="/build"></Link> */}
              <CreateIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              justifyContent: "flex-end",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box
              sx={{ p: 1, flexGrow: 0, display: { xs: "none", md: "flex" } }}
            >
              <IconButton
                size="large"
                aria-label="create new poem"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                href="/build"
                color="inherit"
              >
                <CreateIcon />
              </IconButton>
            </Box>
            {/* <Box
              sx={{ p: 1, flexGrow: 0, display: { xs: "none", md: "flex" } }}
            >
              <IconButton
                size="large"
                aria-label="notifications page"
                aria-controls="menu-appbar"
                aria-haspopup="false"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <NotificationsIcon />
              </IconButton>
            </Box> */}
          </Box>

          {/* At MD+ Profile Dropdown */}

          <Box sx={{ p: 1, flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName} src={profilePicture} />
              </IconButton>
            </Tooltip>
            {Auth.loggedIn() ? (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={Link}
                  to={`/profile/${userName}`}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`#toggle`}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Dark/Light Toggle</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={Link}
                  to={`/signin`}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">Sign in</Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
