import React, { useState } from "react";
import { Divider, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { makeStyles } from "tss-react/mui";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItemDTO } from "src/models/contentManagement/menuItem/menuItemDTO";
import Icon from '@mui/material/Icon';
const useStyles = makeStyles()((theme) => ({
    root:{
      minWidth: 250
    },
    link:{
        textDecoration:"none",
        color: "#222",
        fontSize: "20px",
    },
    icon:{
        color: theme.palette.primary.main
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
        <List className={classes.root}>
          <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
              {
                <List>{
                    menuItems?.map((p: MenuItemDTO) => (
                      <>
                        <ListItem key={p.id}>
                          <Link href={p.url} className={classes.link} key={p.id}> <Icon className={classes.icon}>{p.iconCssClass}</Icon> {p.name}</Link>
                        </ListItem>
                      </>
                    ))
                  }
                </List>
              }
              </ListItemText>
            </ListItem>       
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}className={classes.icon}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;