import { ReactNode, useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { ContentBlockDTO } from "src/models/contentManagement/contentBlock/contentBlockDTO";
import { useAppDispatch } from "src/state/hooks/hooks";
import { getContentBlockByParams } from "src/state/slices/contentManagement/contentSlice";
import { ContentBlockByParamsDTO } from "src/models/contentManagement/contentBlock/contentBlockByParamsDTO";
import useLocale from "src/hooks/useLocale";
import { Parser } from "html-to-react";
import BlockHeader from "../BlockHeader/BlockHeader";
import COLORS from "src/constants/colors";

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
    titleBgColor?: string,
    iconCssClass?: string,
    children?: ReactNode
}

const ContentBlock = ({sectionName, title, iconCssClass, titleBgColor , children}: Props) => {
    const [content, SetContent] = useState<ContentBlockDTO | null>(null);
    const {getLocale} = useLocale();
    const locale = getLocale();
    
    const dispatch = useAppDispatch() 
    
    useEffect(() => {
      if (sectionName) {
        getContentBlock();
      }      
    }, [locale]);
    
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
            {(content?.title || title) && <BlockHeader title={content?.title ? content.title: title!} iconCssClass={content?.iconCssClass || iconCssClass} bgColor={titleBgColor || COLORS.WHITE} /> }
            {content?.content && <div className={classes.text}>
                {Parser().parse(content?.content)}
            </div>}
            {children}
        </>
    );
}

export default ContentBlock;