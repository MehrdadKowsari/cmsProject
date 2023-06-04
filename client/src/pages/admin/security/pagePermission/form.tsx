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
import notification from '../../../../services/shared/notificationService';
import { AddPagePermissionDTO } from 'src/models/security/pagePermission/addPagePermissionDTO';
import { UpdatePagePermissionDTO } from 'src/models/security/pagePermission/updatePagePermissionDTO';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getById, update } from 'src/state/slices/pagePermissionSlice';
import { PagePermissionDTO } from 'src/models/security/pagePermission/pagePermissionDTO';
import { FormProps } from 'src/types/shared/formType';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';
import { getAllPages } from 'src/state/slices/pageSlice';
import { PageDTO } from 'src/models/security/page/pageDTO';
import { PermissionDTO } from 'src/models/security/permission/permissionDTO';
import { getAllPermissions } from 'src/state/slices/permissionSlice';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkey from 'src/constants/hotkey';

const PagePermissionForm = ({id, permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [pages, setPages] = useState<TextValueDTO[]>([]);
const [permissionList, setPermissionList] = useState<TextValueDTO[]>([]);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common', 'security']);

useEffect(() => {
  if (id) {
    getItemById(id);
  }
  getAllPageList();
  getAllPermissionList();
}, []);

const getItemById = async (id: string | number) => {
  const pagePermissionDTO: PagePermissionDTO = await dispatch(getById(id)).unwrap();
  if (pagePermissionDTO) {
    await formik.setValues({
        pageId: pagePermissionDTO.pageId,
        permissionId: pagePermissionDTO.permissionId
      } as initialValuesType);
  }
}

const validationSchema = object({
  pageId: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  permissionId: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
  
});

const getAllPageList = async () => {
  const pages: PageDTO[] = await dispatch(getAllPages()).unwrap();
  const mappedPages = pages?.map(p => ({
    text: p.name,
    value: p.id
  } as TextValueDTO));
  setPages(mappedPages);
}

const getAllPermissionList = async () => {
  const permissionList: PermissionDTO[] = await dispatch(getAllPermissions()).unwrap();
  const mappedPermissions = permissionList?.map(p => ({
    text: p.name,
    value: p.id
  } as TextValueDTO));
  setPermissionList(mappedPermissions);
}

//#region hotkey
useHotkeys(Hotkey.Save,() => formik.submitForm())
useHotkeys(Hotkey.Reset,() => formik.resetForm())
//#endregion

type initialValuesType = {
  pageId: string,
  permissionId: string
};
const initialValues: initialValuesType = {
  pageId: '',
  permissionId: ''
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updatePagePermissionData: UpdatePagePermissionDTO = {
            id: id!,
            pageId: values.pageId,
            permissionId: values.permissionId
          };
          const result = await dispatch(update(updatePagePermissionData)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addPagePermissionData: AddPagePermissionDTO = {
            pageId: values.pageId,
            permissionId: values.permissionId
          }
          const result = await dispatch(add(addPagePermissionData)).unwrap();
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
                  id="pageId"
                  name="pageId"
                  label={t('page', CommonMessage.Page)}
                  value={formik.values.pageId}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.pageId && Boolean(formik.errors.pageId)}
                  helperText={formik.errors.pageId}>
                  {pages?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.text}
                    </MenuItem>
                  ))}
                </TextField> 
                </Grid>
                <Grid item lg={12}>
                  <TextField
                  select 
                  fullWidth
                  id="permissionId"
                  name="permissionId"
                  label={t('permission', CommonMessage.Permission)}
                  value={formik.values.permissionId} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.permissionId && Boolean(formik.errors.permissionId)}
                  helperText={formik.errors.permissionId}>
                    {permissionList?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={12}>
                  <Button
                  type="submit"
                  variant="contained" 
                  size="small"
                  title={Hotkey.Save.toLocaleUpperCase()}
                  disabled={(isUpdate && !hasUpdatePermission) || (!isUpdate && !hasInsertPermission)}
                  startIcon={<SaveIcon/>}>
                    <span>{t('save', CommonMessage.Save)}</span>
                  </Button>  
                  <Button
                  type="reset"
                  variant="outlined" 
                  size="small"
                  color="secondary"
                  title={Hotkey.Reset.toLocaleUpperCase()}
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

export default PagePermissionForm
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