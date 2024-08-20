import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import AssessmentIcon from "@mui/icons-material/Assessment";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Sidebar = ({ userRole, handleMenuItemClick }) => {
  let sideBarMenues = [];
  switch (userRole) {
    case "admin":
      sideBarMenues = [
        {
          name: "Dashboard",
          icon: <DashboardIcon />,
          route: "/admindashboard",
        },
        { name: "Users", icon: <HistoryIcon />, route: "/users" },
        { name: "Reporters", icon: <QueueMusicIcon />, route: "/reporters" },
        { name: "Articles", icon: <AssessmentIcon />, route: "/articles" },
        { name: "Profile", icon: <SettingsIcon />, route: "/profile" },
      ];
      break;
    case "reporter":
      sideBarMenues = [
        {
          name: "Dashboard",
          icon: <DashboardIcon />,
          route: "/reporterdashboard",
        },
        { name: "My Articles", icon: <VideoLibraryIcon />, route: "/myarticles" },
        { name: "Profile", icon: <SettingsIcon />, route: "/profile" },
      ];
      break;
    default:
      sideBarMenues = [];
  }

  return (
    <List>
      {sideBarMenues.map((menuItem, index) => (
        <ListItem
          key={index}
          sx={{
            cursor: "pointer",
            mt: "-0.5rem",
            padding: "0.5rem 0.5rem",
            borderRadius: "0.5rem",
          }}
        >
          <ListItemButton onClick={() => handleMenuItemClick(menuItem.name)}>
            <ListItemIcon sx={{ color: "#899499" }}>
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
      ))}
    </List>
  );
};

export default Sidebar;
