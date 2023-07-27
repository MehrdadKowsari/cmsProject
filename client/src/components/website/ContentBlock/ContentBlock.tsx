import { ReactNode, useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { ContentBlockDTO } from "src/models/contentManagement/contentBlock/contentBlockDTO";
import { useAppDispatch } from "src/state/hooks/hooks";
import { getContentBlockByParams } from "src/state/slices/contentManagement/contentSlice";
import { ContentBlockByParamsDTO } from "src/models/contentManagement/contentBlock/contentBlockByParamsDTO";
import useLocale from "src/hooks/useLocale";
import { Parser } from "html-to-react";
import BlockHeader from "../BlockHeader/BlockHeader";
import { iconClasses } from "@mui/material";

const styles = makeStyles()((theme) => ({
    text: {
        fontFamily: 'inherit',
        fontSize: "0.9rem",
        textAlign: "justify"
    }
}));

type Props = {
    sectionName?: string,
    title?: string,
    iconCssClass?: string,
    children?: ReactNode
}

const ContentBlock = ({sectionName, title, iconCssClass , children}: Props) => {
    const [content, SetContent] = useState<ContentBlockDTO | null>(null);
    const dispatch = useAppDispatch() 
    
    useEffect(() => {
      if (sectionName) {
        getContentBlock();
      }      
    }, []);

    const {getLocale} = useLocale();
    const locale = getLocale();
    const getContentBlock = async () =>{
        const contentBlockByParamsDTO: ContentBlockByParamsDTO = {
            sectionName: sectionName!,
            locale: locale
        };
        const contentBlock = await dispatch(getContentBlockByParams(contentBlockByParamsDTO)).unwrap();
        SetContent(contentBlock);
    }

    const { classes } = styles();
    return(
        <>
            {(content?.title || title) && <BlockHeader title={content?.title ? content.title: title!} iconCssClass={content?.iconCssClass || iconCssClass} /> }
            {content?.content && <div className={classes.text}>
                {Parser().parse(content?.content)}
            </div>}
            {children}
        </>
    );
}

export default ContentBlock;