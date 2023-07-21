import { ReactNode, useState } from 'react'
import { MainWrapper, StyledContent, Cover} from "src/components/website/common/styles";
import Header from 'src/components/website/Header'
import Footer from 'src/components/website/Footer/Footer'
import Cookies from "src/components/website/Cookies";
import initLocalization from "src/i18n";

initLocalization(); 
type MainPageLayoutProps = {
  children: ReactNode;
}

const MainPageLayout = ({ children }: MainPageLayoutProps) => {
  const [popup, setPopup] = useState<boolean>(false);
 return (
    <>
      {popup && <Cover></Cover>}
            <MainWrapper>
              <Header />
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
