import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { NextPage } from "next";
import Head from "next/head";
import Container from "src/components/website/Container";
import InternalPageLayout from "src/layouts/website/InternalPageLayout";
import { useAppDispatch } from "src/state/hooks/hooks";
import { useSelector } from "react-redux";
import useLocale from "src/hooks/useLocale";
import { container } from 'src/styles/jss/globalStyle';
import { makeStyles } from 'tss-react/mui';
import BlockHeader from "src/components/website/BlockHeader/BlockHeader";
import CommonMessage from "src/constants/commonMessage";
import GridContainer from "src/components/website/Grid/GridContainer";
import GridItem from "src/components/website/Grid/GridItem";
import { getAllActiveGalleriesByParams } from "src/state/slices/contentManagement/mediaSlice";
import { ListActiveGalleryByParamsDTO } from "src/models/contentManagement/gallery/listActiveGalleryByParamsDTO";
import { GalleryDTO } from "src/models/contentManagement/gallery/galleryDTO";
import GalleryCard from "src/components/website/GalleryCard/GalleryCard";
import { useRouter } from "next/router";

const styles = makeStyles()((theme) => ({
  container,
  mainContainer:{
    marginLeft: 0,
    marginRight: 0
  },
  itemContainer:{
    paddingLeft: "0 !important",
    paddingRight: "0 !important"
  },
  galleryItem: {
    paddingBottom: "0.75rem"
  }
}))

const Gallery: NextPage = () => {
  const { classes } = styles();
  const router = useRouter();
  const galleryCategoryId: string = router.query?.id as string;
  const galleryCategoryName: string = router.query?.name as string;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { getLocale } = useLocale();
  const locale = getLocale();
  const { galleries,  isLoading } = useSelector((state: any) => state?.media);
  
  useEffect(() => {
    if (galleryCategoryId)
    getAllActiveGalleries();
  }, [galleryCategoryId]);

  const getAllActiveGalleries = () => {
    const ListActiveGalleryByParamsDTO : ListActiveGalleryByParamsDTO = {
      galleryCategoryId,
      locale
    }
    dispatch(getAllActiveGalleriesByParams(ListActiveGalleryByParamsDTO));
  }
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="description" content="Read our Blog"></meta>
        <title>{galleryCategoryName}</title>
      </Head>
      <Container className={classes.container}>
        <GridContainer spacing={3} className={classes.mainContainer}>
        <GridItem lg={12} className={classes.itemContainer}>
          <BlockHeader title={galleryCategoryName} iconCssClass="image"/>
        </GridItem>
          {galleries && galleries?.map((gallery: GalleryDTO, index: number) => (
            <GridItem xs={6} sm={3} md={3} lg={3} key={index} className={classes.galleryItem}>
             <GalleryCard
                title={gallery.name || ''}
                href={`/gallery/${gallery.id}/${gallery.name}`} 
                imageSrc={gallery.image}
                imageAlt={gallery.name}/>
            </GridItem>
          ))}
        </GridContainer>
      </Container>
    </>
  );
};

Gallery.getLayout = (page: React.ReactNode) => <InternalPageLayout>{ page }</InternalPageLayout>
export default Gallery;
