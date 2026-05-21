import { useState, useEffect, useCallback, type ReactNode } from 'react'
import StudioScene from './components/StudioScene'
import ContentPanel from './components/ContentPanel'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Other'
import OutsideCS from './components/OutsideCS'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import type { SectionId } from './types'

const SECTION_CONTENT: Record<SectionId, ReactNode> = {
  about: <About />,
  experience: <Experience />,
  projects: <Projects />,
  'outside-cs': <OutsideCS />,
  contact: <Contact />,
}

type Phase = 'studio' | 'zooming-out' | 'panel' | 'zooming-in'

export default function App() {
  const [phase, setPhase] = useState<Phase>('studio')
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 })

  const openSection = useCallback((id: SectionId, originX: number, originY: number) => {
    setZoomOrigin({ x: originX, y: originY })
    setPhase('zooming-out')
    setTimeout(() => {
      setActiveSection(id)
      setPhase('panel')
    }, 520)
  }, [])

  const closeSection = useCallback(() => {
    setPhase('zooming-in')
    setTimeout(() => {
      setActiveSection(null)
      setPhase('studio')
    }, 400)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && (phase === 'panel')) closeSection()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, closeSection])

  const studioZooming = phase === 'zooming-out'
  const studioVisible = phase === 'studio' || phase === 'zooming-out' || phase === 'zooming-in'
  const panelVisible  = phase === 'panel' || phase === 'zooming-in'

  return (
    <>
      <Cursor />

      {/* Studio scene — always mounted, transitions handle show/hide */}
      <div
        className={`studio-wrapper${studioZooming ? ' studio-zoom-out' : ''}${phase === 'zooming-in' ? ' studio-zoom-in' : ''}`}
        style={{ '--zoom-x': `${zoomOrigin.x}%`, '--zoom-y': `${zoomOrigin.y}%` } as React.CSSProperties}
        aria-hidden={!studioVisible}
      >
        <StudioScene onInstrumentClick={openSection} />
      </div>

      {/* Content panel */}
      {activeSection && (
        <ContentPanel
          visible={panelVisible}
          onClose={closeSection}
        >
          {SECTION_CONTENT[activeSection]}
        </ContentPanel>
      )}
    </>
  )
}
