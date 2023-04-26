import React, { useState } from "react";
import {
  Drawer,
  Divider,
  List,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useRouter } from "next/router";

const Sidebar = ({ menuItems }) => {
  const router = useRouter();
  const [open, setOpen] = useState([]);

  const handleClick = (index) => {
    const updatedOpen = [...open];
    updatedOpen[index] = !updatedOpen[index];
    setOpen(updatedOpen);
  };

  const getMenuItems = (menuItems) => {
    return menuItems.map((item, index) => {
      const { label, icon, children } = item;
      const hasChildren = children && children.length > 0;
      const isSelected = router.pathname === item.link;

      return (
        <React.Fragment key={index}>
          <ListItem
            style={
              isSelected
                ? { backgroundColor: "rgb(25 28 33)" }
                : { backgroundColor: "" }
            }
            button
            selected={isSelected}
            onClick={() =>
              hasChildren ? handleClick(index) : router.push(item.link)
            }
          >
            <ListItemIcon style={{ color: "#c1c1c1" }} >{icon}</ListItemIcon>
            <ListItemText primary={label} />
            {hasChildren ? (
              open[index] ? (
                <MdExpandLess />
              ) : (
                <MdExpandMore />
              )
            ) : null}
          </ListItem>
          {hasChildren ? (
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {getMenuItems(children)}
              </List>
            </Collapse>
          ) : null}
        </React.Fragment>
      );
    });
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        style: { width: 280, backgroundColor: "#000", color: "#000" },
      }}
    >
      <Box
        sx={{
          p: 3,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            pb: 1,
            padding: "10px",
            paddingBottom: "2px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <img
            src="/assets/logo.svg"
            alt="Your Logo"
            style={{ width: 70, borderRadius: "10px" }}
          />
        </Box>
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
      <List style={{ color: "#c1c1c1" }}>{getMenuItems(menuItems)}</List>
    </Drawer>
  );
};

export default Sidebar;
