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
import { AddUserRoleDTO } from 'src/models/security/userRole/addUserRoleDTO';
import { UpdateUserRoleDTO } from 'src/models/security/userRole/updateUserRoleDTO';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getById, update } from 'src/state/slices/userRoleSlice';
import { UserRoleDTO } from 'src/models/security/userRole/userRoleDTO';
import { FormProps } from 'src/types/shared/formType';
import CommonMessage from 'src/constants/commonMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TextValueDTO } from 'src/models/shared/list/textValueDTO';
import { UserDTO } from 'src/models/security/user/userDTO';
import { getAllUsers } from 'src/state/slices/userSlice';
import { getAllRoles } from 'src/state/slices/roleSlice';
import { RoleDTO } from 'src/models/security/role/roleDTO';

const UserRoleForm = ({id, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);
const [users, setUsers] = useState<TextValueDTO[]>([]);
const [roles, setRoles] = useState<TextValueDTO[]>([]);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common', 'security']);

useEffect(() => {
  if (id) {
    getItemById(id);
  }
  getAllUserList();
  getAllRoleList();
}, []);

const getItemById = async (id: string | number) => {
  const userRoleDTO: UserRoleDTO = await dispatch(getById(id)).unwrap();
  if (userRoleDTO) {
    await formik.setValues({
        userId: userRoleDTO.userId,
        roleId: userRoleDTO.roleId
      } as initialValuesType);
  }
}

const validationSchema = object({
  userId: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  roleId: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
  
});

const getAllUserList = async () => {
  const users: UserDTO[] = await dispatch(getAllUsers()).unwrap();
  const mappedUsers = users?.map(p => ({
    text: p.fullName,
    value: p.id
  } as TextValueDTO));
  setUsers(mappedUsers);
}

const getAllRoleList = async () => {
  const roles: RoleDTO[] = await dispatch(getAllRoles()).unwrap();
  const mappedRoles = roles?.map(p => ({
    text: p.name,
    value: p.id
  } as TextValueDTO));
  setRoles(mappedRoles);
}

type initialValuesType = {
  userId: string,
  roleId: string
};
const initialValues: initialValuesType = {
  userId: '',
  roleId: ''
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updateUserRoleData: UpdateUserRoleDTO = {
            id: id!,
            userId: values.userId,
            roleId: values.roleId
          };
          const result = await dispatch(update(updateUserRoleData)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addUserRoleData: AddUserRoleDTO = {
            userId: values.userId,
            roleId: values.roleId
          }
          const result = await dispatch(add(addUserRoleData)).unwrap();
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
                  id="userId"
                  name="userId"
                  label={t('user', CommonMessage.User)}
                  value={formik.values.userId}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.userId && Boolean(formik.errors.userId)}
                  helperText={formik.errors.userId}>
                  {users?.map((option) => (
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

export default UserRoleForm
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