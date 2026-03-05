 
import HeroArea from './HeroArea'
import AboutArea from './AboutArea'
import ServiceArea from './ServiceArea' 
import PortfolioArea from './PortfolioArea'
import TestimonoalArea from './TestimonoalArea'
import TechStackArea from './TechStackArea'
import ExperienceArea from './ExperienceArea'
import ContactArea from './ContactArea'
import HeaderOne from '../../layouts/headers/HeaderOne'
import FooterOne from '../../layouts/footers/FooterOne'

export default function Home() { 
  return (
    <>
      <HeaderOne />
      <main className="bg-background">
        <HeroArea />
        <AboutArea />
        <TechStackArea />
        <ExperienceArea />
        <ServiceArea />
        <PortfolioArea />
        <TestimonoalArea />
        <ContactArea />
      </main>
      <FooterOne />
    </>
  )
}
