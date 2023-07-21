import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import Grid from '@mui/material/Grid';
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()(
  () => ({
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "100%",
  },
}));


export default function GridContainer(props: any) {
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
