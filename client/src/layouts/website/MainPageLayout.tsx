import { ReactNode, useEffect, useState } from 'react'
import { MainWrapper, StyledContent, Cover} from "src/components/website/common/styles";
import Header from 'src/components/website/Header'
import Footer from 'src/components/website/Footer/Footer'
import Cookies from "src/components/website/Cookies";
import initLocalization from "src/i18n";
import { languages } from 'src/i18n/settings';
import useLocale from 'src/hooks/useLocale';
import ApplicationParams from 'src/constants/applicationParams';
import Slider from 'src/components/website/Slider/Slider';

initLocalization(); 
type MainPageLayoutProps = {
  children: ReactNode;
}


const MainPageLayout = ({ children }: MainPageLayoutProps) => {
  const [popup, setPopup] = useState<boolean>(false);
  const { getLocale } = useLocale();
  const locale = getLocale();
  
  const dir: string = languages.find(p => p.code === locale)?.dir || ApplicationParams.DefaultLanguageDirection;
  useEffect(() => {
    document.body.dir = dir;
  }, [])
  
  return (
    <>
      {popup && <Cover></Cover>}
            <MainWrapper>
              <Header />
              <Slider sectionName='headerSlider' />
              <StyledContent>
                  {children}
              </StyledContent>
              <Cookies />
              <Footer />
            </MainWrapper>
    </>
  )
}
export default MainPageLayout;
