import React, { useEffect } from "react";
import { useAppDispatch } from "src/state/hooks/hooks";
import { useSelector } from "react-redux";
import { getAllAcceptedPostCommentsByPostId } from "src/state/slices/contentManagement/blogSlice";
import BlockHeader from "../BlockHeader/BlockHeader";
import { useTranslation } from "next-i18next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "tss-react/mui";
import { PostCommentDTO } from "src/models/contentManagement/postComment/postCommentDTO";
import { Box } from "@mui/material";

const useStyles = makeStyles()((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(10)
    },
    listItem:{
      borderColor: theme.palette.secondary.light,
      borderWidth: '1px',
      borderStyle: 'solid',
      marginBottom: theme.spacing(2),
      textAlign: 'inherit'
    }
  }));

type Props = {
    postId: string;
}

const PostCommentList: React.FC<Props> = ({ postId }) => {
    const { postComments, isLoading } = useSelector((state: any) => state?.blog);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { classes } = useStyles();

    useEffect(() => {
      if (postId){
        getPostCommentList(postId);
      }
    }, [postId]);
    
    const getPostCommentList = async (postId: string) => {
        await dispatch(getAllAcceptedPostCommentsByPostId(postId));
    }
    return(
        <>
          { postComments?.length > 0 ?
            <Box className={classes.root}>
                <BlockHeader title={`${postComments.length} ${t("comment")}`} iconCssClass="comment"/>  
                <List>
                  {postComments.map((comment: PostCommentDTO, index: number) => (
                        <ListItem key={index} className={classes.listItem}>
                          <ListItemText
                            primary={
                              <React.Fragment>
                                {comment.fullName}
                              </React.Fragment>
                            }
                            secondary={comment.comment}
                          />
                        </ListItem>
                  ))}
                </List>
              </Box>           
          :
           <Box className={classes.root}>
            <span>{t("noCommentRegistered")}</span> 
           </Box>
          }  
        </>
    );
}
export default PostCommentList;