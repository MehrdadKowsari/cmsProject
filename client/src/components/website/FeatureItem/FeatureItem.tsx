import React from 'react';
import { Container, Grid, Icon, Typography, keyframes } from '@mui/material';
import { makeStyles } from "tss-react/mui";

const circularAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }`
const useStyles = makeStyles()((theme) => ({
    container: {
      textAlign: 'center',
      marginBottom: theme.spacing(2)
    },
    icon: {
      fontSize: "60px !important",
      width: 100,
      height: 100,
      padding: 20,
      border: '1px solid #e4e4e4',
      borderRadius: '100%',
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(4),
      '&:hover': {
        animation: `${circularAnimation} 1s linear 1`
      },
    },
    title: {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(1),
      fontFamily: 'inherit',
      borderBottom: `solid 1px #e4e4e4`
    },
    description: {
      height: 120,
      color: theme.palette.text.secondary,
      fontFamily: 'inherit',
      fontSize: '0.8rem',
      textAlign: 'justify'
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
      <Container className={classes.container}>
        <Icon className={classes.icon}>{iconCssClass}</Icon>         
          <Typography variant="h6" className={classes.title}>
            { title }
          </Typography>
          <Typography variant="body2" className={classes.description}>
            { description }
          </Typography>
      </Container>
    );
  };

  export default FeatureItem;
