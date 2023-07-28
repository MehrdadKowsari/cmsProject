import React from 'react';
import { Avatar, Grid, Icon, Typography, keyframes } from '@mui/material';
import { makeStyles } from "tss-react/mui";
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import FeatureItem from '../FeatureItem/FeatureItem';
import { useTranslation } from 'next-i18next';
import { container } from 'src/styles/jss/globalStyle';
import BlockHeader from '../BlockHeader/BlockHeader';

const useStyles = makeStyles()((theme) => ({
    container,
    root: {
      backgroundColor: "#edeff2"
    }
  }));

type Props = {
    
}
const FeatureSection: React.FC<Props> = () => {
    const { t } = useTranslation();
    const { classes } = useStyles();
    
    return (
        <div className={classes.root}>
            <GridContainer className={classes.container}>
            <GridItem lg={12} sx={{padding: 0}}>
                <BlockHeader title={t("features")} iconCssClass="category" bgColor='#edeff2'/>
            </GridItem>
            <GridItem lg={3} md={3} sm={3} xs={4}>
                <FeatureItem iconCssClass='settings' title={t("feature")} description={t("featureDescription")}/>
            </GridItem>
            <GridItem lg={3} md={3} sm={3} xs={4}>
                <FeatureItem iconCssClass='settings' title={t("feature")} description={t("featureDescription")}/>
            </GridItem>
            <GridItem lg={3} md={3} sm={3} xs={4}>
                <FeatureItem iconCssClass='settings' title={t("feature")} description={t("featureDescription")}/>
            </GridItem>
            <GridItem lg={3} md={3} sm={3} xs={4}>
                <FeatureItem iconCssClass='settings' title={t("feature")} description={t("featureDescription")}/>
            </GridItem>
            <GridItem lg={3} md={3} sm={3} xs={4}>
                <FeatureItem iconCssClass='settings' title={t("feature")} description={t("featureDescription")}/>
            </GridItem>
            <GridItem lg={3} md={3} sm={3} xs={4}>
                <FeatureItem iconCssClass='settings' title={t("feature")} description={t("featureDescription")}/>
            </GridItem>
            <GridItem lg={3} md={3} sm={3} xs={4}>
                <FeatureItem iconCssClass='settings' title={t("feature")} description={t("featureDescription")}/>
            </GridItem>
            <GridItem lg={3} md={3} sm={3} xs={4}>
                <FeatureItem iconCssClass='settings' title={t("feature")} description={t("featureDescription")}/>
            </GridItem>
        </GridContainer>
        </div>
      
    );
  };

  export default FeatureSection;
