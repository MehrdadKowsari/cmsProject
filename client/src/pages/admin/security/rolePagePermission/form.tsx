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
import { AddRolePagePermissionDTO } from 'src/models/security/rolePagePermission/addRolePagePermissionDTO';
import { UpdateRolePagePermissionDTO } from 'src/models/security/rolePagePermission/updateRolePagePermissionDTO';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getById, update } from 'src/state/slices/rolePagePermissionSlice';
import { RolePagePermissionDTO } from 'src/models/security/rolePagePermission/rolePagePermissionDTO';
import { FormProps } from 'src/types/shared/formType';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';
import { getAllRoles } from 'src/state/slices/roleSlice';
import { RoleDTO } from 'src/models/security/role/roleDTO';
import { getAllPagePermissions } from 'src/state/slices/pagePermissionSlice';
import { PagePermissionDTO } from 'src/models/security/pagePermission/pagePermissionDTO';
import SecurityMessage from 'src/constants/securityMessage';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkey from 'src/constants/hotkey';

const RolePagePermissionForm = ({id, permissions, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [hasInsertPermission, setHasInsertPermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Add));
const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(permissions?.some(p => p.type === PermissionTypeEnum.Update));
const [pagePermissions, setPagePermissions] = useState<TextValueDTO[]>([]);
const [roles, setRoles] = useState<TextValueDTO[]>([]);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common', 'security']);

useEffect(() => {
  if (id) {
    getItemById(id);
  }
  getAllPagePermissionList();
  getAllRoleList();
}, []);

const getItemById = async (id: string | number) => {
  const rolePagePermissionDTO: RolePagePermissionDTO = await dispatch(getById(id)).unwrap();
  if (rolePagePermissionDTO) {
    await formik.setValues({
        pagePermissionId: rolePagePermissionDTO.pagePermissionId,
        roleId: rolePagePermissionDTO.roleId
      } as initialValuesType);
  }
}

const validationSchema = object({
  pagePermissionId: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  roleId: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
  
});

const getAllPagePermissionList = async () => {
  const pagePermissions: PagePermissionDTO[] = await dispatch(getAllPagePermissions()).unwrap();
  const mappedPagePermissions = pagePermissions?.map(p => ({
    text: `${p.pageName} - ${p.permissionName}`,
    value: p.id
  } as TextValueDTO));
  setPagePermissions(mappedPagePermissions);
}

const getAllRoleList = async () => {
  const roles: RoleDTO[] = await dispatch(getAllRoles()).unwrap();
  const mappedRoles = roles?.map(p => ({
    text: p.name,
    value: p.id
  } as TextValueDTO));
  setRoles(mappedRoles);
}

//#region hotkey
useHotkeys(Hotkey.Save,() => formik.submitForm())
useHotkeys(Hotkey.Reset,() => formik.resetForm())
//#endregion

type initialValuesType = {
  pagePermissionId: string,
  roleId: string
};
const initialValues: initialValuesType = {
  pagePermissionId: '',
  roleId: ''
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updateRolePagePermissionData: UpdateRolePagePermissionDTO = {
            id: id!,
            pagePermissionId: values.pagePermissionId,
            roleId: values.roleId
          };
          const result = await dispatch(update(updateRolePagePermissionData)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addRolePagePermissionData: AddRolePagePermissionDTO = {
            pagePermissionId: values.pagePermissionId,
            roleId: values.roleId
          }
          const result = await dispatch(add(addRolePagePermissionData)).unwrap();
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
                  id="roleId"
                  name="roleId"
                  label={t('role', CommonMessage.Role)}
                  value={formik.values.roleId} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.roleId && Boolean(formik.errors.roleId)}
                  helperText={formik.errors.roleId}>
                    {roles?.map((option) => (
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
                  id="pagePermissionId"
                  name="pagePermissionId"
                  label={t('security:pagePermission', SecurityMessage.PagePermission)}
                  value={formik.values.pagePermissionId}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.pagePermissionId && Boolean(formik.errors.pagePermissionId)}
                  helperText={formik.errors.pagePermissionId}>
                  {pagePermissions?.map((option) => (
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

export default RolePagePermissionForm
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