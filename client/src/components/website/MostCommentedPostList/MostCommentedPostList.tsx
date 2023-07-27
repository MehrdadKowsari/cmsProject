import React, { useEffect, useState } from "react";
import { PostDTO } from "src/models/contentManagement/post/postDTO";
import { useAppDispatch } from "src/state/hooks/hooks";
import { useSelector } from "react-redux";
import useLocale from "src/hooks/useLocale";
import { ListMostCommentedPostByParamsDTO } from "src/models/contentManagement/post/ListMostCommentedPostByParamsDTO";
import { getAllMostCommentedPostsByParams } from "src/state/slices/contentManagement/blogSlice";
import BlogCard from "../BlogCard/BlogCard";

type Props = {
    postCount: number;
}

const MostCommentedPostList: React.FC<Props> = ({ postCount }) => {
    const { mostCommentedPosts, isLoading } = useSelector((state: any) => state?.blog);
    const dispatch = useAppDispatch();
    const { getLocale } = useLocale();
    const locale = getLocale();

    useEffect(() => {
      getMostCommentedPostList(postCount);
    }, []);
    
    const getMostCommentedPostList = async (postCount: number) => {
        const listMostCommentedPostByParamsDTO : ListMostCommentedPostByParamsDTO = {
            count: postCount,
            locale
        };
        await dispatch(getAllMostCommentedPostsByParams(listMostCommentedPostByParamsDTO));
    }
    return(
        <>
            {
                mostCommentedPosts?.map((p: PostDTO) => {
                    <BlogCard
                    title={p.shortDescription || ''}
                    href={`/blog/${p.slugUrl}`} 
                    imageSrc={p.image}
                    imageAlt={p.title}/>
                })
            }  
        </>
    );
}
export default MostCommentedPostList;