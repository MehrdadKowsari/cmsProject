import React,  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save'
import ClearIcon from '@mui/icons-material/Clear'
import { useFormik } from 'formik';
import {object, string} from 'yup';
import notification from '../../../../services/notificationService';
import { AddPageDTO } from 'src/models/security/page/addPageDTO';
import { UpdatePageDTO } from 'src/models/security/page/updatePageDTO';
import { FormProps } from 'src/types/shared/formType';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getAllPages, getById, update } from 'src/state/slices/pageSlice';
import { PageDTO } from 'src/models/security/page/pageDTO';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ApplicationParams from 'src/constants/applicationParams';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';

const PageForm = ({id, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [pages, setPages] = useState<TextValueDTO[]>([]);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common', 'security']);

useEffect(() => {
  if (id) {
    getItemById(id);
  }
  getAllPageList();
}, []);

const getItemById = async (id: string | number) => {
  const pageDTO: PageDTO = await dispatch(getById(id)).unwrap();
  if (pageDTO) {
    await formik.setValues({
        name: pageDTO.name,
        parentId: pageDTO.parentId,
        priority: pageDTO.priority,
        iconClass: pageDTO.iconClass
      } as initialValuesType);
  }
}

const getAllPageList = async () => {
  const pages: PageDTO[] = await dispatch(getAllPages()).unwrap();
  const mappedPages = pages?.map(p => ({
    text: p.name,
    value: p.id
  } as TextValueDTO));
  setPages(mappedPages);
}

const validationSchema = object({
  name: string().max(ApplicationParams.NameMaxLenght, t('minLenghtForThisFieldIsN', CommonMessage.MaxLenghtForThisFieldIsN(ApplicationParams.NameMaxLenght), { n: `${ApplicationParams.NameMaxLenght}`})!).required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  priority: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
});

type initialValuesType = {
  name: string,
  parentId?: string | null,
  iconClass?: string | null,
  priority: number
};
const initialValues: initialValuesType = {
  name: '',
  parentId: '',
  iconClass: '',
  priority: 1
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updatePageData: UpdatePageDTO = {
            id: id!,
            name: values.name,
            parentId: values.parentId ? values.parentId : null,
            iconClass: values.iconClass,
            priority: values.priority
          };
          const result = await dispatch(update(updatePageData)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addPageData: AddPageDTO = {
            name: values.name,
            parentId: values.parentId ? values.parentId : null,
            iconClass: values.iconClass,
            priority: values.priority
          }
          const result = await dispatch(add(addPageData)).unwrap();
          if (result) {
            onClose();
          }         
        }
      }
      else{
        notification.showErrorMessage(t('formDataIsInvalid', CommonMessage.FormDataIsInvalid)!)
      }
    }
  })
  
  return (
    <Card>
      <CardHeader 
      title={isUpdate ? t('update', CommonMessage.Update) : t('new', CommonMessage.New)}
      titleTypographyProps={{variant: 'h6'}}>
      </CardHeader>
      <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12}>
        <Box>
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Grid container 
            spacing={3}
            justifyContent="center">
                <Grid item lg={12}>
                  <TextField
                  select 
                  fullWidth
                  id="parentId"
                  name="parentId"
                  label={t('parent', CommonMessage.Parent)}
                  value={formik.values.parentId} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.parentId && Boolean(formik.errors.parentId)}
                  helperText={formik.errors.parentId}>
                    {pages.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id="name"
                  label={t('name', CommonMessage.Name)}
                  value={formik.values.name}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.errors.name}/> 
                </Grid>
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id="priority"
                  label={t('priority', CommonMessage.Priority)}
                  value={formik.values.priority}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.priority && Boolean(formik.errors.priority)}
                  helperText={formik.errors.priority}/> 
                </Grid>
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id="iconClass"
                  label={t('iconClass', CommonMessage.Description)}
                  value={formik.values.iconClass}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.iconClass && Boolean(formik.errors.iconClass)}
                  helperText={formik.errors.iconClass}/> 
                </Grid>
                <Grid item lg={12}>
                  <Button
                  type="submit"
                  variant="contained" 
                  size="small"
                  color="success"
                  startIcon={<SaveIcon/>}>
                    <span>{t('save', CommonMessage.Save)}</span>
                  </Button>  
                  <Button
                  type="reset"
                  variant="outlined" 
                  size="small"
                  color="secondary"
                  sx={{mx: 3}}
                  startIcon={<ClearIcon/>}>
                    <span>{t('reset', CommonMessage.Reset)}</span>
                  </Button>  
                </Grid>
            </Grid>
          </form>
          </Box>
        </Grid>
    </Grid>
      </CardContent>
    </Card> 
  )
}

export default PageForm
type Props = {
  // Add custom props here
}
export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common','security'])),
  },
})