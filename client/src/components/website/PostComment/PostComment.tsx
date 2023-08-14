import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/SendOutlined'
import { useFormik } from 'formik';
import {object, string} from 'yup';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { useTranslation } from 'next-i18next';
import CommonMessage from 'src/constants/commonMessage';
import SecurityMessage from 'src/constants/securityMessage';
import { AddPostCommentDTO } from 'src/models/contentManagement/postComment/addPostCommentDTO';
import { addPostComment } from 'src/state/slices/contentManagement/blogSlice';
import notificationService from '../../../services/shared/notificationService';
import BlockHeader from '../BlockHeader/BlockHeader';

interface Props {
  postId: string
}

const PostComment = ({ postId }: Props) => {
const dispatch = useAppDispatch();
const { t } = useTranslation(['common', 'security']);


const validationSchema = object({
  comment: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  email: string().required().email(t('filedIsRequired', CommonMessage.RequiredFiled)!)
});

const initialValues: AddPostCommentDTO = {
  postId,
  fullName: '',
  comment: '',
  email: '',
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        try {
          const result = await dispatch(addPostComment(values)).unwrap();
          if (result) {
            formik.resetForm({errors: {}});
            notificationService.showSuccessMessage(t("successOperation", CommonMessage.SuccessOperation)!);
          }
        } catch (error) {
          notificationService.showSuccessMessage(t("unknownErrorHappened", CommonMessage.UnknownErrorHappened)!);
        }
      }
    }

  })
  
  
  return (
    <>
        <Container>
          <Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container
            spacing={3}
            justifyContent="center">
                <Grid item xs={12}>
                <BlockHeader title={t("comments", CommonMessage.Comments)} iconCssClass="comment"/> 
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                  fullWidth 
                  id="fullName"
                  label={t("fullName", CommonMessage.FirstName)}
                  value={formik.values.fullName}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.errors.fullName}/> 
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                  fullWidth 
                  id="email"
                  label={t("email", CommonMessage.Email)}
                  value={formik.values.email}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.errors.email}/> 
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                  fullWidth 
                  id="comment"
                  label={t("comment", CommonMessage.Email)}
                  value={formik.values.comment}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.comment && Boolean(formik.errors.comment)}
                  helperText={formik.errors.comment}
                  multiline={true}
                  rows={4}/> 
                </Grid>
                <Grid item xs={12}>
                  <Button
                  type="submit"
                  variant="contained" 
                  size="large"
                  startIcon={<SendIcon/>}>
                    <span>{t("submit",CommonMessage.Submit) }</span>
                  </Button>  
                </Grid>
            </Grid>
          </form>
          </Box>
        </Container>
    </>
  )
}

export default PostComment
