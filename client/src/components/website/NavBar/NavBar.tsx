import React, { Fragment, useEffect, useState } from "react";
import { AppBar, Toolbar, CssBaseline, Typography, useTheme, useMediaQuery, Box } from "@mui/material";
import Link from "next/link";
import DrawerComponent from "../Drawer/Drawer";
import { makeStyles } from "tss-react/mui";
import { container } from "src/styles/jss/globalStyle";
import useLocale from "src/hooks/useLocale";
import { ListAllMenuItemByParamsDTO } from "src/models/contentManagement/menuItem/listAllMenuItemByParamsDTO";
import { getAllMenuItemsByParams } from "src/state/slices/contentManagement/homeSlice";
import { useAppDispatch } from "src/state/hooks/hooks";
import { MenuItemDTO } from "src/models/contentManagement/menuItem/menuItemDTO";
import Icon from '@mui/material/Icon';
import LanguageDropdown from "src/@core/layouts/components/shared-components/LanguageDropdown";
import UserDropdown from "../UserDropdown/UserDropdown";

const styles = makeStyles()((theme) => ({
  container,
  appBar: {
    backgroundColor: "#fff",
    color: "#222",
    display: "flex"
  },
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
    justifyContent:"flex-start"
  },
  toolbar:{
    display:"flex", 
    flexGrow: "1",
    justifyContent: "space-between"
  },
  startContainer:{
    display: 'flex',
    justifyContent:'flex-start',
  },
  logo: {
    cursor: "pointer",
    justifyContent:"flex-start"
  },
  menuContainer:{
    justifyContent: "flex-start",
    paddingRight: "0.75rem",
    paddingLeft: "0.75rem",
  },
  link: {
    textDecoration: "none",
    fontSize: "16px",
    marginLeft: theme.spacing(10),
    color: "#222",
    borderBottom: "1px solid transparent"
  },
  icon: {
    color: theme.palette.primary.main
  },
  endContainer:{
    display: 'flex',
    justifyContent:'flex-end',
  },
  languageDropdown: {
    color: theme.palette.primary.main
  }
}));


const Navbar = () => {
  const [menuItems, setMenuItems] = useState<MenuItemDTO[]>([]);
  const { classes } = styles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const { getLocale } = useLocale();
  const locale = getLocale();
  
  useEffect(() => {
    getAllMenuItems();
  }, [locale]);

  const getAllMenuItems = async () => {
    const listMenuItemByParamsDTO : ListAllMenuItemByParamsDTO = {
      sectionName: 'headerMenu',
      locale: locale
    }
    try {
      const menuItems = await dispatch(getAllMenuItemsByParams(listMenuItemByParamsDTO)).unwrap();
      setMenuItems(menuItems);
    } catch (error) {
      
    }
  }
  

  return (
    <div className={classes.container} style={{padding: 0}}>
        <AppBar position="static" className={classes.appBar}>
          <CssBaseline />
          <Toolbar className={classes.toolbar}>
            <Box className={classes.startContainer}>
              <Box className={classes.logo}>
                <Typography variant="h5"> 
                  company Logo            
                </Typography>
              </Box>
              <Box className={classes.menuContainer}>
                {isMobile ? (
                  <DrawerComponent items={menuItems}/>
                ) : (
                  <div className={classes.navlinks}>
                    {
                      menuItems?.map((p: MenuItemDTO) => (
                        <Fragment key={p.id}>
                          <Link href={p.url} className={classes.link} key={p.id}><Icon className={classes.icon} key={p.id}>{p.iconCssClass}</Icon> <span>{p.name}</span></Link>
                        </Fragment>
                      ))
                    }
                  </div>
                )}
              </Box>
            </Box>
            <Box className={classes.endContainer}>
              <LanguageDropdown className={classes.languageDropdown}/>
              <UserDropdown/>
            </Box>
          </Toolbar>
    </AppBar>
    </div>
  );
}
export default Navbar;