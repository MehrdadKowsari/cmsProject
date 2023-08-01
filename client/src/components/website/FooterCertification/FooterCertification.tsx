import React from "react";
import useLocale from "src/hooks/useLocale";
import BlockHeader from "../BlockHeader/BlockHeader";
import { useTranslation } from "next-i18next";
import COLORS from "src/constants/colors";
import { ImageLink, Certifications } from "../Footer/styles";

const FooterMenu: React.FC = () => {
    const { getLocale } = useLocale();
    const locale = getLocale();
    const { t } = useTranslation();

    return(
        <>
            <BlockHeader title={t("certifications")} iconCssClass="workspace_premium" bgColor={COLORS.GRAY_LIGTH}/>
            {
                <Certifications>
                <ImageLink
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    width="200px"
                    height="190px"
                    src="/images/certification.png"
                    alt="certification"
                  />
                </ImageLink>
              </Certifications>
            }  
        </>
    );
}
export default FooterMenu;