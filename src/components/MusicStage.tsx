import { useState } from 'react'

interface Instrument {
  id:       string
  label:    string
  section:  string
  centerX:  number
  tooltipW: number
}

const INSTRUMENTS: Instrument[] = [
  { id: 'home',       label: 'Home',          section: '#home',       centerX: 110, tooltipW: 90  },
  { id: 'about',      label: 'About Me',      section: '#about',      centerX: 280, tooltipW: 110 },
  { id: 'experience', label: 'Experience',    section: '#experience', centerX: 460, tooltipW: 118 },
  { id: 'projects',   label: 'Projects',      section: '#projects',   centerX: 650, tooltipW: 100 },
  { id: 'outside-cs', label: 'Outside of CS', section: '#outside-cs', centerX: 820, tooltipW: 138 },
  { id: 'contact',    label: 'Contact Me',    section: '#contact',    centerX: 975, tooltipW: 118 },
]

const STARS = [
  [42,18,1.2],[120,35,0.9],[198,12,1.1],[275,28,0.8],[350,8,1.3],[430,22,1],[510,15,0.9],
  [590,32,1.2],[670,9,1],[750,25,1.3],[830,18,0.8],[920,11,1.1],[1010,30,0.9],[1090,14,1.2],
  [1160,24,1],[65,55,0.8],[145,68,1.1],[220,48,0.9],[310,62,1.3],[395,50,0.8],[480,72,1],
  [560,58,0.9],[640,44,1.2],[720,66,0.8],[800,52,1.1],[880,42,0.9],[960,70,1.3],[1040,55,0.8],
  [1130,46,1],[18,88,1.2],[95,100,0.9],[175,82,1.1],[255,95,0.8],[340,108,1],[415,92,0.9],
  [495,115,1.2],[575,98,0.8],[655,85,1.1],[735,110,0.9],[815,96,1.3],[895,82,0.8],[975,105,1],
]

function scrollTo(section: string) {
  const el = document.querySelector(section)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function MusicStage() {
  const [hovered, setHovered] = useState<string | null>(null)
  const hovInstrument = INSTRUMENTS.find(i => i.id === hovered)

  function instrumentProps(id: string, label: string, section: string) {
    return {
      className: `music-instrument${hovered === id ? ' is-hovered' : ''}`,
      onMouseEnter: () => setHovered(id),
      onMouseLeave: () => setHovered(null),
      onClick:      () => scrollTo(section),
      role:         'button' as const,
      tabIndex:     0,
      'aria-label': `Go to ${label} section`,
      onKeyDown:    (e: React.KeyboardEvent) => e.key === 'Enter' && scrollTo(section),
    }
  }

  return (
    <section className="skyline-section">
      <p className="skyline-hint">Click an instrument to navigate</p>
      <div className="skyline-wrap">
        <svg
          viewBox="0 0 1200 480"
          xmlns="http://www.w3.org/2000/svg"
          className="skyline-svg"
          role="img"
          aria-label="Interactive music stage navigation"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#020b18" />
              <stop offset="60%"  stopColor="#041428" />
              <stop offset="100%" stopColor="#0a2040" />
            </linearGradient>
            <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#050f1e" />
              <stop offset="100%" stopColor="#020810" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Sky */}
          <rect x="0" y="0" width="1200" height="480" fill="url(#skyGrad)" />

          {/* Stars */}
          {STARS.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={0.5 + (i % 5) * 0.1} />
          ))}

          {/* Moon */}
          <circle cx="1120" cy="55" r="28" fill="#ffe8a0" opacity="0.9" filter="url(#glow)" />
          <circle cx="1132" cy="47" r="22" fill="#041428" />

          {/* Spotlight cones */}
          {INSTRUMENTS.map(inst => (
            <polygon
              key={`spot-${inst.id}`}
              points={`${inst.centerX},0 ${inst.centerX - 90},380 ${inst.centerX + 90},380`}
              fill="rgba(0,188,212,0.018)"
            />
          ))}

          {/* Stage floor */}
          <rect x="0" y="375" width="1200" height="105" fill="url(#stageGrad)" />
          <line x1="0" y1="375" x2="1200" y2="375" stroke="#00bcd4" strokeWidth="1.5" opacity="0.35" />
          <line x1="0" y1="395" x2="1200" y2="395" stroke="#1a3a5a" strokeWidth="1"   opacity="0.3"  />
          <line x1="0" y1="418" x2="1200" y2="418" stroke="#1a3a5a" strokeWidth="0.8" opacity="0.2"  />

          {/* Floor glow under each instrument */}
          {INSTRUMENTS.map(inst => (
            <ellipse key={`fg-${inst.id}`} cx={inst.centerX} cy={390} rx={35} ry={9} fill="#00bcd4" opacity="0.10" />
          ))}

          {/* ── 1 · MICROPHONE STAND (Home) ── */}
          <g {...instrumentProps('home', 'Home', '#home')}>
            <line x1="110" y1="367" x2="80"  y2="376" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <line x1="110" y1="367" x2="140" y2="376" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <line x1="110" y1="367" x2="110" y2="376" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="110" cy="367" r="5" fill="currentColor"/>
            <rect x="107.5" y="200" width="5" height="167" fill="currentColor" rx="2.5"/>
            <rect x="103"   y="195" width="14" height="9" fill="currentColor" rx="3"/>
            <rect x="103"   y="148" width="14" height="50" fill="currentColor" rx="6"/>
            <ellipse cx="110" cy="148" rx="7" ry="9" fill="currentColor"/>
            <line x1="105" y1="160" x2="115" y2="160" stroke="#4dd0e1" strokeWidth="0.9" opacity="0.55"/>
            <line x1="105" y1="169" x2="115" y2="169" stroke="#4dd0e1" strokeWidth="0.9" opacity="0.55"/>
            <line x1="105" y1="178" x2="115" y2="178" stroke="#4dd0e1" strokeWidth="0.9" opacity="0.55"/>
            <line x1="105" y1="187" x2="115" y2="187" stroke="#4dd0e1" strokeWidth="0.9" opacity="0.55"/>
            <path d="M 110 367 Q 95 390 115 410" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.45" strokeLinecap="round"/>
          </g>

          {/* ── 2 · ACOUSTIC GUITAR (About Me) ── */}
          <g {...instrumentProps('about', 'About Me', '#about')}>
            <line x1="262" y1="358" x2="248" y2="376" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
            <line x1="298" y1="358" x2="312" y2="376" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
            <rect x="241" y="373" width="78" height="4" fill="currentColor" rx="2" opacity="0.6"/>
            <ellipse cx="280" cy="305" rx="46" ry="55" fill="currentColor"/>
            <ellipse cx="280" cy="228" rx="37" ry="42" fill="currentColor"/>
            <circle  cx="280" cy="296" r="16" fill="rgba(0,0,0,0.42)"/>
            <rect x="273" y="90" width="14" height="146" fill="currentColor" rx="2"/>
            <rect x="272" y="93" width="16" height="4"   fill="rgba(0,0,0,0.45)" rx="1"/>
            <rect x="270" y="64" width="20" height="30"  fill="currentColor" rx="2"/>
            <circle cx="268" cy="72" r="5" fill="currentColor"/>
            <circle cx="268" cy="84" r="5" fill="currentColor"/>
            <circle cx="268" cy="96" r="5" fill="currentColor"/>
            <circle cx="292" cy="72" r="5" fill="currentColor"/>
            <circle cx="292" cy="84" r="5" fill="currentColor"/>
            <circle cx="292" cy="96" r="5" fill="currentColor"/>
            <rect x="272" y="326" width="16" height="8" fill="rgba(0,0,0,0.45)" rx="1"/>
            {[274, 276, 278, 280, 282, 284].map((x, i) => (
              <line key={`as-${i}`} x1={x} y1="97" x2={x} y2="332" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.5"/>
            ))}
            <ellipse cx="280" cy="305" rx="46" ry="55" fill="none" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.22"/>
            <ellipse cx="280" cy="228" rx="37" ry="42" fill="none" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.22"/>
          </g>

          {/* ── 3 · ELECTRIC GUITAR (Experience) ── */}
          <g {...instrumentProps('experience', 'Experience', '#experience')} transform="rotate(-5, 460, 366)">
            <line x1="440" y1="360" x2="425" y2="376" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
            <line x1="480" y1="360" x2="495" y2="376" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
            <rect x="418" y="373" width="84" height="4" fill="currentColor" rx="2" opacity="0.6"/>
            <ellipse cx="460" cy="308" rx="51" ry="57" fill="currentColor"/>
            <ellipse cx="460" cy="240" rx="43" ry="43" fill="currentColor"/>
            <rect x="449" y="262" width="22" height="10" fill="rgba(0,0,0,0.45)" rx="2"/>
            <rect x="449" y="297" width="22" height="10" fill="rgba(0,0,0,0.45)" rx="2"/>
            {[451,454,457,460,463,466].map((x, i) => (
              <circle key={`ep1-${i}`} cx={x} cy="267" r="1.5" fill="#4dd0e1" opacity="0.5"/>
            ))}
            {[451,454,457,460,463,466].map((x, i) => (
              <circle key={`ep2-${i}`} cx={x} cy="302" r="1.5" fill="#4dd0e1" opacity="0.5"/>
            ))}
            <circle cx="450" cy="340" r="6" fill="rgba(0,0,0,0.4)"/>
            <circle cx="464" cy="350" r="6" fill="rgba(0,0,0,0.4)"/>
            <circle cx="478" cy="344" r="6" fill="rgba(0,0,0,0.4)"/>
            <rect x="453" y="68" width="14" height="185" fill="currentColor" rx="2"/>
            <rect x="452" y="70" width="16" height="4"   fill="rgba(0,0,0,0.45)" rx="1"/>
            <rect x="449" y="42" width="22" height="30"  fill="currentColor" rx="2"/>
            <circle cx="447" cy="50" r="5" fill="currentColor"/>
            <circle cx="447" cy="62" r="5" fill="currentColor"/>
            <circle cx="447" cy="74" r="5" fill="currentColor"/>
            <circle cx="473" cy="50" r="5" fill="currentColor"/>
            <circle cx="473" cy="62" r="5" fill="currentColor"/>
            <circle cx="473" cy="74" r="5" fill="currentColor"/>
            {[453,455,457,460,463,465].map((x, i) => (
              <line key={`es-${i}`} x1={x} y1="70" x2={x} y2="360" stroke="#4dd0e1" strokeWidth="0.5" opacity="0.45"/>
            ))}
            <ellipse cx="460" cy="308" rx="51" ry="57" fill="none" stroke="#4dd0e1" strokeWidth="0.5" opacity="0.2"/>
          </g>

          {/* ── 4 · SYNTHESIZER / KEYBOARD (Projects) ── */}
          <g {...instrumentProps('projects', 'Projects', '#projects')}>
            <rect x="594" y="328" width="9"   height="47" fill="currentColor" rx="1" opacity="0.8"/>
            <rect x="697" y="328" width="9"   height="47" fill="currentColor" rx="1" opacity="0.8"/>
            <rect x="584" y="372" width="29"  height="6"  fill="currentColor" rx="2" opacity="0.8"/>
            <rect x="687" y="372" width="29"  height="6"  fill="currentColor" rx="2" opacity="0.8"/>
            <rect x="594" y="348" width="112" height="5"  fill="currentColor" rx="1" opacity="0.5"/>
            <rect x="573" y="258" width="154" height="30" fill="currentColor" rx="4" opacity="0.88"/>
            <rect x="580" y="263" width="38"  height="20" fill="rgba(0,188,212,0.22)" rx="3" stroke="#4dd0e1" strokeWidth="0.6"/>
            <ellipse cx="634" cy="273" rx="8" ry="6" fill="rgba(0,0,0,0.4)" stroke="#4dd0e1" strokeWidth="0.5"/>
            <ellipse cx="648" cy="273" rx="8" ry="6" fill="rgba(0,0,0,0.4)" stroke="#4dd0e1" strokeWidth="0.5"/>
            {[668, 686, 704, 714].map(x => (
              <circle key={`k-${x}`} cx={x} cy="273" r="7" fill="rgba(0,0,0,0.4)" stroke="#4dd0e1" strokeWidth="0.5"/>
            ))}
            <rect x="573" y="288" width="154" height="42" fill="currentColor" rx="3"/>
            {Array.from({length: 17}).map((_, i) => (
              <rect key={`wk-${i}`} x={578 + i * 8} y={293} width={7} height={32} fill="currentColor" opacity="0.92" rx="0.5"/>
            ))}
            {[583,591,607,615,623,639,647,663,671,679,695,703].map((x, i) => (
              <rect key={`bk-${i}`} x={x} y={293} width={5} height={20} fill="rgba(0,0,0,0.72)" rx="0.5"/>
            ))}
          </g>

          {/* ── 5 · CLARINET (Outside of CS) ── */}
          <g {...instrumentProps('outside-cs', 'Outside of CS', '#outside-cs')}>
            <rect x="816" y="70"  width="8"  height="30" fill="currentColor" rx="4"/>
            <rect x="817" y="85"  width="5"  height="18" fill="rgba(0,0,0,0.32)" rx="1"/>
            <rect x="814" y="89"  width="12" height="5"  fill="currentColor" rx="1" opacity="0.85"/>
            <rect x="815" y="100" width="10" height="26" fill="currentColor" rx="2"/>
            <rect x="815" y="126" width="10" height="115" fill="currentColor" rx="1"/>
            <rect x="815" y="241" width="10" height="100" fill="currentColor" rx="1"/>
            <path d="M 815 341 Q 808 366 802 376 L 838 376 Q 832 366 825 341 Z" fill="currentColor"/>
            <ellipse cx="820" cy="376" rx="18" ry="4" fill="currentColor" opacity="0.65"/>
            {[138, 157, 175, 198, 218].map(y => (
              <circle key={`uk-${y}`} cx="813" cy={y} r="5.5" fill="currentColor" stroke="#4dd0e1" strokeWidth="0.7" opacity="0.92"/>
            ))}
            {[252, 272, 292, 316].map(y => (
              <circle key={`lk-${y}`} cx="813" cy={y} r="5.5" fill="currentColor" stroke="#4dd0e1" strokeWidth="0.7" opacity="0.92"/>
            ))}
            <circle cx="826" cy="160" r="4.5" fill="currentColor" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.9"/>
            <circle cx="826" cy="248" r="4.5" fill="currentColor" stroke="#4dd0e1" strokeWidth="0.6" opacity="0.9"/>
            <rect x="825" y="183" width="11" height="5" fill="currentColor" rx="1" opacity="0.88"/>
            <rect x="825" y="198" width="11" height="5" fill="currentColor" rx="1" opacity="0.88"/>
            <rect x="825" y="262" width="11" height="5" fill="currentColor" rx="1" opacity="0.88"/>
          </g>

          {/* ── 6 · AMPLIFIER (Contact Me) ── */}
          <g {...instrumentProps('contact', 'Contact Me', '#contact')}>
            <rect x="916" y="243" width="118" height="132" fill="currentColor" rx="5"/>
            <rect x="927" y="256" width="96"  height="94"  fill="rgba(0,0,0,0.38)" rx="3"/>
            <circle cx="975" cy="305" r="40" fill="currentColor" opacity="0.32"/>
            <circle cx="975" cy="305" r="35" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.42"/>
            <circle cx="975" cy="305" r="27" fill="none" stroke="currentColor" strokeWidth="2"   opacity="0.38"/>
            <circle cx="975" cy="305" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.38"/>
            <circle cx="975" cy="305" r="9"  fill="currentColor" opacity="0.55"/>
            <circle cx="975" cy="305" r="4"  fill="rgba(0,0,0,0.35)"/>
            <rect x="927" y="354" width="96" height="18" fill="rgba(0,0,0,0.28)" rx="2"/>
            {[940, 956, 972, 988, 1004].map(x => (
              <circle key={`ak-${x}`} cx={x} cy="363" r="5.5" fill="currentColor" opacity="0.65" stroke="#4dd0e1" strokeWidth="0.5"/>
            ))}
            <path d="M 950 243 Q 950 232 975 232 Q 1000 232 1000 243" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.75"/>
            <circle cx="921"  cy="248" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="1029" cy="248" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="921"  cy="370" r="4" fill="currentColor" opacity="0.5"/>
            <circle cx="1029" cy="370" r="4" fill="currentColor" opacity="0.5"/>
            <rect x="920"  y="373" width="13" height="6" fill="currentColor" rx="3" opacity="0.7"/>
            <rect x="1017" y="373" width="13" height="6" fill="currentColor" rx="3" opacity="0.7"/>
          </g>

          {/* ── TOOLTIP IN STAGE FLOOR ── */}
          {hovInstrument && (
            <g className="skyline-tooltip">
              <rect
                x={hovInstrument.centerX - hovInstrument.tooltipW / 2}
                y="406"
                width={hovInstrument.tooltipW}
                height="30"
                rx="8"
                fill="rgba(0,188,212,0.28)"
                stroke="#00bcd4"
                strokeWidth="1"
              />
              <text
                x={hovInstrument.centerX}
                y="425"
                textAnchor="middle"
                fill="#a0f0ff"
                fontSize="13"
                fontWeight="700"
                fontFamily="'Segoe UI', system-ui, sans-serif"
              >
                {hovInstrument.label}
              </text>
            </g>
          )}
        </svg>
      </div>
    </section>
  )
}
