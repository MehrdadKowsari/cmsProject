import React, { useEffect, useState } from "react";
import { useAppDispatch } from "src/state/hooks/hooks";
import useLocale from "src/hooks/useLocale";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import BlockHeader from "../BlockHeader/BlockHeader";
import { useTranslation } from "next-i18next";
import LinkItem from "../LinkItem/LinkItem";
import { ListAllMenuItemByParamsDTO } from "src/models/contentManagement/menuItem/listAllMenuItemByParamsDTO";
import { getAllMenuItemsByParams } from "src/state/slices/contentManagement/homeSlice";
import { MenuItemDTO } from "src/models/contentManagement/menuItem/menuItemDTO";
import COLORS from "src/constants/colors";

const FooterMenu: React.FC = () => {
    const [ menuItems, setMenuItems ] = useState<MenuItemDTO[]>([]);
    const dispatch = useAppDispatch();
    const { getLocale } = useLocale();
    const locale = getLocale();
    const { t } = useTranslation();

    useEffect(() => {
        getAllMenuItems();
      }, []);
    
      const getAllMenuItems = async () => {
        const listMenuItemByParamsDTO : ListAllMenuItemByParamsDTO = {
          sectionName: 'footerMenu',
          locale: locale
        }
        try {
           const menuItems = await dispatch(getAllMenuItemsByParams(listMenuItemByParamsDTO)).unwrap();
           setMenuItems(menuItems);

        } catch (error) {
            
        }
      }
    return(
        <>
            <BlockHeader title={t("quickAccess")} iconCssClass="link" bgColor={COLORS.GRAY_LIGTH}/>
            {
                <GridContainer>
                    <GridItem lg={12}>
                        <ul style={{listStyleType: "none", padding: 0, margin: 0}}>
                            {menuItems?.map((p: MenuItemDTO) => (
                                <li key={p.id}>
                                    <LinkItem
                                    title={p.name || ''}
                                    href={p.url}
                                    iconCssClass='link'/>
                                </li>
                            ))}
                        </ul>
                    </GridItem>
                </GridContainer>
            }  
        </>
    );
}
export default FooterMenu;