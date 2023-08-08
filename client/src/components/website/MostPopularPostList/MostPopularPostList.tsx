import React, { useEffect } from "react";
import { PostDTO } from "src/models/contentManagement/post/postDTO";
import { useAppDispatch } from "src/state/hooks/hooks";
import { useSelector } from "react-redux";
import useLocale from "src/hooks/useLocale";
import { ListMostPopularPostByParamsDTO } from "src/models/contentManagement/post/listMostPopularPostByParamsDTO";
import { getAllMostPopularPostsByParams } from "src/state/slices/contentManagement/blogSlice";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import BlockHeader from "../BlockHeader/BlockHeader";
import { useTranslation } from "next-i18next";
import LinkItem from "../LinkItem/LinkItem";

type Props = {
    postCount: number;
}

const MostPopularPostList: React.FC<Props> = ({ postCount }) => {
    const { mostPopularPosts, isLoading } = useSelector((state: any) => state?.blog);
    const dispatch = useAppDispatch();
    const { getLocale } = useLocale();
    const locale = getLocale();
    const { t } = useTranslation();

    useEffect(() => {
      getMostPopularPostList(postCount);
    }, [locale]);
    
    const getMostPopularPostList = async (postCount: number) => {
        const listMostPopularPostByParamsDTO : ListMostPopularPostByParamsDTO = {
            count: postCount,
            locale
        };
        await dispatch(getAllMostPopularPostsByParams(listMostPopularPostByParamsDTO));
    }
    return(
        <>
            <BlockHeader title={t("mostPopularPostList")} iconCssClass="whatshot"/>
            {
                <GridContainer>
                    <GridItem lg={12}>
                        <ul style={{listStyleType: "none", padding: 0, margin: 0}}>
                            {mostPopularPosts?.map((p: PostDTO) => (
                                <li key={p.id}>
                                    <LinkItem
                                    title={p.title || ''}
                                    href={`/blog/${p.slugUrl}`}
                                    iconCssClass='whatshot'/>
                                </li>
                            ))}
                        </ul>
                    </GridItem>
                </GridContainer>
            }  
        </>
    );
}
export default MostPopularPostList;