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
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Sidebar from "./Sidebar.jsx";
import renderCurrentPage from "./PageRender.jsx";
import { useSelector } from "react-redux";

const drawerWidth = 280;

const Workspace = (props) => {
  const {user, role} = useSelector(state=>state.auth);
  const { window } = props;
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const handleMenuItemClick = (pageName) => {
    setCurrentPage(pageName);
    handleDrawerClose(); //Where it is
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
        <img src={'/images/logo.png'} alt="Awadh Kesari" width={"100%"} />
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
        <Typography
          variant="h7"
          sx={{ fontFamily: "sans-serif", fontWeight: "600" }}
        >
          {user.name}
        </Typography>
      </Box>
      <Divider />
      <Sidebar userRole={user.role} handleMenuItemClick={handleMenuItemClick} />
      <Divider />
      <MenuItem>
      {/* Need to add the click handler for logout */}
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
    <Box sx={{ display: "flex", backgroundColor: "#f9f9fb" }}>
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
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
      
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
        {renderCurrentPage(currentPage, user)}
      </Box>
    </Box>
  );
};

export default Workspace;
