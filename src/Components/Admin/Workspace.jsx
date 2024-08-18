import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
// import { Logo } from "../assets/assest.js";
import Logo from "../../../public/images/logo.png";
import Sidebar from "./Sidebar.jsx";
import renderCurrentPage from "./PageRender.jsx";

const drawerWidth = 280;

const Workspace = (props) => {
  const { window } = props;
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const handleMenuItemClick = (pageName) => {
    setCurrentPage(pageName);
    handleDrawerClose();
  };

  const userData = {
    activeDashboard: "admin",
  };

  const drawer = (
    <div>
      <Box
        sx={{
          height: "10vh",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <img src={Logo} alt="Career Explorer" width={"60%"} />
      </Box>

      <Box
        sx={{
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f2f3f5",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
          gap: "1rem",
          ml: "1rem",
          mr: "1rem",
        }}
      >
        {/* <Avatar
          alt="User Name"
          src="" // Placeholder image source
          sx={{ width: 55, height: 55 }}
        /> */}
        <Typography
          variant="h7"
          sx={{ fontFamily: "sans-serif", fontWeight: "600" }}
        >
          User Name
        </Typography>
      </Box>
      <Divider />
      <Sidebar userRole="admin" handleMenuItemClick={handleMenuItemClick} />
      <Divider />
      <MenuItem>
        <Box
          component="button"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              color: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "sans-serif",
              gap: 1,
              fontSize: "0.9rem",
            }}
          >
            <LogoutIcon />
            Logout
          </Typography>
        </Box>
      </MenuItem>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f9fafb" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{ height: "10vh", boxShadow: "none", backgroundColor: "#f9fafb" }}
        >
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <TextField
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          /> */}
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
              {/* <Avatar
                alt="User Name"
                src="" // Placeholder image source
                sx={{ width: 55, height: 55, marginRight: 1 }}
              /> */}
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={false} // Menu is closed by default
          ></Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={false} // Drawer is closed by default
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#f9fafb",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* Placeholder for the main content area */}

        {/* {userData && renderCurrentPage(currentPage, userData)} */}
        {renderCurrentPage(currentPage, userData)}
      </Box>
    </Box>
  );
};

export default Workspace;
