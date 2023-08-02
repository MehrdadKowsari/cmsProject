import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import PaginationItem from "src/components/website/Pagination";
import Container from "src/components/website/Container";
import Post from "src/components/website/Post";
import ApplicationParams from "src/constants/applicationParams";
import { ListPublishedPostByParamsDTO } from "src/models/contentManagement/post/listPublishedPostByParamsDTO";
import { useSelector } from "react-redux";
import InternalPageLayout from "src/layouts/website/InternalPageLayout";
import { PostDTO } from "src/models/contentManagement/post/postDTO";
import { useAppDispatch } from "src/state/hooks/hooks";
import useLocale from "src/hooks/useLocale";
import { getAllPublishedPostsByParams } from "src/state/slices/contentManagement/blogSlice";
import { container } from 'src/styles/jss/globalStyle';
import { makeStyles } from 'tss-react/mui';
import BlockHeader from "src/components/website/BlockHeader/BlockHeader";
import CommonMessage from "src/constants/commonMessage";
import GridContainer from "src/components/website/Grid/GridContainer";
import GridItem from "src/components/website/Grid/GridItem";

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

const Blog: NextPage = () => {
  const router = useRouter();
    const page: number = router?.query?.page && Number(router?.query?.page) ? Number(router.query.page) - 1 : 0;
    const [sortModel, setSortModel] = React.useState<any>([
      {
        field: ApplicationParams.GridDefaultSortColumn,
        sort: ApplicationParams.GridDefaultSortDirection
      },
    ]);

  const { classes } = styles();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { getLocale } = useLocale();
  const locale = getLocale();
  const { posts, totalCount,  isLoading } = useSelector((state: any) => state?.blog?.posts ? state?.blog : { posts: [], totalCount: 0, isLoading: false });
  
  useEffect(() => {
    getAllPublishedPosts();
  }, [page]);

  const getAllPublishedPosts = () => {
    const listPublishedPostByParamsDTO : ListPublishedPostByParamsDTO = {
      currentPage: page,
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
        <title>{t("blog", CommonMessage.Blog)!}</title>
      </Head>
      <Container className={classes.container}>
        <GridContainer spacing={3} className={classes.mainContainer}>
        <GridItem lg={12} className={classes.itemContainer}>
          <BlockHeader title={t("blog", CommonMessage.Blog)!} iconCssClass="article"/>
        </GridItem>
          {posts?.map((post: PostDTO, index: number) => (
            <GridItem xs={12} sm={6} md={6} lg={6} key={index} className={classes.postItem}>
              <Post post={post} />
            </GridItem>
          ))}
        </GridContainer>
        <PaginationItem
          pagesCount={Math.ceil(totalCount/ApplicationParams.BlogDefaultPageSize)}
          currentPage={page + 1}
          postName="blog"
        />
      </Container>
    </>
  );
};

Blog.getLayout = (page: React.ReactNode) => <InternalPageLayout>{ page }</InternalPageLayout>
export default Blog;
