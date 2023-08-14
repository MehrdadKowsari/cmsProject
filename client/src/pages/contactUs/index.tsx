import React from 'react';
import Container from '@mui/material/Container';
import InternalPageLayout from 'src/layouts/website/InternalPageLayout';
import { makeStyles } from 'tss-react/mui';
import { container } from 'src/styles/jss/globalStyle';
import GridContainer from 'src/components/website/Grid/GridContainer';
import GridItem from 'src/components/website/Grid/GridItem';
import ContentBlock from 'src/components/website/ContentBlock/ContentBlock';

const styles = makeStyles()(() => ({
  container,
  mainContainer:{
    marginLeft: 0,
    marginRight: 0
  },
  itemContainer:{
    paddingLeft: "0 !important",
    paddingRight: "0 !important"
  }
}))
export default function ContactUs() {
  const { classes } = styles();
  
  return (
    <Container className={classes.container}>
        <GridContainer spacing={3} className={classes.mainContainer}>
          <GridItem lg={12} className={classes.itemContainer}>
            <ContentBlock sectionName="page_contactUs" />
          </GridItem>
        </GridContainer>
      </Container>
  );
}

ContactUs.getLayout = (page: React.ReactNode) => <InternalPageLayout>{page}</InternalPageLayout>
