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
import yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ChangeUserPasswordDTO } from 'src/models/security/user/changeUserPasswordDTO'
import { useAppDispatch } from 'src/state/hooks/hooks'
import { changePassword } from 'src/state/slices/userSlice'
import SecurityMessage from 'src/constants/securityMessage'

const { t } = useTranslation(['common, security'])
const useDispatch = useAppDispatch();
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
    newPassword: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
    confirmNewPassword: string().required().oneOf([yup.ref("newPassword")], t('confirmPasswordDoNotMatch', SecurityMessage.ConfirmPasswordDoesNotMatch)!)
  });
  
  const { user } = useAuth();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: State) => {
      const changeUserPassword: ChangeUserPasswordDTO = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      }
    const result = await useDispatch(changePassword(changeUserPassword)).unwrap();
    if (result) {
      
    }
    },
    onReset: () => {
      formik.resetForm();
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

    <form onSubmit={formik.handleSubmit}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='currentPassword'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={formik.handleChange}
                    id='currentPassword'
                    type={showCurrentPassword ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    endAdornment={
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
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='newPassword'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={formik.handleChange}
                    id='newPassword'
                    type={showNewPassword ? 'text' : 'password'}
                    endAdornment={
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
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='confirmNewPassword'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={formik.handleChange}
                    id='confirmNewPassword'
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    endAdornment={
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
                    }
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

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 368,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
          </Box>
        </Box>

        <Box sx={{ mt: 11 }}>
          <Button variant='contained' sx={{ marginRight: 3.5 }}>
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}
export default TabSecurity
