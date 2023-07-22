import React, { useState } from "react";
import { Divider, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { makeStyles } from "tss-react/mui";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItemDTO } from "src/models/contentManagement/menuItem/menuItemDTO";
import Icon from '@mui/material/Icon';
const useStyles = makeStyles()(() => ({
    link:{
        textDecoration:"none",
        color: "blue",
        fontSize: "20px",
    },
    icon:{
        color: "white"
    }
}));
type DrawerProps = {
  items: MenuItemDTO[]
}

const DrawerComponent = ({ items: menuItems}: DrawerProps) => {
    const { classes }  = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
        <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
            {
                  menuItems?.map((p: MenuItemDTO) => (
                    <>
                      <Link href={p.url} className={classes.link}>{p.name} <Icon className={classes.icon}>{p.iconCssClass}</Icon></Link>
                    </>
                  ))
                }
            </ListItemText>
          </ListItem>
          <Divider/>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}className={classes.icon}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;