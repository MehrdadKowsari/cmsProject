import React, { Fragment, useEffect } from "react";
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
import LanguageDropdown from "src/@core/layouts/components/shared-components/LanguageDropdown";
import UserDropdown from "src/@core/layouts/components/shared-components/UserDropdown";

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
  logo: {
    cursor: "pointer",
    justifyContent:"flex-start"
  },
  link: {
    textDecoration: "none",
    fontSize: "16px",
    marginLeft: theme.spacing(5),
    color: "#222",
    borderBottom: "1px solid transparent"
  },
  icon: {
    color: theme.palette.primary.main
  },
  languageDropdown: {
    justifyContent:'flex-end',
    color: theme.palette.primary.main
  }
}));


const Navbar = () => {
  const { classes } = styles();
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
          <Toolbar className="toolbar">
          <Typography variant="h4" className={classes.logo}> 
            company Logo            
            </Typography>
            {isMobile ? (
              <DrawerComponent items={menuItems}/>
            ) : (
              <div className={classes.navlinks}>
                {
                  menuItems?.map((p: MenuItemDTO) => (
                    <Fragment key={p.id}>
                      <Link href={p.url} className={classes.link} key={p.id}><Icon className={classes.icon} key={p.id}>{p.iconCssClass}</Icon> {p.name}</Link>
                    </Fragment>
                  ))
                }
              </div>
            )}
          <LanguageDropdown className={classes.languageDropdown}/>
          <UserDropdown/>
          </Toolbar>
    </AppBar>
    </div>
  );
}
export default Navbar;