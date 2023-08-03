import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { NextPage } from "next";
import Head from "next/head";
import Container from "src/components/website/Container";
import InternalPageLayout from "src/layouts/website/InternalPageLayout";
import { useAppDispatch } from "src/state/hooks/hooks";
import { useSelector } from "react-redux";
import useLocale from "src/hooks/useLocale";
import ApplicationParams from "src/constants/applicationParams";
import { container } from 'src/styles/jss/globalStyle';
import { makeStyles } from 'tss-react/mui';
import BlockHeader from "src/components/website/BlockHeader/BlockHeader";
import CommonMessage from "src/constants/commonMessage";
import GridContainer from "src/components/website/Grid/GridContainer";
import GridItem from "src/components/website/Grid/GridItem";
import { getAllActiveGalleryCategoriesByParams } from "src/state/slices/contentManagement/mediaSlice";
import { ListActiveGalleryCategoryByParamsDTO } from "src/models/contentManagement/galleryCategory/listActiveGalleryCategoryByParamsDTO";
import { GalleryCategoryDTO } from "src/models/contentManagement/galleryCategory/galleryCategoryDTO";
import GalleryCard from "src/components/website/GalleryCard/GalleryCard";

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
  postItem: {
    paddingBottom: "0.75rem"
  }
}))

const Gallery: NextPage = () => {
  const { classes } = styles();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { getLocale } = useLocale();
  const locale = getLocale();
  const { galleryCategories,  isLoading } = useSelector((state: any) => state?.media);
  
  useEffect(() => {
    getAllActiveGalleries();
  }, []);

  const getAllActiveGalleries = () => {
    const ListActiveGalleryCategoryByParamsDTO : ListActiveGalleryCategoryByParamsDTO = {
      parentId: null,
      locale: locale
    }
    dispatch(getAllActiveGalleryCategoriesByParams(ListActiveGalleryCategoryByParamsDTO));
  }
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="description" content="Read our Blog"></meta>
        <title>{t("gallery", CommonMessage.Gallery)!}</title>
      </Head>
      <Container className={classes.container}>
        <GridContainer spacing={3} className={classes.mainContainer}>
        <GridItem lg={12} className={classes.itemContainer}>
          <BlockHeader title={t("gallery", CommonMessage.Gallery)!} iconCssClass="image"/>
        </GridItem>
          {galleryCategories && galleryCategories?.map((galleryCategory: GalleryCategoryDTO, index: number) => (
            <GridItem xs={6} sm={3} md={3} lg={3} key={index} className={classes.postItem}>
             <GalleryCard
                title={galleryCategory.name || ''}
                href={`/gallery/${galleryCategory.id}/${galleryCategory.name}`} 
                imageSrc='/images/gallery.png'
                imageAlt={galleryCategory.name}/>
            </GridItem>
          ))}
        </GridContainer>
      </Container>
    </>
  );
};

Gallery.getLayout = (page: React.ReactNode) => <InternalPageLayout>{ page }</InternalPageLayout>
export default Gallery;
