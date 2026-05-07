import { LanguageProvider } from './context/LanguageContext'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Projects from './components/Projects'
import About from './components/About'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Stats />
      <Contact />
      <Footer />
    </LanguageProvider>
  )
}

export default App
