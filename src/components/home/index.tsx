 
import HeroArea from './HeroArea'
import AboutArea from './AboutArea'
import ServiceArea from './ServiceArea' 
import PortfolioArea from './PortfolioArea'
import TestimonoalArea from './TestimonoalArea'
import ContactArea from './ContactArea' 
import HeaderOne from '../../layouts/headers/HeaderOne'
import FooterOne from '../../layouts/footers/FooterOne'
import ScrollTop from '../common/ScrollTop'
import CustomCursor from '../common/CustomCursor'
import ScrollToTop from '../common/ScrollToTop'

export default function Home() { 
  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroArea />
            <AboutArea />
            <ServiceArea />
            <PortfolioArea />
            <TestimonoalArea />
            <ContactArea />
          </main>
          <FooterOne />
        </div>
      </div> 
      <ScrollToTop />
      <ScrollTop />
      <CustomCursor />
    </>
  )
}
