import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Grid, ImageListItem, useMediaQuery } from "@mui/material";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Container from "src/components/website/Container";
import PopUpDevelopment from "src/components/website/PopUpDevelopment";
import { PopUpT } from "src/types/popup";
import { ClockIcon } from "src/svg";
import { Parser } from 'html-to-react';

import {
  TopicTitle,
  PostLine,
  StyledChip,
  StyledBlockPlaceholder,
  Content,
  StyledStack,
  Topic,
  TopicFooter,
  DateWrapper,
  TopicWrapper
} from "src/components/website/common/styles";
import { DateText } from "src/components/website/Post/styles";
import {
  DESKTOP_MEDIA_QUERY,
  MOBILE_MEDIA_QUERY,
} from "src/constants/breakpoints";
import { getById, getBySlugUrl } from "src/state/slices/contentManagement/blogSlice";
import { useAppDispatch } from "src/state/hooks/hooks";
import { PostDTO } from "src/models/contentManagement/post/postDTO";
import useLocale from "src/hooks/useLocale";
import localizationService from "src/services/shared/localizationService";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import InternalPageLayout from "src/layouts/website/InternalPageLayout";
import SimilarPost from "src/components/website/SimilarPost";
import { TagDTO } from "src/models/contentManagement/tag/tagDTO";
import { container } from 'src/styles/jss/globalStyle';
import { makeStyles } from 'tss-react/mui';
import GridContainer from "src/components/website/Grid/GridContainer";
import GridItem from "src/components/website/Grid/GridItem";
import MostPopularPostList from "src/components/website/MostPopularPostList/MostPopularPostList";
import BlockHeader from "src/components/website/BlockHeader/BlockHeader";
import PostComment from "src/components/website/PostComment/PostComment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PostCommentList from "src/components/website/PostCommentList/PostCommentList";
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
  const locale = getLocale();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const dispatch = useAppDispatch();
  const { post,  isLoading } = useSelector((state: any) => state?.blog?.post ? state?.blog : { post: null, isLoading: false });
  const router = useRouter();
  const slugUrl = router.query.slug;
  const { classes } = styles();

  useEffect(() => {
    if (slugUrl) {
      getPostById(slugUrl as string);
    }
  }, [slugUrl]);
  
  const getPostById = async (id: string) =>{
    await dispatch(getBySlugUrl(id));
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <title>{post?.title}</title>
        <meta name="description" content={post?.shortDescription ?? ''} />

        <meta
          property="og:url"
          content={`https://test.test/blog/${post?.slugUrl ?? ''}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.shortDescription ?? ''} />
        <meta property="og:image" content={post?.image ?? ''} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="test.test" />
        <meta
          property="twitter:url"
          content={`https://test.test/blog/${post?.slugUrl ?? ''}`}
        />
        <meta name="twitter:title" content={post?.title} />
        <meta name="twitter:description" content={post?.shortDescription ?? ''} />
        <meta name="twitter:image" content={post?.image ?? ''} />
      </Head>
      <Content>
        <Container className={classes.container}>
          <GridContainer className={classes.mainContainer}>
            <GridItem lg={8} md={8} sm={8} xs={12} className={classes.itemContainer}>
              <TopicWrapper>
              <Topic>
                <TopicTitle>{post?.title}</TopicTitle>
                {post?.image ? (
                  <ImageListItem key={post?.id}>
                    <img
                      src={`${post?.image}`}
                      alt={post?.title}
                      title={post?.title}
                    />
                  </ImageListItem>
                ) : (
                  <StyledBlockPlaceholder />
                )}
                <div className={classes.postCntent}>
                  {Parser().parse(post?.content)}
                </div>
                <PostLine />
                <TopicFooter>
                  <StyledStack direction="row">
                    {post?.postTags?.map((p: TagDTO, index: number) => (
                      <StyledChip key={index}>{p.name}</StyledChip>
                    ))}
                  </StyledStack>
                  <DateWrapper>
                    <ClockIcon />
                    <DateText>
                    {localizationService.getLocalDateTime(post?.createdAt?.toString(), post?.locale)}
                    </DateText>
                  </DateWrapper>
                </TopicFooter>
              </Topic>

              {!!post?.relatedPosts?.length && (
                <>
                  <div className={classes.relatedPostTitle}>
                    <BlockHeader title={t("relatedPosts")} iconCssClass="share"/>
                  </div>               
                  <Grid container spacing={3}>
                    {post?.relatedPosts?.map((post: PostDTO, index: number) => {
                      return (
                        <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                          <SimilarPost post={post} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </>
              )}
            </TopicWrapper>
            <PostComment postId={post?.id}/>
            <PostCommentList postId={post?.id}/>
            </GridItem>
            <GridItem lg={4} md={4} sm={4} xs={12} className={classes.itemContainer}>
              <MostPopularPostList postCount={11} />
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

export const getServerSideProps: GetStaticProps = async ({
  locale,
  locales,
  query
}: any) => {
  return {
    props: {
      //...(await serverSideTranslations(locale, ["common"])),
    }
  }
};