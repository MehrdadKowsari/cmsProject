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
      title: 'Post Categories',
      icon: 'folder',
      path: '/admin/contentManagement/postCategory'
    },
    {
      title: 'Gallery Categories',
      icon: 'folder',
      path: '/admin/contentManagement/galleryCategory'
    },
    {
      title: 'Sliders',
      icon: 'code',
      path: '/admin/contentManagement/slider'
    },
    {
      title: 'Tags',
      icon: 'tag',
      path: '/admin/contentManagement/tag'
    },
    {
      sectionTitle: 'Security'
    },
    {
      title: 'Users',
      icon: 'person',
      path: '/admin/security/user'
    },
    {
      title: 'Roles',
      icon: 'group',
      path: '/admin/security/role'
    },
    {
      title: 'User In Roles',
      icon: 'groups',
      path: '/admin/security/userRole'
    },
    {
      title: 'Pages',
      icon: 'description',
      path: '/admin/security/page'
    },
    {
      title: 'Permissions',
      icon: 'lock',
      path: '/admin/security/permission'
    },
    {
      title: 'Page Permissions',
      icon: 'security',
      path: '/admin/security/pagePermission'
    },
    {
      title: 'Role Page Permissions',
      icon: 'lockPerson',
      path: '/admin/security/rolePagePermission'
    },
    {
      title: 'User Profile',
      icon: 'manage_accounts',
      path: '/admin/security/userProfile'
    }
  ]
}

export default navigation
