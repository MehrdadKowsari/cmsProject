import React,  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save'
import ClearIcon from '@mui/icons-material/Clear'
import { useFormik } from 'formik';
import {object, string} from 'yup';
import * as yup from 'yup';
import notification from '../../../../services/notificationService';
import { AddUserDTO } from 'src/models/security/user/addUserDTO';
import { UpdateUserDTO } from 'src/models/security/user/updateUserDTO';
import { FormProps } from 'src/types/shared/formType';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { add, getById, update } from 'src/state/slices/userSlice';
import { UserDTO } from 'src/models/security/user/userDTO';
import CommonMessage from 'src/constants/commonMessage';
import SecurityMessage from 'src/constants/securityMessage';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


const UserForm = ({id, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);

const dispatch = useAppDispatch();
const { t } = useTranslation(['common', 'security']);

useEffect(() => {
  if (id) {
    getItemById(id);
      
  }
}, []);

const getItemById = async (id: string | number) => {
  const userDTO: UserDTO = await dispatch(getById(id)).unwrap();
  if (userDTO) {
    await formik.setValues({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: userDTO.email,
        userName: userDTO.userName      
      } as initialValuesType);
  }
}

const newItemValidationSchema = object({
  firstName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  lastName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  email: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!).email(t('thisFieldDidNotEnterCorrectly', CommonMessage.ThisFieldDidNotEnterCorrectly)!),
  userName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  password: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  confirmPassword: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!).oneOf([yup.ref("password")], t('confirmPasswordDoNotMatch', SecurityMessage.ConfirmPasswordDoesNotMatch)!)
});

const updateItemValidationSchema = object({
  firstName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  lastName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  email: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!).email(t('thisFieldDidNotEnterCorrectly', CommonMessage.ThisFieldDidNotEnterCorrectly)!),
  userName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
});

type initialValuesType = {
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  password?: string | undefined,
  confirmPassword?: string| undefined
};
const initialValues: initialValuesType = {
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  password: '',
  confirmPassword: ''
};
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: isUpdate ? updateItemValidationSchema : newItemValidationSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updateUserData: UpdateUserDTO = {
            id: id!,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            userName: values.userName
          };
          const result = await dispatch(update(updateUserData)).unwrap();
          if (result) {
            onClose();
          }
        } else {
          const addUserData: AddUserDTO = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            userName: values.userName,
            password: values.password!,
            confirmPassword: values.confirmPassword!
          }
          const result = await dispatch(add(addUserData)).unwrap();
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
                  fullWidth 
                  id="firstName"
                  label={t('firstName', CommonMessage.FirstName)}
                  value={formik.values.firstName}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.errors.firstName}/> 
                </Grid>
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id="lastName"
                  label={t('lastName', CommonMessage.LastName)}
                  value={formik.values.lastName}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.errors.lastName}/> 
                </Grid>
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id="email"
                  label={t('email', CommonMessage.Email)}
                  value={formik.values.email}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.errors.email}/> 
                </Grid>
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id="userName"
                  label={t('username', CommonMessage.Username)}
                  value={formik.values.userName}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.errors.userName}/> 
                </Grid>
                {!isUpdate && <Grid item lg={12}>
                  <TextField
                  fullWidth 
                  type='password'
                  id="password"
                  label={t('password', CommonMessage.Password)}
                  value={formik.values.password}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.errors.password}/> 
                </Grid>}
                {!isUpdate && <Grid item lg={12}>
                  <TextField
                  fullWidth 
                  type='password'
                  id="confirmPassword"
                  label={t('confirmPassword', CommonMessage.Password)}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.errors.confirmPassword}/> 
                </Grid>}
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

export default UserForm