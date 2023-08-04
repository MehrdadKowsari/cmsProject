// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'

import { useAuth } from 'src/state/providers/AuthProvider'
import browserStorageService from 'src/services/shared/browserStorageService'
import { useAppDispatch } from 'src/state/hooks/hooks'
import { getCurrent } from 'src/state/slices/userSlice'
import { UserDTO } from 'src/models/security/user/userDTO'

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [currentUser, setCurrentUser] = useState<UserDTO | null>(null)
  
  // ** Hooks
  const dispatch = useAppDispatch();
  const router = useRouter()
  
  const getCurrentUser = async () =>{
      try {
          const currentUser = await dispatch(getCurrent()).unwrap();
          setCurrentUser(currentUser);
          setUserInfo(currentUser);
        } catch {
            browserStorageService.removeLocal("isUserLoggedIn");
        }
    }
    
    const {user, setUserInfo, logout } = useAuth();
    useEffect(() =>{
    if (user) {
        setCurrentUser(user);
    }
    else{
        const isUserLoggedIn: boolean = browserStorageService.getLocal("isUserLoggedIn");
        if (isUserLoggedIn && !user){
            getCurrentUser();
        }
    }
  }, [])
     
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }
  
  const handleLogout = (url?: string) => {
    logout();
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <Avatar
          alt={currentUser?.fullName}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={currentUser?.image}
        />
      {currentUser && <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={currentUser?.fullName} src={currentUser?.image} sx={{ width: '2.5rem', height: '2.5rem' }} />
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{currentUser?.fullName}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/admin/security/userProfile')} key="profile">
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Profile
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleLogout()}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} key="logout"/>
          Logout
        </MenuItem>
      </Menu>}
    </Fragment>
  )
}

export default UserDropdown
