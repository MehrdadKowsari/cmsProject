import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import Grid from '@mui/material/Grid';
import { makeStyles } from "tss-react/mui";
import { Grid2Props } from "@mui/material";

const styles = makeStyles()(
  () => ({
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    paddingTop: "15px",
    paddingBottom: "15px",
    width: "100%",
  },
}));


export default function GridContainer(props: Grid2Props) {
  const { classes } = styles();
  const { children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: "",
};

GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
