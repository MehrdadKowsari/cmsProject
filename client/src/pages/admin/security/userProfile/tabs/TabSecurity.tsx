// ** React Imports
import { useState, MouseEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Avatar from '@mui/material/Avatar'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { useAuth } from 'src/state/providers/AuthProvider'
import { useFormik } from 'formik'
import CommonMessage from 'src/constants/commonMessage'
import { object, string } from 'yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ChangeUserPasswordDTO } from 'src/models/security/user/changeUserPasswordDTO'
import { useAppDispatch } from 'src/state/hooks/hooks'
import { changePassword } from 'src/state/slices/userSlice'
import SecurityMessage from 'src/constants/securityMessage'
import TextField from '@mui/material/TextField'
import ApplicationParams from 'src/constants/applicationParams'

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

const TabSecurity = () => {
  // ** States
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false)

  const { t } = useTranslation(['common, security']);
  const useDispatch = useAppDispatch();
  
  const initialValues: State = {
    newPassword: '',
    showNewPassword: false,
    currentPassword: '',
    showCurrentPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  }

  const validationSchema = object({
    currentPassword: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
    password: string().min(ApplicationParams.PasswordMinLenght, t('minLenghtForThisFieldIsN', CommonMessage.MinLenghtForThisFieldIsN(ApplicationParams.PasswordMinLenght), { n: `${ApplicationParams.PasswordMinLenght}`})!).required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
    confirmPassword: string().min(ApplicationParams.PasswordMinLenght, t('minLenghtForThisFieldIsN', CommonMessage.MinLenghtForThisFieldIsN(ApplicationParams.PasswordMinLenght), { n: `${ApplicationParams.PasswordMinLenght}`})!).required(t('filedIsRequired', CommonMessage.RequiredFiled)!).oneOf([yup.ref("password")], t('confirmPasswordDoNotMatch', SecurityMessage.ConfirmPasswordDoesNotMatch, { ns: 'security' })!)
  });
  
  const { user } = useAuth()
  
  ;
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: State, { resetForm }) => {
      const changeUserPassword: ChangeUserPasswordDTO = {
        id: user?.id,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      }
    const result = await useDispatch(changePassword(changeUserPassword)).unwrap();
    if (result) {
      resetForm();
    }
    } 
  });

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  }

  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  }

  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  
  const handleClickShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  }
  
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (

    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <TextField
                    label='Current Password'
                    value={formik.values.currentPassword}
                    id='currentPassword'
                    type={showCurrentPassword ? 'text' : 'password'}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                    helperText={formik.errors.currentPassword}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={handleClickShowCurrentPassword}
                            onMouseDown={handleMouseDownCurrentPassword}
                          >
                            {showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id='newPassword'
                    label='New Password'
                    type={showNewPassword ? 'text' : 'password'}
                    value={formik.values.newPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.errors.newPassword}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            aria-label='toggle password visibility'
                            onMouseDown={handleMouseDownNewPassword}
                          >
                            {showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id='confirmNewPassword'
                    label='Confirm New Password'
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    value={formik.values.confirmNewPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                    helperText={formik.errors.confirmNewPassword}
                    inputProps= {{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                          >
                            {showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <Avatar 
              sx={{width:170 , height: 170}} 
              alt={user?.fullName} 
              src={user?.image} />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Box sx={{ mt: 7 }}>
          <Button
          type='submit' 
          variant='contained'>
            Save Changes
          </Button>
          <Button
          type='reset'
          variant='outlined'
          color='secondary'
          sx={{ mx: 3.5 }}>
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}
export default TabSecurity
