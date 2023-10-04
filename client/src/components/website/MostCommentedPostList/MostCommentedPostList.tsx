import React, { useEffect } from "react";
import { PostDTO } from "src/models/contentManagement/post/postDTO";
import { useAppDispatch } from "src/state/hooks/hooks";
import { useSelector } from "react-redux";
import useLocale from "src/hooks/useLocale";
import { ListMostCommentedPostByParamsDTO } from "src/models/contentManagement/post/listMostCommentedPostByParamsDTO";
import { getAllMostCommentedPostsByParams } from "src/state/slices/contentManagement/blogSlice";
import BlogCard from "../BlogCard/BlogCard";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import BlockHeader from "../BlockHeader/BlockHeader";
import { useTranslation } from "next-i18next";

type Props = {
    postCount: number & 1 | 2 | 3 | 4 | 6 | 12;
}

const MostCommentedPostList: React.FC<Props> = ({ postCount }) => {
    const { mostCommentedPosts, isLoading } = useSelector((state: any) => state?.blog);
    const dispatch = useAppDispatch();
    const { getLocale } = useLocale();
    const locale = getLocale();
    const { t } = useTranslation();

    useEffect(() => {
      getMostCommentedPostList(postCount);
    }, [locale]);
    
    const getMostCommentedPostList = async (postCount: number) => {
        const listMostCommentedPostByParamsDTO : ListMostCommentedPostByParamsDTO = {
            count: postCount,
            locale
        };
        await dispatch(getAllMostCommentedPostsByParams(listMostCommentedPostByParamsDTO));
    }
    return(
        <>
            <BlockHeader title={t("mostCommentedPostList")} iconCssClass="message"/>
            {
                <GridContainer>
                    {mostCommentedPosts?.map((p: PostDTO) => (
                        <GridItem lg={12/postCount}>
                            <BlogCard
                                title={p.title || ''}
                                href={`/blog/${p.slugUrl}`} 
                                imageSrc={p.image}
                                imageAlt={p.title}/>
                        </GridItem>
                    ))}
                </GridContainer>
            }  
        </>
    );
}
export default MostCommentedPostList;