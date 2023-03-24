// ** React Imports
import { ReactNode } from 'react'
import Icon from '@mui/material/Icon';

// ** MUI Imports
import { SvgIconProps } from '@mui/material'

interface UserIconProps {
  iconProps?: SvgIconProps
  icon?: string
}

const UserIcon = (props: UserIconProps) => {
  // ** Props
  const { icon, iconProps } = props

  const IconTag:string| undefined = icon 

  // @ts-ignore
  return <><Icon sx={{
    fontSize: '2rem',
    marginLeft: '0.625rem'
  }} {...iconProps}>{icon}</Icon></>
}

export default UserIcon
