import React, { useEffect, useState } from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// core components
import GridContainer from "src/components/website/Grid/GridContainer";
import GridItem from "src/components/website/Grid/GridItem";
import carouselStyle from "src/styles/jss/components/caroucel/carouselStyle";
import { useAppDispatch } from "src/state/hooks/hooks";
import { getAllActiveSlidersByParams } from "src/state/slices/contentManagement/homeSlice";
import { ListActiveSliderItemByParamsDTO } from "src/models/contentManagement/sliderItem/listActiveSliderItemByParamsDTO";
import useLocale from "src/hooks/useLocale";
import { useSelector } from "react-redux";
import { SliderItemDTO } from "src/models/contentManagement/sliderItem/sliderItemDTO";

type Props = {
  sectionName: string,
  height?: number
}

const Slider: React.FC<Props> = ({ sectionName, height }) => {
  const { classes } = carouselStyle();
  const settings = {
    dots: true,
    adaptiveHeight: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  const { sliderItems,  isLoading } = useSelector((state: any) => state?.home?.sliderItems ? state?.home : { sliderItems: [], isLoading: false });
  const dispatch = useAppDispatch();
  const { getLocale } = useLocale();
  const locale = getLocale();
  
  useEffect(() => {
    getAllSliderItems();
  }, []);

  const getAllSliderItems = () => {
    const listSliderItemByParamsDTO : ListActiveSliderItemByParamsDTO = {
      sectionName,
      locale
    }
    dispatch(getAllActiveSlidersByParams(listSliderItemByParamsDTO));
  }
  
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer className={classes.gridContainre}>
          <GridItem xs={12} sm={12} md={12} lg={12} className={classes.gridItem}>
          <Carousel {...settings}>
                {sliderItems?.filter((p: SliderItemDTO) => p.sliderSectionName === sectionName)?.map((p: SliderItemDTO) => ( 
                  <CarouselItem src={p.file!} name={p.name} height={height} key={p.id}/>
                ))}
          </Carousel>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
export default Slider;

type CarouselItemProps = {
  src: string,
  name: string,
  height?: number;
}

export const CarouselItem = ({ src, name, height}: CarouselItemProps) => {
  return(
    <div>
      <img
        height={height ?? "auto"}
        src={src}
        alt={name}
        className="slick-image"
      />
      <div className="slick-caption">
        <h4>
          {name}
        </h4>
      </div>
    </div>
  )
}
