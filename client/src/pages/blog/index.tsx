import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Grid } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import PaginationItem from "src/components/website/Pagination";
import Container from "src/components/website/Container";
import Post from "src/components/website/Post";
import { StyledTitle } from "src/components/website/common/styles";
import MainPageLayout from "src/layouts/website/MainPageLayout";
import { useAppDispatch } from "src/state/hooks/hooks";
import { useSelector } from "react-redux";
import useLocale from "src/hooks/useLocale";
import { ListPublishedPostByParamsDTO } from "src/models/contentManagement/post/listPublishedPostByParamsDTO";
import { getAllPublishedPostsByParams } from "src/state/slices/contentManagement/blogSlice";
import ApplicationParams from "src/constants/applicationParams";
import { PostDTO } from "src/models/contentManagement/post/postDTO";
import { useRouter } from "next/router";

type Props = {
  
};

const Blog: NextPage<Props> = () => {
  const router = useRouter();console.log(router)
  const [paginationModel, setPaginationModel] = React.useState<any>({
    page: 0,
    pageSize: ApplicationParams.GridDefaultPageSize
  });

  const [sortModel, setSortModel] = React.useState<any>([
    {
      field: ApplicationParams.GridDefaultSortColumn,
      sort: ApplicationParams.GridDefaultSortDirection
    },
  ]);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { getLocale } = useLocale();
  const locale = getLocale();
  const { posts, totalCount,  isLoading } = useSelector((state: any) => state?.blog?.posts ? state?.blog : { posts: [], totalCount: 0, isLoading: false });
  
  useEffect(() => {
    getAllPublishedPosts();
  }, []);

  const getAllPublishedPosts = () => {
    const listPublishedPostByParamsDTO : ListPublishedPostByParamsDTO = {
      currentPage: paginationModel.page,
      pageSize: ApplicationParams.BlogDefaultPageSize,
      sortModel: sortModel,
      locale: locale
    }
    dispatch(getAllPublishedPostsByParams(listPublishedPostByParamsDTO));
  }
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="description" content="Read our Blog"></meta>
        <title>Blog</title>
        <meta property="og:url" content="https://test.test/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="" />
        <meta property="twitter:url" content="" />
        <meta name="twitter:title" content="" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="" />
      </Head>
      <Container>
        <StyledTitle>{t("blog")}</StyledTitle>
        <Grid container spacing={3}>
          {posts?.map((post: PostDTO, index: number) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
        <PaginationItem
          pagesCount={Math.ceil(totalCount/ApplicationParams.BlogDefaultPageSize)}
          currentPage="1"
          postName="blog"
        />
      </Container>
    </>
  );
};

Blog.getLayout = (page: React.ReactNode) => <MainPageLayout>{ page }</MainPageLayout>
export default Blog;
