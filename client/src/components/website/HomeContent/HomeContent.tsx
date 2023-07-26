import { useTranslation } from "react-i18next";
import PopUpDevelopment from "../PopUpDevelopment";
import Container from "../Container";

import { MainWrapper } from "./styles";
import { PopUpT as Props } from "../../../types/popup";
import SectionCarousel from "../Carousel/SectionCarousel";
import BlockHeader from "../BlockHeader/BlockHeader";

const HomeContent: React.FC<Props> = ({ setPopup, popup }) => {
  const { t } = useTranslation();
  return (
    <>
      <MainWrapper>
        <SectionCarousel />
        <Container><BlockHeader title="تست هدر" iconCssClass="home"/></Container>
      </MainWrapper>
      <PopUpDevelopment popup={popup} setPopup={setPopup} />{" "}
    </>
  );
};
export default HomeContent;
