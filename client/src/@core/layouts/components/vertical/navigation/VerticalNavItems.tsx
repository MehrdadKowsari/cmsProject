// ** Types Import
import { GetStaticProps } from 'next'
import { useTranslation, Trans } from 'next-i18next'
import { Settings } from 'src/@core/context/settingsContext'
import { NavLink, NavSectionTitle, VerticalNavItemsType } from 'src/@core/layouts/types'

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

interface Props {
  dir?: string
  settings: Settings
  navVisible?: boolean
  groupActive: string[]
  currentActiveGroup: string[]
  verticalNavItems?: VerticalNavItemsType
  saveSettings: (values: Settings) => void
  setGroupActive: (value: string[]) => void
  setCurrentActiveGroup: (item: string[]) => void
}


const VerticalNavItems = (props: Props) => {
  // ** Props
  const { verticalNavItems } = props
  
  const { t } = useTranslation('common')  
  const resolveNavItemComponent = (item: NavLink | NavSectionTitle) => {
    if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle
  
    return VerticalNavLink
  }
  const RenderMenuItems = verticalNavItems?.map((item: NavLink | NavSectionTitle, index: number) => {
    const TagName: any = resolveNavItemComponent(item)
    return <Trans>
      <TagName {...props} key={index} item={(item as NavSectionTitle).sectionTitle ? { ...item, sectionTitle: t((item as NavSectionTitle).sectionTitle) } : {...item, title: t((item as NavLink).title)}} />
    </Trans>
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems

