import React from "react";
import { useTranslation } from "next-i18next";
import { Routes } from "src/config/routes";
import {
  ImageLink,
  InfoText,
  StyledFooterContainer,
  MainFooterContent,
  Socials,
  StyledFooter,
  StyledCopyRightContainer,
  StyledLinks,
} from "./styles";
import { StyledLink, StyledWhiteLink } from "../common/styles";
import useLocale from "src/hooks/useLocale";
import localizationService from "src/services/shared/localizationService";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import FooterMenu from "../FooterMenu/FooterMenu";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { getLocale } = useLocale();
  const currentYear = localizationService.getCurrentYear(getLocale());

  return (
    <StyledFooter>
      <StyledFooterContainer>
        <MainFooterContent>
        <GridContainer>
          <GridItem lg={4} md={4} sm={6} xx={12}>
            <FooterMenu/>
          </GridItem>
        </GridContainer>
          <StyledLinks>
            <StyledLink href={Routes.Blog}>{t("blog")}</StyledLink>
            <StyledLink href={Routes.Privacy}>{t("privacyPolicy")}</StyledLink>
          </StyledLinks>
          <Socials>
            <ImageLink
              href="https://twitter.com/sudokuproapp"
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
              href="https://www.instagram.com/sudokupro.app"
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
              href="https://www.facebook.com/sudokuproapp"
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
