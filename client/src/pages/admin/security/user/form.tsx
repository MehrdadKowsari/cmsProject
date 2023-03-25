import React,  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/PersonOutlined'
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


const UserForm = ({id, onClose}: FormProps) => {
const [isUpdate, setIsUpdate] = useState<boolean>(id ? true : false);

const dispatch = useAppDispatch();
const { t } = useTranslation(['commmon', 'security']);

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
        userName: userDTO.userName,
        password: '',
        confirmPassword: ''
      } as AddUserDTO);
  }
}

const newItemSchema = object({
  firstName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  lastName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  email: string().required().email(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  userName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  password: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  confirmPassword: string().required().oneOf([yup.ref("password")], t('confirmPasswordDoNotMatch', SecurityMessage.ConfirmPasswordDoesNotMatch)!)
});
const userName = t('username', CommonMessage.Username);

const addInitialValues: AddUserDTO = {
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  password: '',
  confirmPassword: ''
};
  const formik = useFormik({
    initialValues: addInitialValues,
    validationSchema: newItemSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isUpdate) {
          const updateUserData: UpdateUserDTO = {
            id: id!,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            userName: values.userName,
            password: values.password,
            confirmPassword: values.confirmPassword
          };
          const result = await dispatch(update(updateUserData));
          if (result) {
            onClose();
          }
        } else {
          const addUserData: AddUserDTO = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            userName: values.userName,
            password: values.password,
            confirmPassword: values.confirmPassword
          }
          const result = await dispatch(add(addUserData));
          if (result) {
            onClose();
          }
          
        }
      }
      else{
        notification.showErrorMessage('form data are invalid')
      }
    }

  })
  
  return (
    <Grid container spacing={6}>
        <Grid item xs={12}>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container 
            spacing={3}
            justifyContent="center">
                <Grid item>
                </Grid>
                <Grid item lg={12}>
                  <Typography variant="h4">
                    <span>{isUpdate ? "Update" : "Add New" }</span>
                  </Typography>  
                </Grid>
                <Grid item lg={12}>
                  <TextField 
                  fullWidth 
                  id="firstName"
                  label="First Name"
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
                  label="Last Name"
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
                  label="Email"
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
                  label={userName}
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
                  label="Password"
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
                  label="Confirm Password"
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
                  size="large"
                  color="success"
                  startIcon={isUpdate ? <PersonIcon/> : <LoginIcon />}>
                    <span>{isUpdate ? "Update" : "Add New" }</span>
                  </Button>  
                </Grid>
            </Grid>
          </form>
          </Box>
        </Grid>
    </Grid>
    
  )
}

export default UserForm