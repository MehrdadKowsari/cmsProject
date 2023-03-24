import React,  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { AppProps } from 'next/app';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/LockOutlined'
import PersonIcon from '@mui/icons-material/PersonOutlined'
import GoogleIcon from '@mui/icons-material/Google'
import Link from '@mui/material/Link';
import { useFormik } from 'formik';
import {object, string} from 'yup';
import * as yup from 'yup';
import { SignUp } from '../../models/auth/SignUp';
import { SignIn } from '../../models/auth/SignIn';
import { useRouter } from 'next/router';
import notification from '../../services/notificationService';
import { signIn, signUp, signInByGoogle } from 'src/state/slices/authSlice';
import useStyles from 'src/styles/jss/pages/login';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from 'src/state/hooks/hooks';
import { useTranslation } from 'react-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CommonMessage from 'src/constants/commonMessage';
import SecurityMessage from 'src/constants/securityMessage';


const Login = ({Component, pageProps}: AppProps) => {
  
const [isSignUp, setIsSignUp] = useState<boolean>(false);
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
const dispatch = useAppDispatch();
const router = useRouter();
const { t } = useTranslation(['common', 'security']);

useEffect(() => {
  formik.resetForm({errors: {}});
  setShowPassword(false);
  setShowConfirmPassword(false);
}, [isSignUp])


const signInSchema = object({
  userName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  password: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!)
});
const signUpSchema = object({
  firstName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  lastName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  email: string().required().email(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  userName: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  password: string().required(t('filedIsRequired', CommonMessage.RequiredFiled)!),
  confirmPassword: string().required().oneOf([yup.ref("password")], t('confirmPasswordDoNotMatch', SecurityMessage.ConfirmPasswordDoesNotMatch)!)
});

const { classes } = useStyles();

const signUpInitialValues: SignUp = {
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  password: '',
  confirmPassword: '',
};
  const formik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: isSignUp ? signUpSchema : signInSchema,
    onSubmit: async (values) => {
      if(formik.isValid){
        if (isSignUp) {
          try {
            const result = await dispatch(signUp(values)).unwrap();
            if (result && result.token && result.refreshToken) {
              router.push('/admin');
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          const signInData: SignIn = {
            userName: values.userName,
            password: values.password
          }
          try {
            const result = await dispatch(signIn(signInData)).unwrap();
            if (result && result.token && result.refreshToken) {
              router.push('/admin');
            }
          } catch (error) {
            console.log(error);                
          }    
        }
      }
      else{
        notification.showErrorMessage('form data are invalid');
      }
    }

  })
  
  const handleChangeMode = () => setIsSignUp(!isSignUp);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleLoginByGoogle = useGoogleLogin({
    onSuccess: (credentialResponse: TokenResponse) => {
      try {
        if (credentialResponse?.access_token) {
          const accesstoken: string = credentialResponse?.access_token;
          if (accesstoken) {
            const loginByGoogle = async () => {
              const result = await dispatch(signInByGoogle(accesstoken)).unwrap();
              if (result && result.token && result.refreshToken) {
                router.push('/admin');
              }
            }
            loginByGoogle();
          }
          else{
            notification.showErrorMessage('Google login failed');
          }
        }
      } catch (error) {
        notification.showErrorMessage('Google login failed');
      }
    },
  
    onError: () => {
      notification.showErrorMessage('Google login failed');
    }
  })

  
  return (
    <>
        <Container className={classes.root}>
          <Box className={classes.box}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container
            className={classes.container}
            spacing={3}
            justifyContent="center">
                <Grid item>
                  <Avatar sx={{bgcolor: "primary.main"}}>
                    <LockIcon/>
                  </Avatar>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" className={classes.typography}>
                    <span>{isSignUp ? t("signUp", SecurityMessage.SignUp) : t("login", SecurityMessage.Login) }</span>
                  </Typography>  
                </Grid>
                {isSignUp && <Grid item xs={12}>
                  <TextField 
                  fullWidth 
                  id="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.errors.firstName}/> 
                </Grid>}
                {isSignUp && <Grid item xs={12}>
                  <TextField 
                  fullWidth 
                  id="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.errors.lastName}/> 
                </Grid>}
                {isSignUp && <Grid item xs={12}>
                  <TextField 
                  fullWidth 
                  id="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.errors.email}/> 
                </Grid>}
                <Grid item xs={12}>
                  <TextField 
                  fullWidth 
                  id="userName"
                  label="User Name"
                  value={formik.values.userName}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.errors.userName}/> 
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  fullWidth 
                  type={showPassword ? "text" : "password"}
                  id="password"
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}/> 
                </Grid>
                {isSignUp && <Grid item xs={12}>
                  <TextField
                  fullWidth 
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  label="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange} 
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}/> 
                </Grid>}
                <Grid item xs={12}>
                  <Button fullWidth
                  type="submit"
                  variant="contained" 
                  size="large"
                  startIcon={isSignUp ? <PersonIcon/> : <LoginIcon />}>
                    <span>{isSignUp ? "Sign Up" : "Login" }</span>
                  </Button>  
                </Grid>
            </Grid>
          </form>
          </Box>
          <Box sx={{mt: 1.5}}
           className={classes.box}>
            <Grid container 
            className={classes.container}
            spacing={3}
            justifyContent="center">
              <Grid item md={4} lg={4}>
                <Link href="/forgetPassword"
                  variant="body1"
                  underline="none">
                    Forget password?
                </Link>
              </Grid>
              <Grid item lg={8} display="flex" justifyContent="flex-end">
                <Link
                  component="button"
                  variant="body1"
                  underline="none"
                  onClick={handleChangeMode}>
                    {isSignUp ? <span>sign In</span> : <span>Do Not have an account? sign Up</span>}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {!isSignUp && <Box className={classes.box} sx={{mt: 2.5}}>
            <Grid container
            className={classes.container} 
            spacing={3}
            justifyContent="center">
              <Grid item xs={12}>
                <Divider>Or</Divider>
              </Grid>
              <Grid item lg={12} display="flex" justifyContent="center">
                <IconButton onClick={() => handleLoginByGoogle()}>
                  <GoogleIcon color="primary" fontSize="large"/>
                </IconButton>
              </Grid>
            </Grid>
          </Box>}
        </Container>
    </>
  )
}

export default Login
type Props = {
  // Add custom props here
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})