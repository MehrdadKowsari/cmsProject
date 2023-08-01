import React from "react";
import useLocale from "src/hooks/useLocale";
import BlockHeader from "../BlockHeader/BlockHeader";
import { useTranslation } from "next-i18next";
import COLORS from "src/constants/colors";
import { ImageLink, Socials } from "../Footer/styles";

const FooterMenu: React.FC = () => {
    const { getLocale } = useLocale();
    const locale = getLocale();
    const { t } = useTranslation();

    return(
        <>
            <BlockHeader title={t("socialNetworks")} iconCssClass="diversity_1" bgColor={COLORS.GRAY_LIGTH}/>
            {
                <Socials>
                <ImageLink
                  href="https://twitter.com/testCompany"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    width="38px"
                    height="38px"
                    src="/images/twitter.svg"
                    alt="twitter page"
                  />
                </ImageLink>
                <ImageLink
                  href="https://www.instagram.com/testCompany"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    width="38px"
                    height="38px"
                    src="/images/instagram.svg"
                    alt="instagram page"
                  />
                </ImageLink>
                <ImageLink
                  href="https://www.facebook.com/testCompany"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    width="38px"
                    height="38px"
                    src="/images/facebook.svg"
                    alt="facebook page"
                  />
                </ImageLink>
              </Socials>
            }  
        </>
    );
}
export default FooterMenu;