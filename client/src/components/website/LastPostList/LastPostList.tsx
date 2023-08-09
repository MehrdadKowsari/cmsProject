import React, { useEffect } from "react";
import { PostDTO } from "src/models/contentManagement/post/postDTO";
import { useAppDispatch } from "src/state/hooks/hooks";
import { useSelector } from "react-redux";
import useLocale from "src/hooks/useLocale";
import { ListLastPostByParamsDTO } from "src/models/contentManagement/post/listLastPostByParamsDTO";
import { getAllLastPostsByParams } from "src/state/slices/contentManagement/blogSlice";
import BlogCard from "../BlogCard/BlogCard";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import BlockHeader from "../BlockHeader/BlockHeader";
import { useTranslation } from "next-i18next";
import SimilarPost from "../SimilarPost";
import { PostLine } from "../common/styles";

type Props = {
    postCount: number;
}

const LastPostList: React.FC<Props> = ({ postCount }) => {
    const { lastPosts, isLoading } = useSelector((state: any) => state?.blog);
    const dispatch = useAppDispatch();
    const { getLocale } = useLocale();
    const locale = getLocale();
    const { t } = useTranslation();

    useEffect(() => {
      getLastPostList(postCount);
    }, [locale]);
    
    const getLastPostList = async (postCount: number) => {
        const listLastPostByParamsDTO : ListLastPostByParamsDTO = {
            count: postCount,
            locale
        };
        await dispatch(getAllLastPostsByParams(listLastPostByParamsDTO));
    }
    return(
        <>
            <BlockHeader title={t("lastPostList")} iconCssClass="edit"/>
            {
                <GridContainer>
                    {lastPosts?.map((p: PostDTO) => (
                        <GridItem lg={12} spacing={2}>
                            <SimilarPost post={p} />
                            <PostLine/>
                        </GridItem>
                    ))}
                </GridContainer>
            }  
        </>
    );
}
export default LastPostList;