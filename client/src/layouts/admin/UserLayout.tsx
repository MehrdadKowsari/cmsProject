// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { useAppDispatch, useAppSelector } from 'src/state/hooks/hooks'
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { getAllByUserId as getAllByPageListUserId } from 'src/state/slices/pageSlice'
import { PageDTO } from 'src/models/security/page/pageDTO'
import { useTranslation } from 'next-i18next'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const [ navLinks, setNavLinks ] = useState<VerticalNavItemsType>([]);
  const { menuPages, isLoading } = useAppSelector((state: any) => state.page);
  const { t } = useTranslation();

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    getAllMenuPageListByUserId();
  }, []);
  
  useEffect(() => {
    if (menuPages?.length > 0) {
      const menuPageList: VerticalNavItemsType = menuPages?.map(((p: PageDTO) =>  (p.path ? { 
        title: t(p.name),
        icon: p.iconClass,
        path: `/admin/${p.path}`
      }: {
        sectionTitle: t(p.name)
      })));
      setNavLinks(menuPageList);
    }
  }, [menuPages]);

  const getAllMenuPageListByUserId = async () => {
    await dispatch(getAllByPageListUserId())
  }

 return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={navLinks} // Navigation Items
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
    </VerticalLayout>
  )
}
UserLayout.isRequiredAuth = true;
export default UserLayout;
