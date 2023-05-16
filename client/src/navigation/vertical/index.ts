// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'home',
      path: '/admin'
    },
    {
      sectionTitle: 'Content Management'
    },
    {
      sectionTitle: 'Security'
    },
    {
      title: 'Users',
      icon: 'groups',
      path: '/admin/security/user'
    },
    {
      title: 'Roles',
      icon: 'groups',
      path: '/admin/security/role'
    },
    {
      title: 'User Profile',
      icon: 'manage_accounts',
      path: '/admin/security/userProfile'
    }
  ]
}

export default navigation
