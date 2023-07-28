import { useTranslation } from "next-i18next";
import PopUpDevelopment from "../PopUpDevelopment";
import Container from "../Container";

import { MainWrapper } from "./styles";
import { PopUpT as Props } from "../../../types/popup";
import ContentBlock from "../ContentBlock/ContentBlock";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import { makeStyles } from 'tss-react/mui';
import { container } from 'src/styles/jss/globalStyle';
import Slider from "../Slider/Slider";
import MostCommentedPostList from "../MostCommentedPostList/MostCommentedPostList";
import CommonMessage from "src/constants/commonMessage";
import MostPopularPostList from "../MostPopularPostList/MostPopularPostList";
import LastPostList from "../LastPostList/LastPostList";
import FeatureSection from "../FeatureSection/FeatureSection";

const styles = makeStyles()((theme) => ({
  container,
  featureSection:{
    backgroundColor: theme.palette.secondary.light
  }
  
}));

const HomeContent: React.FC<Props> = ({ setPopup, popup }) => {
  const { t } = useTranslation();
  const { classes } = styles();
  return (
    <>
      <MainWrapper>
        <Container className={classes.container}>
          <GridContainer>
            <GridItem lg={8} md={8} sm={8}>
              <ContentBlock sectionName="home_aboutUs" />
            </GridItem>
            <GridItem lg={4} md={4} sm={4}>
              <ContentBlock title={t("events", CommonMessage.Events)!} iconCssClass="history">
                <Slider sectionName='eventSlider' height={230} />
              </ContentBlock>
            </GridItem>
          </GridContainer>
        </Container> 
        <FeatureSection/>
        <Container className={classes.container}>
          <MostCommentedPostList postCount={4} />
          <GridContainer>
            <GridItem lg={8} md={8} sm={8}>
              <LastPostList postCount={4}/>
            </GridItem>
            <GridItem lg={4} md={4} sm={4}>
              <MostPopularPostList postCount={11} />
            </GridItem>
          </GridContainer>
        </Container> 
      </MainWrapper>
      <PopUpDevelopment popup={popup} setPopup={setPopup} />{" "}
    </>
  );
};
export default HomeContent;

