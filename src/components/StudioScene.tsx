import { useState, useRef, type KeyboardEvent } from 'react'
import type { SectionId } from '../types'

interface Props {
  onInstrumentClick: (id: SectionId, originX: number, originY: number) => void
}

interface InstrumentDef {
  id: SectionId
  label: string
  cx: number   // SVG viewBox center-x for zoom origin
  cy: number   // SVG viewBox center-y for zoom origin
}

const INSTRUMENTS: InstrumentDef[] = [
  { id: 'about',      label: 'About Me',      cx: 175, cy: 340 },
  { id: 'experience', label: 'Experience',    cx: 430, cy: 370 },
  { id: 'projects',   label: 'Projects',      cx: 680, cy: 520 },
  { id: 'outside-cs', label: 'Outside of CS', cx: 960, cy: 510 },
  { id: 'contact',    label: 'Contact',       cx: 1210, cy: 490 },
]

const VB_W = 1400
const VB_H = 780

export default function StudioScene({ onInstrumentClick }: Props) {
  const [hovered, setHovered] = useState<SectionId | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  function handleClick(inst: InstrumentDef) {
    if (!svgRef.current) {
      onInstrumentClick(inst.id, 50, 50)
      return
    }
    const rect = svgRef.current.getBoundingClientRect()
    const scaleX = rect.width  / VB_W
    const scaleY = rect.height / VB_H
    const vpX = inst.cx * scaleX + rect.left
    const vpY = inst.cy * scaleY + rect.top
    const ox = (vpX / window.innerWidth)  * 100
    const oy = (vpY / window.innerHeight) * 100
    onInstrumentClick(inst.id, ox, oy)
  }

  function iprops(inst: InstrumentDef) {
    return {
      className: `studio-instrument${hovered === inst.id ? ' is-hovered' : ''}`,
      onMouseEnter: () => setHovered(inst.id),
      onMouseLeave: () => setHovered(null),
      onClick: () => handleClick(inst),
      role: 'button' as const,
      tabIndex: 0,
      'aria-label': `Open ${inst.label}`,
      onKeyDown: (e: KeyboardEvent<SVGGElement>) => e.key === 'Enter' && handleClick(inst),
    }
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      xmlns="http://www.w3.org/2000/svg"
      className="studio-svg"
      aria-label="Lo-fi studio — click an instrument to explore"
    >
      <defs>
        {/* Room gradients */}
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#030a18" />
          <stop offset="100%" stopColor="#071428" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0a1520" />
          <stop offset="100%" stopColor="#060e18" />
        </linearGradient>
        <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0e2030" />
          <stop offset="100%" stopColor="#091825" />
        </linearGradient>
        <linearGradient id="deskEdge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#162840" />
          <stop offset="100%" stopColor="#0a1a2a" />
        </linearGradient>

        {/* Window night sky */}
        <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#010610" />
          <stop offset="100%" stopColor="#040d22" />
        </linearGradient>

        {/* Warm lamp glow */}
        <radialGradient id="lampGlow" cx="50%" cy="0%" r="100%">
          <stop offset="0%"   stopColor="rgba(255,200,80,0.22)" />
          <stop offset="100%" stopColor="rgba(255,200,80,0)" />
        </radialGradient>

        {/* Moonlight spill through window */}
        <radialGradient id="moonSpill" cx="15%" cy="20%" r="70%">
          <stop offset="0%"   stopColor="rgba(180,210,255,0.07)" />
          <stop offset="100%" stopColor="rgba(180,210,255,0)" />
        </radialGradient>

        {/* Neon glow filter */}
        <filter id="neonGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="neonGlowSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="instrGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="lampFlare" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── BACK WALL ── */}
      <rect x="0" y="0" width={VB_W} height="620" fill="url(#wallGrad)" />

      {/* Moonlight ambient fill */}
      <rect x="0" y="0" width={VB_W} height="620" fill="url(#moonSpill)" />

      {/* Subtle wall texture lines */}
      {[120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="620" stroke="#0d1f35" strokeWidth="1" opacity="0.4" />
      ))}

      {/* ── FLOOR ── */}
      <rect x="0" y="620" width={VB_W} height="160" fill="url(#floorGrad)" />
      {/* Floor planks */}
      {[640, 660, 680, 700, 720, 740, 760].map(y => (
        <line key={y} x1="0" x2={VB_W} y1={y} y2={y} stroke="#0d1e30" strokeWidth="1" opacity="0.5" />
      ))}
      {/* Wall-floor seam */}
      <line x1="0" y1="620" x2={VB_W} y2="620" stroke="#0e2038" strokeWidth="2" />

      {/* ── WINDOW (top-left) ── */}
      {/* Outer frame / wall cutout shadow */}
      <rect x="52" y="32" width="236" height="196" rx="4" fill="#020810" />
      {/* Sky inside */}
      <rect x="58" y="38" width="224" height="184" rx="2" fill="url(#nightSky)" />
      {/* Stars in window */}
      {[[72,55,1],[105,44,0.8],[148,62,1.1],[195,48,0.9],[240,58,1],[268,43,0.8],
        [80,90,0.7],[132,82,1],[177,95,0.9],[222,78,1.1],[260,88,0.8],
        [90,130,0.9],[158,118,0.8],[210,128,1],[248,115,0.9]].map(([cx,cy,r],i) => (
        <circle key={i} cx={cx} cy={cy} r={r as number} fill="white" opacity={0.5 + (i%4)*0.1} />
      ))}
      {/* Moon in window */}
      <circle cx="250" cy="70" r="22" fill="#d4e8ff" opacity="0.85" filter="url(#neonGlowSoft)" />
      <circle cx="260" cy="63" r="17" fill="#030a18" />
      {/* Window frame */}
      <rect x="52" y="32" width="236" height="196" rx="4" fill="none" stroke="#1a3050" strokeWidth="5" />
      {/* Window cross */}
      <line x1="170" y1="38" x2="170" y2="222" stroke="#1a3050" strokeWidth="4" />
      <line x1="58" y1="130" x2="282" y2="130" stroke="#1a3050" strokeWidth="4" />
      {/* Window inner highlight */}
      <rect x="58" y="38" width="224" height="184" rx="2" fill="none" stroke="#0d2040" strokeWidth="1.5" />
      {/* Moonlight cast from window onto floor */}
      <polygon points="58,222 282,222 340,620 0,620" fill="rgba(150,190,255,0.025)" />

      {/* Curtains */}
      <path d="M 52 32 Q 65 80 58 140 Q 55 190 60 228 L 52 228 Z" fill="#0a1e35" opacity="0.9" />
      <path d="M 288 32 Q 275 80 282 140 Q 285 190 280 228 L 288 228 Z" fill="#0a1e35" opacity="0.9" />
      {/* Curtain rod */}
      <rect x="42" y="28" width="256" height="7" rx="3" fill="#162840" />
      <circle cx="42" cy="31" r="5" fill="#1e3a58" />
      <circle cx="298" cy="31" r="5" fill="#1e3a58" />

      {/* ── CEILING PENDANT LAMP ── */}
      {/* Wire */}
      <line x1="700" y1="0" x2="700" y2="88" stroke="#1a3050" strokeWidth="2.5" />
      {/* Shade */}
      <path d="M 666 88 Q 700 102 734 88 L 726 78 Q 700 88 674 78 Z" fill="#162840" />
      <ellipse cx="700" cy="88" rx="34" ry="10" fill="#162840" stroke="#1e3a58" strokeWidth="1.5" />
      {/* Bulb */}
      <circle cx="700" cy="96" r="6" fill="#ffe090" filter="url(#lampFlare)" opacity="0.9" />
      {/* Warm cone of light downward */}
      <polygon points="666,98 734,98 840,420 560,420" fill="url(#lampGlow)" opacity="0.6" />

      {/* ── BOOKSHELF / RECORD SHELF (left-center wall) ── */}
      {/* Shelf unit back */}
      <rect x="355" y="170" width="185" height="220" rx="3" fill="#081424" stroke="#0e2035" strokeWidth="2" />
      {/* Shelf boards */}
      <rect x="355" y="170" width="185" height="8"  fill="#0d2038" rx="1" />
      <rect x="355" y="244" width="185" height="7"  fill="#0d2038" rx="1" />
      <rect x="355" y="312" width="185" height="7"  fill="#0d2038" rx="1" />
      <rect x="355" y="382" width="185" height="8"  fill="#0d2038" rx="1" />
      {/* Books on top shelf (y=178 to 244) */}
      {[
        [363,178,14,58,'#1a3a5c'],[377,185,10,51,'#0e2844'],[387,181,12,55,'#24446a'],
        [399,183,11,53,'#0c2030'],[410,179,13,57,'#1c3a50'],[423,184,10,52,'#162a40'],
        [433,180,14,56,'#0a2240'],[447,183,9,53,'#1e3050'],[456,182,12,54,'#142840'],
        [468,179,13,57,'#0e1e30'],[481,184,10,52,'#162e48'],[491,181,11,55,'#0a1a2c'],
        [502,180,13,56,'#1a3252'],[515,183,8,53,'#0c2038'],
      ].map(([x,y,w,h,fill],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill as string} rx="1" />
      ))}
      {/* Vinyl record on second shelf */}
      <circle cx="395" cy="278" r="24" fill="#080f1a" stroke="#1a2e48" strokeWidth="2" />
      <circle cx="395" cy="278" r="16" fill="#0a1520" stroke="#162438" strokeWidth="1" />
      <circle cx="395" cy="278" r="5"  fill="#0d1e30" />
      <circle cx="395" cy="278" r="2"  fill="#00bcd4" opacity="0.5" />
      {/* Books on second shelf */}
      {[
        [420,251,12,55,'#1a3060'],[432,256,9,50,'#0e2244'],[441,252,13,54,'#162840'],
        [454,254,10,52,'#0c1e34'],[464,251,14,55,'#1e3658'],[478,255,11,51,'#102030'],
        [489,252,12,54,'#18304e'],[501,256,8,50,'#0a1a2c'],[509,251,13,55,'#142440'],
        [522,254,10,52,'#1c3252'],
      ].map(([x,y,w,h,fill],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={fill as string} rx="1" />
      ))}
      {/* Small plant on third shelf */}
      <rect x="530" y="328" width="8" height="18" fill="#0a1825" rx="1" />
      <ellipse cx="534" cy="325" rx="14" ry="10" fill="#0d2e20" />
      <ellipse cx="526" cy="320" rx="8"  ry="7"  fill="#0a2a1a" />
      <ellipse cx="542" cy="322" rx="8"  ry="7"  fill="#0a2a1a" />

      {/* ── POSTER / MUSIC ART on wall (right of shelf) ── */}
      {/* Poster frame */}
      <rect x="565" y="60" width="220" height="310" rx="4" fill="#06111e" stroke="#102030" strokeWidth="3" />
      <rect x="572" y="67" width="206" height="296" rx="2" fill="#060e1a" />
      {/* Abstract music wave art */}
      {[0,1,2,3,4,5,6,7].map(i => {
        const y0 = 85 + i*34
        const amp = 15 + (i%3)*8
        return (
          <path
            key={i}
            d={`M 578 ${y0} Q 618 ${y0-amp} 660 ${y0} Q 700 ${y0+amp} 740 ${y0} Q 770 ${y0-amp/2} 772 ${y0}`}
            fill="none"
            stroke={i%3===0 ? '#00bcd4' : i%3===1 ? '#1a3a5c' : '#0d2a44'}
            strokeWidth={i%3===0 ? 1.5 : 1}
            opacity={0.3 + (i%4)*0.12}
          />
        )
      })}
      {/* "STUDIO" text in poster */}
      <text x="675" y="340" textAnchor="middle" fill="#0d2a44" fontSize="22" fontWeight="700" fontFamily="'Segoe UI',system-ui,sans-serif" letterSpacing="6">STUDIO</text>

      {/* ── NAME SIGN (neon-style center-right wall) ── */}
      {/* Sign backing */}
      <rect x="820" y="55" width="390" height="110" rx="8" fill="#040d1c" stroke="#0d2040" strokeWidth="2" opacity="0.9" />
      {/* Neon name */}
      <text
        x="1015" y="110"
        textAnchor="middle"
        fill="#00bcd4"
        fontSize="38"
        fontWeight="700"
        fontFamily="'Segoe UI',system-ui,sans-serif"
        letterSpacing="2"
        filter="url(#neonGlow)"
      >
        AVANEESH RAMESH
      </text>
      {/* Subtitle */}
      <text
        x="1015" y="140"
        textAnchor="middle"
        fill="#4dd0e1"
        fontSize="15"
        fontFamily="'Segoe UI',system-ui,sans-serif"
        letterSpacing="4"
        opacity="0.7"
        filter="url(#neonGlowSoft)"
      >
        CS  ·  MUSIC  ·  RESEARCH
      </text>

      {/* ── DESK SURFACE (right portion) ── */}
      {/* Desk top */}
      <rect x="720" y="490" width="688" height="130" fill="url(#deskGrad)" rx="2" />
      {/* Desk front edge (3D look) */}
      <rect x="720" y="490" width="688" height="14" fill="url(#deskEdge)" rx="2" />
      {/* Desk legs */}
      <rect x="738" y="620" width="20" height="90" fill="#081828" rx="3" />
      <rect x="1370" y="620" width="20" height="90" fill="#081828" rx="3" />
      {/* Under-desk shadow */}
      <rect x="720" y="618" width="688" height="6" fill="rgba(0,0,0,0.4)" />

      {/* ── DESK LAMP (far right) ── */}
      {/* Base */}
      <ellipse cx="1340" cy="492" rx="26" ry="6" fill="#0d2038" />
      <rect x="1335" y="458" width="10" height="36" fill="#0e2244" rx="2" />
      {/* Arm bend */}
      <path d="M 1340 458 Q 1325 420 1310 390 Q 1300 370 1290 360" fill="none" stroke="#0e2244" strokeWidth="8" strokeLinecap="round" />
      {/* Shade */}
      <path d="M 1265 352 Q 1290 342 1315 352 L 1310 368 Q 1290 360 1270 368 Z" fill="#102240" />
      <ellipse cx="1290" cy="360" rx="26" ry="9" fill="#102240" stroke="#162e50" strokeWidth="1.5" />
      {/* Lamp bulb */}
      <circle cx="1290" cy="368" r="5" fill="#ffe090" filter="url(#lampFlare)" opacity="0.85" />
      {/* Warm cone from desk lamp */}
      <polygon points="1265,368 1315,368 1370,620 1210,620" fill="rgba(255,200,80,0.055)" />

      {/* ── DESK ITEMS ── */}
      {/* Coffee cup */}
      <rect x="835" y="458" width="30" height="35" rx="3" fill="#0c1e30" stroke="#0e2438" strokeWidth="1.5" />
      <rect x="835" y="458" width="30" height="8"  rx="2" fill="#0e2440" />
      {/* Coffee steam */}
      <path d="M 845 454 Q 848 445 844 438" fill="none" stroke="#1a3a5a" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M 852 454 Q 855 443 851 436" fill="none" stroke="#1a3a5a" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 859 454 Q 862 446 858 440" fill="none" stroke="#1a3a5a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Cup handle */}
      <path d="M 865 465 Q 874 465 874 472 Q 874 479 865 479" fill="none" stroke="#0e2438" strokeWidth="2" strokeLinecap="round" />

      {/* Small succulent on desk */}
      <rect x="790" y="468" width="20" height="24" rx="2" fill="#0a1a28" stroke="#0d2035" strokeWidth="1" />
      <ellipse cx="800" cy="464" rx="14" ry="9"  fill="#0c2818" />
      <ellipse cx="791" cy="460" rx="7"  ry="6"  fill="#0a2416" />
      <ellipse cx="809" cy="460" rx="7"  ry="6"  fill="#0a2416" />
      <ellipse cx="800" cy="456" rx="6"  ry="5"  fill="#0e3020" />

      {/* Studio monitor / speaker on desk */}
      <rect x="883" y="430" width="70" height="62" rx="4" fill="#080f1c" stroke="#0e1e30" strokeWidth="1.5" />
      <rect x="890" y="437" width="56" height="42" rx="3" fill="#060c18" />
      <circle cx="918" cy="458" r="18" fill="#080f1c" stroke="#0e1e30" strokeWidth="1" />
      <circle cx="918" cy="458" r="14" fill="#060c18" />
      <circle cx="918" cy="458" r="8"  fill="#080f1c" />
      <circle cx="918" cy="458" r="3"  fill="#0a1828" />
      <circle cx="930" cy="440" r="4"  fill="#00bcd4" opacity="0.25" />

      {/* ── INSTRUMENT 1: ELECTRIC GUITAR (About) – hanging on left wall ── */}
      <g {...iprops(INSTRUMENTS[0])}>
        {/* Wall mount brackets */}
        <rect x="163" y="148" width="24" height="8" rx="2" fill="#0c1e30" opacity="0.8" />
        <rect x="161" y="152" width="28" height="5" rx="2" fill="#0e2440" opacity="0.7" />

        {/* Headstock */}
        <rect x="160" y="104" width="28" height="50" rx="4" fill="currentColor" />
        <rect x="159" y="107" width="30" height="5"  rx="1" fill="rgba(0,0,0,0.4)" />
        {/* Tuning pegs */}
        {[112,122,132,142].map(y => (
          <g key={y}>
            <circle cx="158" cy={y} r="5" fill="currentColor" />
            <circle cx="182" cy={y} r="5" fill="currentColor" />
          </g>
        ))}

        {/* Neck */}
        <rect x="167" y="154" width="14" height="160" rx="3" fill="currentColor" />
        {/* Fret markers */}
        {[175, 195, 215, 235, 255, 275].map(y => (
          <line key={y} x1="167" y1={y} x2="181" y2={y} stroke="#4dd0e1" strokeWidth="1" opacity="0.35" />
        ))}
        {/* Strings */}
        {[169,171,173,175,177,179].map((x,i) => (
          <line key={i} x1={x} y1="154" x2={x} y2="314" stroke="#4dd0e1" strokeWidth="0.5" opacity="0.4" />
        ))}

        {/* Body – Les Paul silhouette */}
        {/* Lower bout */}
        <ellipse cx="174" cy="355" rx="52" ry="58" fill="currentColor" />
        {/* Upper bout */}
        <ellipse cx="174" cy="280" rx="44" ry="48" fill="currentColor" />
        {/* Waist */}
        <rect x="142" y="302" width="64" height="38" fill="currentColor" />
        {/* Pickups */}
        <rect x="157" y="298" width="34" height="14" rx="3" fill="rgba(0,0,0,0.5)" />
        <rect x="157" y="330" width="34" height="14" rx="3" fill="rgba(0,0,0,0.5)" />
        {/* Pickup dots */}
        {[169,174,179].map(x => (
          <circle key={x} cx={x} cy="305" r="2" fill="#4dd0e1" opacity="0.45" />
        ))}
        {[169,174,179].map(x => (
          <circle key={x} cx={x} cy="337" r="2" fill="#4dd0e1" opacity="0.45" />
        ))}
        {/* Control knobs */}
        <circle cx="157" cy="368" r="6" fill="rgba(0,0,0,0.5)" stroke="currentColor" strokeWidth="1" />
        <circle cx="172" cy="374" r="6" fill="rgba(0,0,0,0.5)" stroke="currentColor" strokeWidth="1" />
        <circle cx="187" cy="368" r="6" fill="rgba(0,0,0,0.5)" stroke="currentColor" strokeWidth="1" />
        {/* Bridge */}
        <rect x="160" y="316" width="28" height="8" rx="2" fill="rgba(0,0,0,0.45)" />
        {/* Body outline glow hint */}
        <ellipse cx="174" cy="355" rx="52" ry="58" fill="none" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.18" />
        <ellipse cx="174" cy="280" rx="44" ry="48" fill="none" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.18" />
        {/* Strap pin */}
        <circle cx="174" cy="412" r="4" fill="currentColor" opacity="0.8" />
        {/* Guitar strap going up to wall mount */}
        <path d="M 174 156 Q 174 148 174 152" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.5" />

        {/* Hover label */}
        {hovered === 'about' && (
          <g>
            <rect x="115" y="420" width="120" height="28" rx="6" fill="rgba(0,188,212,0.25)" stroke="#00bcd4" strokeWidth="1" />
            <text x="175" y="438" textAnchor="middle" fill="#a0f0ff" fontSize="13" fontWeight="700" fontFamily="'Segoe UI',system-ui,sans-serif">About Me</text>
          </g>
        )}
      </g>

      {/* ── INSTRUMENT 2: ACOUSTIC GUITAR (Experience) – on floor stand ── */}
      <g {...iprops(INSTRUMENTS[1])}>
        {/* Guitar stand */}
        <line x1="430" y1="558" x2="408" y2="620" stroke="#0e2038" strokeWidth="4" strokeLinecap="round" />
        <line x1="430" y1="558" x2="452" y2="620" stroke="#0e2038" strokeWidth="4" strokeLinecap="round" />
        <line x1="430" y1="558" x2="430" y2="620" stroke="#0e2038" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="430" cy="620" rx="26" ry="5" fill="#0a1825" opacity="0.7" />
        {/* Body cradle */}
        <path d="M 408 558 Q 430 548 452 558" fill="none" stroke="#0e2038" strokeWidth="4" strokeLinecap="round" />

        {/* Headstock */}
        <rect x="418" y="90" width="24" height="55" rx="4" fill="currentColor" />
        <rect x="417" y="93" width="26" height="5"  rx="1" fill="rgba(0,0,0,0.35)" />
        {/* Tuning pegs */}
        {[100,114,128,142].map(y => (
          <g key={y}>
            <circle cx="416" cy={y} r="5.5" fill="currentColor" />
            <circle cx="442" cy={y} r="5.5" fill="currentColor" />
          </g>
        ))}
        {/* Nut */}
        <rect x="418" y="145" width="24" height="5" rx="1" fill="rgba(0,0,0,0.4)" />

        {/* Neck */}
        <rect x="420" y="150" width="20" height="170" rx="3" fill="currentColor" />
        {/* Frets */}
        {[165,185,205,225,245,265,285,305].map(y => (
          <line key={y} x1="420" y1={y} x2="440" y2={y} stroke="#4dd0e1" strokeWidth="0.8" opacity="0.3" />
        ))}
        {/* Strings */}
        {[422,425,428,431,434,437].map((x,i) => (
          <line key={i} x1={x} y1="145" x2={x} y2="320" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.45" />
        ))}

        {/* Body – acoustic silhouette */}
        {/* Lower bout */}
        <ellipse cx="430" cy="405" rx="58" ry="65" fill="currentColor" />
        {/* Upper bout */}
        <ellipse cx="430" cy="318" rx="47" ry="52" fill="currentColor" />
        {/* Waist */}
        <rect x="396" y="342" width="68" height="42" fill="currentColor" />
        {/* Sound hole */}
        <circle cx="430" cy="390" r="22" fill="rgba(0,0,0,0.5)" />
        <circle cx="430" cy="390" r="19" fill="rgba(0,0,0,0.3)" />
        {/* Rosette rings */}
        <circle cx="430" cy="390" r="22" fill="none" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.3" />
        <circle cx="430" cy="390" r="18" fill="none" stroke="#4dd0e1" strokeWidth="0.4" opacity="0.2" />
        {/* Bridge */}
        <rect x="415" y="425" width="30" height="9" rx="2" fill="rgba(0,0,0,0.45)" />
        {/* Bridge saddle */}
        <rect x="418" y="427" width="24" height="3" rx="1" fill="rgba(0,0,0,0.35)" />
        {/* Body outline */}
        <ellipse cx="430" cy="405" rx="58" ry="65" fill="none" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.18" />
        <ellipse cx="430" cy="318" rx="47" ry="52" fill="none" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.18" />
        {/* Strap pin */}
        <circle cx="430" cy="470" r="4" fill="currentColor" opacity="0.7" />

        {hovered === 'experience' && (
          <g>
            <rect x="365" y="490" width="130" height="28" rx="6" fill="rgba(0,188,212,0.25)" stroke="#00bcd4" strokeWidth="1" />
            <text x="430" y="508" textAnchor="middle" fill="#a0f0ff" fontSize="13" fontWeight="700" fontFamily="'Segoe UI',system-ui,sans-serif">Experience</text>
          </g>
        )}
      </g>

      {/* ── INSTRUMENT 3: GUITAR AMP (Projects) – floor ── */}
      <g {...iprops(INSTRUMENTS[2])}>
        {/* Cabinet */}
        <rect x="608" y="460" width="144" height="160" rx="6" fill="currentColor" />
        {/* Control strip top */}
        <rect x="614" y="466" width="132" height="28" rx="3" fill="rgba(0,0,0,0.45)" />
        {/* Knobs */}
        {[630,652,674,696,718,740].map(x => (
          <circle key={x} cx={x} cy="480" r="7" fill="rgba(0,0,0,0.5)" stroke="#4dd0e1" strokeWidth="0.8" opacity="0.6" />
        ))}
        {/* Small indicator light */}
        <circle cx="746" cy="472" r="3.5" fill="#00bcd4" opacity="0.7" filter="url(#neonGlowSoft)" />
        {/* Speaker grill panel */}
        <rect x="614" y="498" width="132" height="108" rx="3" fill="rgba(0,0,0,0.38)" />
        {/* Speaker circle */}
        <circle cx="680" cy="552" r="46" fill="currentColor" opacity="0.3" />
        <circle cx="680" cy="552" r="42" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.4" />
        <circle cx="680" cy="552" r="35" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" />
        <circle cx="680" cy="552" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <circle cx="680" cy="552" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <circle cx="680" cy="552" r="7"  fill="currentColor" opacity="0.5" />
        {/* Grill cloth texture dots */}
        {Array.from({length:8}).map((_,r) =>
          Array.from({length:10}).map((_,c) => (
            <circle key={`${r}-${c}`} cx={625+c*10} cy={505+r*12} r="0.8" fill="#4dd0e1" opacity="0.12" />
          ))
        )}
        {/* Corner screws */}
        {[[617,500],[744,500],[617,606],[744,606]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="rgba(0,0,0,0.4)" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        ))}
        {/* Amp outline glow hint */}
        <rect x="608" y="460" width="144" height="160" rx="6" fill="none" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.15" />

        {hovered === 'projects' && (
          <g>
            <rect x="628" y="626" width="104" height="28" rx="6" fill="rgba(0,188,212,0.25)" stroke="#00bcd4" strokeWidth="1" />
            <text x="680" y="644" textAnchor="middle" fill="#a0f0ff" fontSize="13" fontWeight="700" fontFamily="'Segoe UI',system-ui,sans-serif">Projects</text>
          </g>
        )}
      </g>

      {/* ── INSTRUMENT 4: PEDAL BOARD (Outside CS) – on desk ── */}
      <g {...iprops(INSTRUMENTS[3])}>
        {/* Board base */}
        <rect x="876" y="473" width="168" height="22" rx="3" fill="currentColor" opacity="0.9" />
        {/* Board surface / angle */}
        <rect x="876" y="473" width="168" height="6" rx="2" fill="rgba(0,188,212,0.2)" />
        {/* Rubber feet */}
        {[882,892,1032,1042].map(x => (
          <rect key={x} x={x} y="493" width="6" height="4" rx="1" fill="rgba(0,0,0,0.4)" />
        ))}

        {/* Pedals row 1 */}
        {[
          {x:882, label:'DRIVE'},
          {x:934, label:'DELAY'},
          {x:986, label:'VERB'},
          {x:1038, label:'BOOST'},
        ].map(({x,label}) => (
          <g key={label}>
            <rect x={x} y="440" width="46" height="38" rx="4" fill="currentColor" opacity="0.85" />
            <rect x={x} y="440" width="46" height="10" rx="3" fill="rgba(0,0,0,0.3)" />
            {/* LED */}
            <circle cx={x+36} cy={x===882?447:447} r="3" fill="#00bcd4" opacity="0.5" filter="url(#neonGlowSoft)" />
            {/* Knobs */}
            <circle cx={x+14} cy={x===882?458:458} r="5.5" fill="rgba(0,0,0,0.45)" stroke="#4dd0e1" strokeWidth="0.7" opacity="0.6" />
            <circle cx={x+28} cy={x===882?458:458} r="5.5" fill="rgba(0,0,0,0.45)" stroke="#4dd0e1" strokeWidth="0.7" opacity="0.6" />
            {/* Label */}
            <text x={x+23} y={485} textAnchor="middle" fill="#4dd0e1" fontSize="5.5" fontFamily="monospace" opacity="0.55">{label}</text>
            {/* Footswitch */}
            <ellipse cx={x+23} cy={470} rx="9" ry="5" fill="rgba(0,0,0,0.4)" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          </g>
        ))}
        {/* Patch cables */}
        <path d="M 928 462 Q 934 468 934 462" fill="none" stroke="#0a1e30" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M 980 462 Q 986 468 986 462" fill="none" stroke="#0a1e30" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M 1032 462 Q 1038 468 1038 462" fill="none" stroke="#0a1e30" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        {/* Power supply */}
        <rect x="876" y="435" width="20" height="8" rx="2" fill="rgba(0,0,0,0.4)" opacity="0.7" />

        {hovered === 'outside-cs' && (
          <g>
            <rect x="890" y="500" width="142" height="28" rx="6" fill="rgba(0,188,212,0.25)" stroke="#00bcd4" strokeWidth="1" />
            <text x="961" y="518" textAnchor="middle" fill="#a0f0ff" fontSize="13" fontWeight="700" fontFamily="'Segoe UI',system-ui,sans-serif">Outside of CS</text>
          </g>
        )}
      </g>

      {/* ── INSTRUMENT 5: VINYL RECORD PLAYER + HEADPHONES (Contact) ── */}
      <g {...iprops(INSTRUMENTS[4])}>
        {/* Turntable base */}
        <rect x="1148" y="468" width="125" height="28" rx="4" fill="currentColor" opacity="0.9" />
        <rect x="1148" y="468" width="125" height="7"  rx="3" fill="rgba(0,0,0,0.3)" />
        {/* Platter */}
        <circle cx="1195" cy="468" r="46" fill="currentColor" opacity="0.85" />
        <circle cx="1195" cy="468" r="42" fill="rgba(0,0,0,0.3)" />
        {/* Record on platter */}
        <circle cx="1195" cy="468" r="38" fill="#06101e" stroke="#0e2038" strokeWidth="1.5" />
        <circle cx="1195" cy="468" r="30" fill="#08121e" />
        <circle cx="1195" cy="468" r="22" fill="#060e1c" />
        <circle cx="1195" cy="468" r="12" fill="#081420" />
        <circle cx="1195" cy="468" r="5"  fill="#0a1828" />
        {/* Record grooves */}
        {[16,24,32,38].map(r => (
          <circle key={r} cx="1195" cy="468" r={r} fill="none" stroke="#0d1e30" strokeWidth="0.8" opacity="0.5" />
        ))}
        {/* Label on record */}
        <circle cx="1195" cy="468" r="10" fill="#00bcd4" opacity="0.15" />
        <circle cx="1195" cy="468" r="3"  fill="#00bcd4" opacity="0.4" />
        {/* Tonearm */}
        <circle cx="1255" cy="436" r="5" fill="currentColor" opacity="0.7" />
        <line x1="1255" y1="436" x2="1220" y2="458" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <circle cx="1220" cy="458" r="3" fill="#4dd0e1" opacity="0.5" />
        {/* On/off button */}
        <circle cx="1258" cy="480" r="6" fill="rgba(0,0,0,0.45)" stroke="#4dd0e1" strokeWidth="0.8" opacity="0.6" />

        {/* Headphones draped over platter */}
        {/* Headband */}
        <path
          d="M 1163 440 Q 1195 418 1228 440"
          fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.85"
        />
        {/* Left ear cup */}
        <ellipse cx="1163" cy="446" rx="12" ry="16" fill="currentColor" opacity="0.85" />
        <ellipse cx="1163" cy="446" rx="8"  ry="11" fill="rgba(0,0,0,0.45)" />
        <ellipse cx="1163" cy="446" rx="5"  ry="7"  fill="currentColor" opacity="0.3" />
        {/* Right ear cup */}
        <ellipse cx="1228" cy="446" rx="12" ry="16" fill="currentColor" opacity="0.85" />
        <ellipse cx="1228" cy="446" rx="8"  ry="11" fill="rgba(0,0,0,0.45)" />
        <ellipse cx="1228" cy="446" rx="5"  ry="7"  fill="currentColor" opacity="0.3" />
        {/* Headband padding */}
        <path
          d="M 1170 436 Q 1195 424 1221 436"
          fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="4" strokeLinecap="round"
        />

        {hovered === 'contact' && (
          <g>
            <rect x="1151" y="500" width="88" height="28" rx="6" fill="rgba(0,188,212,0.25)" stroke="#00bcd4" strokeWidth="1" />
            <text x="1195" y="518" textAnchor="middle" fill="#a0f0ff" fontSize="13" fontWeight="700" fontFamily="'Segoe UI',system-ui,sans-serif">Contact</text>
          </g>
        )}
      </g>

      {/* ── FLOOR SHADOWS under instruments ── */}
      <ellipse cx="174" cy="618" rx="40" ry="8"  fill="rgba(0,0,0,0.4)" />
      <ellipse cx="430" cy="618" rx="46" ry="7"  fill="rgba(0,0,0,0.35)" />
      <ellipse cx="680" cy="618" rx="58" ry="8"  fill="rgba(0,0,0,0.35)" />

      {/* ── HINT TEXT ── */}
      <text
        x={VB_W / 2} y="758"
        textAnchor="middle"
        fill="#1a3a5a"
        fontSize="13"
        fontFamily="'Segoe UI',system-ui,sans-serif"
        letterSpacing="3"
      >
        CLICK AN INSTRUMENT TO EXPLORE
      </text>
    </svg>
  )
}
