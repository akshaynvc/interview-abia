import React, { ReactNode } from "react";
import {
  Box,
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

type DrawerMenuProps = {
  children: ReactNode;
};
const DrawerMenu = ({ children }: DrawerMenuProps) => {
  const drawerWidth = 240;
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["dashboard", "user"].map((text:string) => (
            <Link to={text} style={{textDecoration:'none'}} key={text}>
              <ListItem disablePadding>
                <ListItemButton sx={{ width: "100%" }}>
                  <ListItemText primary={text.toUpperCase()} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ display:'flex', flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DrawerMenu;
