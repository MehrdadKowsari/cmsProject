import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid, ImageListItem, useMediaQuery } from "@mui/material";
import { GetStaticProps, NextPage } from "next";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { isImagePath } from "src/helpers/isImagePath";
import Container from "src/components/website/Container";
import SimilarPost from "src/components/website/SimilarPost";
import PopUpDevelopment from "src/components/website/PopUpDevelopment";
import { Post as PostType, UrlInfo } from "src/types/post";
import { PopUpT } from "src/types/popup";
import { API } from "src/config/api";
import { API_ROUTES } from "src/config/apiRoutes";
import { ClockIcon } from "src/svg";
import style from "./markdown-styles.module.css";

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
  TopicWrapper,
} from "src/components/website/common/styles";
import { DateText } from "src/components/website/Post/styles";
import {
  DESKTOP_MEDIA_QUERY,
  MOBILE_MEDIA_QUERY,
} from "src/constants/breakpoints";
import { getBySlugUrl } from "src/state/slices/contentManagement/blogSlice";
import { useAppDispatch } from "src/state/hooks/hooks";
import { PostDTO } from "src/models/contentManagement/post/postDTO";
import useLocale from "src/hooks/useLocale";
import localizationService from "src/services/shared/localizationService";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
interface Props extends PopUpT {
  
}

const Post: NextPage<Props> = ({ setPopup, popup }) => {
  const { getLocale } = useLocale();
  const locale = getLocale();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const dispatch = useAppDispatch();
  const { post,  isLoading } = useSelector((state: any) => state?.blog?.post ? state?.blog : { post: null, isLoading: false });
  const router = useRouter();
  const slugUrl: string = router.query.url as string;

  useEffect(() => {
    getBySEOUrl(slugUrl)
  }, []);
  
  const getBySEOUrl = async (slugUrl: string) =>{
    await dispatch(getBySlugUrl(slugUrl));
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
        <Container>
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
              <div className={style.reactMarkDown}>
                <ReactMarkdown linkTarget="_blank">
                  {post?.content || ""}
                </ReactMarkdown>
              </div>
              <PostLine />
              <TopicFooter>
                {/* <StyledStack direction="row">
                  {post?.tags.map((tag: string, index) => (
                    <StyledChip key={index}>{tag}</StyledChip>
                  ))}
                </StyledStack> */}
                <DateWrapper>
                  <ClockIcon />
                  <DateText>
                  {localizationService.getLocalDateTime(post?.createdAt?.toString(), locale)}
                  </DateText>
                </DateWrapper>
              </TopicFooter>
            </Topic>

            {/* {!!post?.similarArticles.length && (
              <>
                <StyledTitle>{t("similarArticles")}</StyledTitle>
                <Grid container spacing={3}>
                  {post?.similarArticles.map((post, index) => {
                    return (
                      <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                        <SimilarPost post={post} />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )} */}
          </TopicWrapper>
        </Container>
      </Content>
      <PopUpDevelopment popup={popup} setPopup={setPopup} />
    </>
  );
};

export default Post;
