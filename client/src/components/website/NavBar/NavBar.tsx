import React, { useEffect } from "react";
import { AppBar, Toolbar, CssBaseline, Typography, useTheme, useMediaQuery } from "@mui/material";
import Link from "next/link";
import DrawerComponent from "../Drawer/Drawer";
import { makeStyles } from "tss-react/mui";
import { container } from "src/styles/jss/globalStyle";
import useLocale from "src/hooks/useLocale";
import { ListAllMenuItemByParamsDTO } from "src/models/contentManagement/menuItem/listAllMenuItemByParamsDTO";
import { getAllMenuItemsByParams } from "src/state/slices/contentManagement/homeSlice";
import { useAppDispatch } from "src/state/hooks/hooks";
import { MenuItemDTO } from "src/models/contentManagement/menuItem/menuItemDTO";
import { useSelector } from "react-redux";
import Icon from '@mui/material/Icon';

const navStyles = makeStyles()((theme) => ({
  container,
  appBar: {
    backgroundColor: "#fff"
  },
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex"
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    fontSize: "20px",
    marginLeft: theme.spacing(10),
    color: "#222",
    borderBottom: "1px solid transparent"
  },
  icon: {
    color: theme.palette.primary.main
  }
}));


const Navbar = () => {
  const { classes } = navStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const { getLocale } = useLocale();
  const locale = getLocale();
  const { menuItems,  isLoading } = useSelector((state: any) => state?.home?.menuItems ? state?.home : { menuItems: [], isLoading: false });
  
  useEffect(() => {
    getAllMenuItems();
  }, []);

  const getAllMenuItems = () => {
    const listMenuItemByParamsDTO : ListAllMenuItemByParamsDTO = {
      sectionName: 'headerMenu',
      locale: locale
    }
    dispatch(getAllMenuItemsByParams(listMenuItemByParamsDTO));
  }
  

  return (
    <div className={classes.container}>
        <AppBar position="static" className={classes.appBar}>
          <CssBaseline />
          <Toolbar>
            <Typography variant="h4" className={classes.logo}>             
            </Typography>
            {isMobile ? (
              <DrawerComponent items={menuItems}/>
            ) : (
              <div className={classes.navlinks}>
                {
                  menuItems?.map((p: MenuItemDTO) => (
                    <>
                      <Link href={p.url} className={classes.link}>{p.name} <Icon className={classes.icon}>{p.iconCssClass}</Icon></Link>
                    </>
                  ))
                }
              </div>
            )}
          </Toolbar>
    </AppBar>
    </div>
  );
}
export default Navbar;