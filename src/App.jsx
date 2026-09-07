import LogoSection from './components/LogoSection.jsx';
import NavBar from './components/NavBar.jsx'
import ExperienceSection from './sections/ExperienceSection.jsx';
import FeatureCards from './sections/FeatureCards.jsx';
import Hero from './sections/Hero'
import ShowcaseSection from './sections/ShowcaseSection';


const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection />
      <LogoSection />
      <FeatureCards />
      <ExperienceSection />
    </>
  )
}

export default App;