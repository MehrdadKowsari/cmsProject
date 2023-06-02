// ** React Imports
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Third Party Styles Imports
import TabAccount from './tabs/TabAccount'
import TabSecurity from './tabs/TabSecurity'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import UserLayout from 'src/layouts/admin/UserLayout'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import { PermissionDTO } from 'src/models/security/permission/permissionDTO'
import { useSelector } from 'react-redux'
import { PermissionTypeEnum } from 'src/models/shared/enums/permissionTypeEnum'
import { getAllByPageId } from 'src/state/slices/rolePagePermissionSlice'
import { PageTypeEnum } from 'src/models/security/enums/pageTypeEnum'
import { useAppDispatch } from 'src/state/hooks/hooks'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const UserProfile = () => {
  const [value, setValue] = useState<string>('account')
  const userPagePermissions: PermissionDTO[] = useSelector((state:any) => state?.rolePagePermission?.userPagePermissions);
  const [hasViewPermission, setHasViewPermission] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    getRolePagePermissions();
  }, [])
  
  useEffect(() => {
    const hasViewPermission: boolean = userPagePermissions?.some(p => p.type === PermissionTypeEnum.View);
    setHasViewPermission(hasViewPermission);
  }, [userPagePermissions])

  const getRolePagePermissions = async () => {
    await dispatch(getAllByPageId(PageTypeEnum.UserProfile));
  }

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const { t } = useTranslation(['common', 'security'])
  return (
    <>
    { hasViewPermission && 
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>{t('account', 'Account')}</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>{t('security','Security')}</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount permissions={userPagePermissions} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity permissions={userPagePermissions} />
        </TabPanel>
      </TabContext>
    </Card>
    }
    </>
  )
}

UserProfile.getLayout = (page: ReactNode) => <UserLayout>{ page }</UserLayout>
export default UserProfile;
export const getStaticProps: GetStaticProps<{}> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'security'])),
  },
})
