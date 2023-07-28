import React from 'react';
import { Grid, Icon, Typography, keyframes } from '@mui/material';
import { makeStyles } from "tss-react/mui";

const circularAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }`
const useStyles = makeStyles()((theme) => ({
    root: {
      padding: theme.spacing(4),
    },
    featureItem: {
      textAlign: 'center',
    },
    icon: {
      fontSize: "60px !important",
      width: 100,
      height: 100,
      padding: 20,
      border: '1px solid #e4e4e4',
      borderRadius: '100%',
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(2),
      '&:hover': {
        animation: `${circularAnimation} 1s linear 1`
      },
    },
    title: {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(1),
    },
    description: {
      color: theme.palette.text.secondary,
    },
  }));

type Props = {
    iconCssClass: string,
    title: string,
    description: string
}
const FeatureItem: React.FC<Props> = ({iconCssClass, title, description}) => {
    const { classes } = useStyles();
    
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6} md={4} className={classes.featureItem}>
        <Icon className={classes.icon}>{iconCssClass}</Icon>         
          <Typography variant="h6" className={classes.title}>
            { title }
          </Typography>
          <Typography variant="body2" className={classes.description}>
            { description }
          </Typography>
        </Grid>
      </Grid>
    );
  };

  export default FeatureItem;
