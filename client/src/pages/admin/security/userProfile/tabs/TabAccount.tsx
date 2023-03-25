// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import { useAuth } from 'src/state/providers/AuthProvider'
import { object, string } from 'yup'
import CommonMessage from 'src/constants/commonMessage'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { UpdateUserProfileDTO } from 'src/models/security/user/updateUserProfileDTO'
import notificationService from 'src/services/notificationService'
import { useAppDispatch } from 'src/state/hooks/hooks'
import { updateProfile } from 'src/state/slices/userSlice'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const { user } = useAuth();
  const [imgSrc, setImgSrc] = useState<string>(user?.image || '/images/avatars/1.png')
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['common', 'security'])
  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }
  const addInitialValues: UpdateUserProfileDTO = {
    id: user?.id,
    image: imgSrc,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    userName: user?.userName
  };

  const newItemSchema = object({
    firstName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
    lastName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
    email: string().required().email(t('filedIsRequired', CommonMessage.RequiredFiled)!),
    userName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  });
  const formik = useFormik({
    initialValues: addInitialValues,
    validationSchema: newItemSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        const updateUserData: UpdateUserProfileDTO = {
          id: user?.id,
          image: imgSrc,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          userName: values.userName,

        };
        const result = await dispatch(updateProfile(updateUserData));
        if (result) {
          notificationService.showSuccessMessage(t('successOperation', CommonMessage.SuccessOperation)!);
        } 
      }
      else{
        notificationService.showErrorMessage('form data are invalid')
      }
    }

  })

  const userName = t('username', CommonMessage.Username);

  return (
    <CardContent>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth 
            label={userName} 
            placeholder={userName} 
            value={formik.values.firstName}
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.errors.firstName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='Email'
              value={formik.values.email}
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email}/> 
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth 
            label='First Name' 
            placeholder='First Name' 
            value={formik.values.firstName}
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.errors.firstName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth 
            label='Last Name' 
            placeholder='Last Name' 
            value={formik.values.lastName}
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.errors.lastName}/>
          </Grid>
          <Grid item xs={12}>
            <Button 
            type="submit"
            variant='contained' 
            sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
