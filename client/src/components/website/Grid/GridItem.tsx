import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "tss-react/mui";
import Grid from "@mui/material/Grid";
import { Grid2Props } from "@mui/material";

const styles = makeStyles()(() => ({
  grid: {
    position: "relative",
    width: "100%",
    minHeight: "1px",
    paddingRight: "15px",
    paddingLeft: "15px",
    flexBasis: "auto",
  },
}));



export default function GridItem(props: Grid2Props) {
  const { classes } = styles();
  const { children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

// GridItem.defaultProps = {
//   className: "",
// };

// GridItem.propTypes = {
//   children: PropTypes.node,
//   className: PropTypes.string,
// };
