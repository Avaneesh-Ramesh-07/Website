import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import MusicStage from './components/MusicStage'
import About from './components/About'
import Experience from './components/Experience'
import Other from './components/Other'
import OutsideCS from './components/OutsideCS'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import ProgressBar from './components/ProgressBar'

const SECTIONS = ['home', 'about', 'experience', 'projects', 'outside-cs', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      <ProgressBar />
      <Cursor />
      <Nav activeSection={activeSection} />
      <main>
        <Home />
        <MusicStage />
        <About />
        <Experience />
        <Other />
        <OutsideCS />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
