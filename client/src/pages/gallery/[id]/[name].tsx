import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Container from "src/components/website/Container";
import { PopUpT } from "src/types/popup";

import { DESKTOP_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from "src/constants/breakpoints";
import { useAppDispatch } from "src/state/hooks/hooks";
import useLocale from "src/hooks/useLocale";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import InternalPageLayout from "src/layouts/website/InternalPageLayout";
import { container } from 'src/styles/jss/globalStyle';
import { makeStyles } from 'tss-react/mui';
import GridContainer from "src/components/website/Grid/GridContainer";
import GridItem from "src/components/website/Grid/GridItem";
import BlockHeader from "src/components/website/BlockHeader/BlockHeader";
import CommonMessage from "src/constants/commonMessage";
import { getAllGalleryFilesByGalleryId } from "src/state/slices/contentManagement/mediaSlice";
import MediaGallery from "src/components/website/Gallery/Gallery";
interface Props extends PopUpT {
  
}

  const styles = makeStyles()((theme) => ({
    container,
    mainContainer:{
      marginLeft: 0,
      marginRight: 0
    },
    itemContainer:{
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    }
  }))

const Post: NextPage<Props> = ({ setPopup, popup }) => {
  const { getLocale } = useLocale();
  const locale = getLocale();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const galleryId: string = router.query.id as string;
  const galleryName: string = router.query.name as string;
  const { classes } = styles();

  const { galleryFiles,  isLoading } = useSelector((state: any) => state?.media);
  
  useEffect(() => {
    if (galleryId) {
      getAllGalleryFiles();
    }
  }, [galleryId]);

  const getAllGalleryFiles = () => {
    dispatch(getAllGalleryFilesByGalleryId(galleryId));
  }
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="description" content="Read our Blog"></meta>
        <title>{galleryName}</title>
      </Head>
      <Container className={classes.container}>
        <GridContainer spacing={3} className={classes.mainContainer}>
        <GridItem lg={12} className={classes.itemContainer}>
          <BlockHeader title={galleryName} iconCssClass="image"/>
        </GridItem>
          {galleryFiles && 
            <GridItem xs={12} sm={12} md={12} lg={12}>
             <MediaGallery items={galleryFiles}/>
            </GridItem>
          }
        </GridContainer>
      </Container>
    </>
  );
};
Post.getLayout = (page: React.ReactNode) => <InternalPageLayout>{page}</InternalPageLayout>
export default Post;
