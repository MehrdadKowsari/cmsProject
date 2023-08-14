import React, { useEffect } from "react";
import { ImageListItem, useMediaQuery } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Container from "src/components/website/Container";
import PopUpDevelopment from "src/components/website/PopUpDevelopment";
import { PopUpT } from "src/types/popup";
import { Parser } from 'html-to-react';

import {
  StyledBlockPlaceholder,
  Content,
  Topic,
  TopicWrapper
} from "src/components/website/common/styles";
import {
  DESKTOP_MEDIA_QUERY,
  MOBILE_MEDIA_QUERY,
} from "src/constants/breakpoints";
import { getPageBySlugUrl } from "src/state/slices/contentManagement/blogSlice";
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
    },
    postCntent:{
      textAlign: "justify"
    },
    relatedPostTitle:{
      marginTop: 50,
      marginBottom: 20
    }
  }))

const Post: NextPage<Props> = ({ setPopup, popup }) => {
  const { getLocale } = useLocale();
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const dispatch = useAppDispatch();
  const { page,  isLoading } = useSelector((state: any) => state?.blog?.page ? state?.blog : { page: null, isLoading: false });
  const router = useRouter();
  const slugUrl: string = router.query.url as string;
  const { classes } = styles();

  useEffect(() => {
    if (slugUrl) {
      getPageBySEOUrl(slugUrl);
    }
  }, [slugUrl]);
  
  const getPageBySEOUrl = async (slugUrl: string) =>{
    await dispatch(getPageBySlugUrl(slugUrl));
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <title>{page?.title}</title>
        <meta name="description" content={page?.shortDescription ?? ''} />

        <meta
          property="og:url"
          content={`https://test.test/blog/${page?.slugUrl ?? ''}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page?.title} />
        <meta property="og:description" content={page?.shortDescription ?? ''} />
        <meta property="og:image" content={page?.image ?? ''} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="test.test" />
        <meta
          property="twitter:url"
          content={`https://test.test/blog/${page?.slugUrl ?? ''}`}
        />
        <meta name="twitter:title" content={page?.title} />
        <meta name="twitter:description" content={page?.shortDescription ?? ''} />
        <meta name="twitter:image" content={page?.image ?? ''} />
      </Head>
      <Content>
        <Container className={classes.container}>
          <GridContainer className={classes.mainContainer}>
            <GridItem lg={12} md={12} sm={12} xs={12} className={classes.itemContainer}>
              <TopicWrapper>
              <Topic>
              <BlockHeader title={page?.title} iconCssClass="category"/>
                {page?.image ? (
                  <ImageListItem key={page?.id}>
                    <img
                      src={`${page?.image}`}
                      alt={page?.title}
                      title={page?.title}
                    />
                  </ImageListItem>
                ) : (
                  <StyledBlockPlaceholder />
                )}
                <div className={classes.postCntent}>
                  {Parser().parse(page?.content)}
                </div>
              </Topic>
            </TopicWrapper>
            </GridItem>
          </GridContainer>
        </Container>
      </Content>
      <PopUpDevelopment popup={popup} setPopup={setPopup} />
    </>
  );
};
Post.getLayout = (page: React.ReactNode) => <InternalPageLayout>{page}</InternalPageLayout>
export default Post;
