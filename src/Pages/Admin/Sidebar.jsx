import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import AssessmentIcon from "@mui/icons-material/Assessment";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import EditIcon from "@mui/icons-material/Edit";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";

const Sidebar = ({ userRole, handleMenuItemClick, isEditingDisabled, currentPage }) => {
  let sideBarMenues = [];

  switch (userRole) {
    case "admin":
      sideBarMenues = [
        {
          name: "Dashboard",
          icon: <DashboardIcon />,
          route: "/admindashboard",
        },
        {
          name: "Users",
          icon: <HistoryIcon />,
          route: "/users",
          isDisabled: false,
        },
        {
          name: "Reporters",
          icon: <QueueMusicIcon />,
          route: "/reporters",
          isDisabled: false,
        },
        {
          name: "Articles",
          icon: <AssessmentIcon />,
          route: "/articles",
          isDisabled: false,
        },
        {
          name: "Edit Article",
          icon: <EditIcon />,
          route: "/profile",
          isDisabled: isEditingDisabled,
        },
        {
          name: "Profile",
          icon: <SettingsIcon />,
          route: "/profile",
          isDisabled: false,
        },
        {
          name: "Add Article",
          icon: <EditIcon />,
          route: "/profile",
          isDisabled: false,
        },
      ];
      break;
    case "reporter":
      sideBarMenues = [
        {
          name: "Dashboard",
          icon: <DashboardIcon />,
          route: "/reporterdashboard",
        },
        {
          name: "My Articles",
          icon: <VideoLibraryIcon/>,
          route: "/myarticles",
          isDisabled: false,
        },
        {
          name: "Edit Article",
          icon: <EditIcon />,
          route: "/profile",
          isDisabled: isEditingDisabled,
        },
        {
          name: "Profile",
          icon: <SettingsIcon />,
          route: "/profile",
          isDisabled: false,
        },
        {
          name: "Add Article",
          icon: <EditIcon />,
          route: "/profile",
          isDisabled: false,
        },
      ];
      break;
    default:
      sideBarMenues = [];
  }

  return (
    <List>
      {sideBarMenues.map(
        (menuItem, index) =>
          !menuItem.isDisabled && (
            <ListItem
              key={index}
              sx={{
                cursor: "pointer",
                mt: "-0.5rem",
                padding: "0.5rem 0.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <ListItemButton
                sx={{ color: "#899499", backgroundColor: currentPage === menuItem.name ? '#0dd276' : ''}}
                onClick={() => handleMenuItemClick(menuItem.name)}
              >
                <ListItemIcon sx={{ color: "#899499"}}>
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontWeight: "600",
                    color: "#717f8c",
                    fontSize: "0.9rem",
                  }}
                  primary={menuItem.name}
                />
              </ListItemButton>
            </ListItem>
          )
      )}
    </List>
  );
};

export default Sidebar;
