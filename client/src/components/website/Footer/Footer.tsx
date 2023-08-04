import React from "react";
import { useTranslation } from "next-i18next";
import {
  InfoText,
  StyledFooterContainer,
  MainFooterContent,
  StyledFooter,
  StyledCopyRightContainer
} from "./styles";
import { StyledWhiteLink } from "../common/styles";
import useLocale from "src/hooks/useLocale";
import localizationService from "src/services/shared/localizationService";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import FooterMenu from "../FooterMenu/FooterMenu";
import ContentBlock from "../ContentBlock/ContentBlock";
import COLORS from "src/constants/colors";
import FooterSocial from "../FooterSocial/FooterSocial";
import FooterCertification from "../FooterCertification/FooterCertification";
import FooterSubscription from "../FooterSubscription/FooterSubscription";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { getLocale } = useLocale();
  const currentYear = localizationService.getCurrentYear(getLocale());

  return (
    <StyledFooter>
      <StyledFooterContainer>
        <MainFooterContent>
        <GridContainer>
          <GridItem lg={4} md={4} sm={6} xs={12}>
          <ContentBlock sectionName="footer_aboutUs" titleBgColor={COLORS.GRAY_LIGTH} />
          </GridItem>
          <GridItem lg={4} md={4} sm={6} xs={12}>
            <FooterMenu/>
          </GridItem>
          <GridItem lg={4} md={4} sm={6} xs={12}>
          <ContentBlock sectionName="footer_contactUs" titleBgColor={COLORS.GRAY_LIGTH} />
          </GridItem>
          <GridItem lg={4} md={4} sm={6} xs={12}>
            <FooterSubscription/>
          </GridItem>
          <GridItem lg={4} md={4} sm={6} xs={12}>
            <FooterCertification/>
          </GridItem>
          <GridItem lg={4} md={4} sm={6} xs={12}>
            <FooterSocial/>
          </GridItem>
        </GridContainer>          
      </MainFooterContent>
      </StyledFooterContainer>
      <StyledCopyRightContainer>
        <InfoText>
          {t("copyright")} © {currentYear}{" "}
          <StyledWhiteLink href="https://test.test" target="_blank" rel="noopener">
          {t("companyName")} {" "}
          </StyledWhiteLink>
           {t("allRightsReserved")}
        </InfoText>
      </StyledCopyRightContainer>
    </StyledFooter>
  );
};

export default Footer;
