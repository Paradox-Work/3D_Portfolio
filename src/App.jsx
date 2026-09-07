import LogoSection from './components/LogoSection.jsx';
import NavBar from './components/NavBar.jsx'
import Hero from './sections/Hero'
import ShowcaseSection from './sections/ShowcaseSection';


const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection />
      <LogoSection />
    </>
  )
}

export default App;