import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button, { ButtonProps } from '@mui/material/Button';
import { useAuth } from 'src/state/providers/AuthProvider';
import { object, string } from 'yup';
import CommonMessage from 'src/constants/commonMessage';
import { useFormik } from 'formik';
import { UpdateUserProfileDTO } from 'src/models/security/user/updateUserProfileDTO';
import notificationService from 'src/services/shared/notificationService';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { updateProfile } from 'src/state/slices/userSlice';
import { UserDTO } from 'src/models/security/user/userDTO';
import ApplicationParams from 'src/constants/applicationParams';
import { useTranslation } from 'next-i18next';
import { PermissionDTO } from 'src/models/security/permission/permissionDTO';
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum';
import { useHotkeys } from 'react-hotkeys-hook';
import Hotkey from 'src/constants/hotkey';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}));

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}));

type TabAccountProps = {
  permissions: PermissionDTO[]
}

const TabAccount = (props: TabAccountProps) => {
  const { user, setUserInfo } = useAuth();
  const [hasUpdatePermission, setHasUpdatePermission] = useState<boolean>(props?.permissions?.some(p => p.type === PermissionTypeEnum.Update));
  const [userIamge, setUserImage] = useState<string>(user?.image);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'security'])

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => { 
        setUserImage(reader.result as string);
        (file.target as HTMLInputElement).value = '';
      }

      reader.readAsDataURL(files[0])
    }
  }

  const handleResetUserImage = () => {
    setUserImage(user?.image);
  }
//#region hotkey
useHotkeys(Hotkey.Save,() => formik.submitForm())
useHotkeys(Hotkey.Reset,() => formik.resetForm())
//#endregion
  
  const initialValues: UpdateUserProfileDTO = {
    id: user?.id,
    image: userIamge,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    userName: user?.userName
  };
  
  const newItemSchema = object({
    firstName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
    lastName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
    email: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!).email(t('filedIsRequired', CommonMessage.FiledFormatIsInvalid)!),
    userName: string().min(ApplicationParams.UsernameMinLenght, t('minLenghtForThisFieldIsN', CommonMessage.MinLenghtForThisFieldIsN(ApplicationParams.UsernameMinLenght), { n: `${ApplicationParams.UsernameMinLenght}`})!).required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: newItemSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        const updateUserData: UpdateUserProfileDTO = {
          id: user?.id,
          image: userIamge,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          userName: values.userName,

        };
        const userDTO: UserDTO = await dispatch(updateProfile(updateUserData)).unwrap();
        if (userDTO) {
          setUserInfo(userDTO);
        } 
      }
      else{
        notificationService.showErrorMessage(CommonMessage.FormDataIsInvalid)
      }
    }

  })
  const handleResetForm = () => {
    formik.resetForm();
  }

  return (
    <CardContent>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={userIamge} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  {t('upload','Upload')}
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled sx={{ mx: 3 }} color='error' variant='outlined' onClick={handleResetUserImage}>
                  {t('reset', 'Reset')}
                </ResetButtonStyled>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth 
            id='userName'
            label={t('username', CommonMessage.Username)}
            value={formik.values.userName}
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.errors.userName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='email'
              type='email'
              label={t('email', CommonMessage.Email)}
              value={formik.values.email}
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email}/> 
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth 
            id='firstName' 
            label={t('firstName', CommonMessage.FirstName)}
            value={formik.values.firstName}
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.errors.firstName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth 
            id='lastName' 
            label={t('lastName', CommonMessage.LastName)}
            value={formik.values.lastName}
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.errors.lastName}/>
          </Grid>
          <Grid item xs={12}>
            <Button 
            type='submit'
            variant='contained'
            title={Hotkey.Save.toLocaleUpperCase()}
            disabled={!hasUpdatePermission}>
              {t('save','Save')}
            </Button>
            <Button 
            type='reset' 
            variant='outlined' 
            color='secondary'
            title={Hotkey.Reset.toLocaleUpperCase()}
            onClick={handleResetForm} 
            sx={{ mx: 3 }}>
              {t('reset','Reset')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount


