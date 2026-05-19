import { useState } from 'react'

interface Building {
  id:      string
  label:   string
  section: string
  centerX: number
  tooltipW: number
}

const BUILDINGS: Building[] = [
  { id: 'home',       label: 'Home',          section: '#home',       centerX: 152, tooltipW: 90  },
  { id: 'about',      label: 'About Me',      section: '#about',      centerX: 308, tooltipW: 110 },
  { id: 'experience', label: 'Experience',    section: '#experience', centerX: 510, tooltipW: 118 },
  { id: 'projects',   label: 'Projects',      section: '#projects',   centerX: 672, tooltipW: 100 },
  { id: 'outside-cs', label: 'Outside of CS', section: '#outside-cs', centerX: 808, tooltipW: 138 },
  { id: 'contact',    label: 'Contact Me',    section: '#contact',    centerX: 958, tooltipW: 118 },
]

const STARS = [
  [42,18,1.2],[120,35,0.9],[198,12,1.1],[275,28,0.8],[350,8,1.3],[430,22,1],[510,15,0.9],
  [590,32,1.2],[670,9,1],[750,25,1.3],[830,18,0.8],[920,11,1.1],[1010,30,0.9],[1090,14,1.2],
  [1160,24,1],[65,55,0.8],[145,68,1.1],[220,48,0.9],[310,62,1.3],[395,50,0.8],[480,72,1],
  [560,58,0.9],[640,44,1.2],[720,66,0.8],[800,52,1.1],[880,42,0.9],[960,70,1.3],[1040,55,0.8],
  [1130,46,1],[18,88,1.2],[95,100,0.9],[175,82,1.1],[255,95,0.8],[340,108,1],[415,92,0.9],
  [495,115,1.2],[575,98,0.8],[655,85,1.1],[735,110,0.9],[815,96,1.3],[895,82,0.8],[975,105,1],
  [1055,90,0.9],[1140,115,1.2],[30,130,0.8],[110,122,1],[195,138,0.9],[280,125,1.1],[360,142,0.8],
  [450,130,1.2],[535,118,0.9],[615,136,1],[695,122,0.8],[775,140,1.1],[855,128,0.9],[935,115,1.3],
  [1015,132,0.8],[1095,120,1],[1175,136,0.9],
]

function scrollTo(section: string) {
  const el = document.querySelector(section)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function AustinSkyline() {
  const [hovered, setHovered] = useState<string | null>(null)
  const hovBuilding = BUILDINGS.find(b => b.id === hovered)

  function buildingProps(id: string, label: string, section: string) {
    return {
      className: `skyline-building${hovered === id ? ' is-hovered' : ''}`,
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
      <p className="skyline-hint">Explore Austin — click a landmark to navigate</p>
      <div className="skyline-wrap">
        <svg
          viewBox="0 0 1200 480"
          xmlns="http://www.w3.org/2000/svg"
          className="skyline-svg"
          role="img"
          aria-label="Interactive Austin skyline navigation"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0d0620" />
              <stop offset="60%"  stopColor="#0d1840" />
              <stop offset="100%" stopColor="#1a2a5e" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#131d40" />
              <stop offset="100%" stopColor="#0a0f20" />
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
          <circle cx="1132" cy="47" r="22" fill="#0d1840" />

          {/* Lady Bird Lake */}
          <rect x="0" y="395" width="1200" height="85" fill="url(#waterGrad)" />
          <line x1="0" y1="410" x2="1200" y2="410" stroke="#1e3060" strokeWidth="1.5" opacity="0.6" />
          <line x1="0" y1="425" x2="1200" y2="425" stroke="#1e3060" strokeWidth="1"   opacity="0.4" />
          <line x1="0" y1="440" x2="1200" y2="440" stroke="#1e3060" strokeWidth="0.8" opacity="0.3" />
          {/* Reflection glows */}
          <ellipse cx="152"  cy="430" rx="18" ry="5" fill="#6c63ff" opacity="0.18" />
          <ellipse cx="308"  cy="432" rx="14" ry="5" fill="#6c63ff" opacity="0.15" />
          <ellipse cx="510"  cy="428" rx="22" ry="6" fill="#6c63ff" opacity="0.18" />
          <ellipse cx="672"  cy="430" rx="15" ry="5" fill="#6c63ff" opacity="0.15" />
          <ellipse cx="808"  cy="430" rx="17" ry="5" fill="#6c63ff" opacity="0.16" />
          <ellipse cx="958"  cy="432" rx="18" ry="5" fill="#6c63ff" opacity="0.15" />

          {/* ── FILLER BUILDINGS (non-interactive) ── */}
          {/* Far left */}
          <rect x="0"    y="340" width="50"  height="55"  fill="#161c38" />
          <rect x="18"   y="312" width="28"  height="83"  fill="#161c38" />
          {/* Between Capitol and UT Tower */}
          <rect x="212"  y="308" width="24"  height="87"  fill="#161c38" />
          <rect x="220"  y="285" width="18"  height="110" fill="#161c38" />
          {/* Between UT Tower and Frost Bank */}
          <rect x="400"  y="215" width="48"  height="180" fill="#181e3a" />
          <rect x="432"  y="245" width="35"  height="150" fill="#161c38" />
          <rect x="450"  y="268" width="26"  height="127" fill="#14193a" />
          {/* Between Frost Bank and 360 */}
          <rect x="600"  y="195" width="36"  height="200" fill="#181e3a" />
          <rect x="614"  y="218" width="24"  height="177" fill="#161c38" />
          {/* Between 360 and The Independent */}
          <rect x="720"  y="225" width="30"  height="170" fill="#181e3a" />
          <rect x="732"  y="248" width="22"  height="147" fill="#161c38" />
          {/* Between The Independent and Congress Ave */}
          <rect x="860"  y="215" width="32"  height="180" fill="#181e3a" />
          <rect x="874"  y="235" width="22"  height="160" fill="#161c38" />
          {/* Right side */}
          <rect x="1020" y="245" width="44"  height="150" fill="#161c38" />
          <rect x="1048" y="268" width="30"  height="127" fill="#14193a" />
          <rect x="1090" y="295" width="42"  height="100" fill="#161c38" />
          <rect x="1145" y="318" width="55"  height="77"  fill="#161c38" />

          {/* ── 1 · STATE CAPITOL (Home) ── */}
          <g {...buildingProps('home', 'Home', '#home')}>
            <rect fill="currentColor" x="66"  y="302" width="28"  height="93"  />
            <rect fill="currentColor" x="188" y="302" width="28"  height="93"  />
            <rect fill="currentColor" x="83"  y="272" width="116" height="123" />
            <rect fill="currentColor" x="88"  y="263" width="106" height="12"  />
            <rect fill="currentColor" x="94"  y="254" width="94"  height="12"  />
            <rect fill="currentColor" x="122" y="230" width="38"  height="28"  />
            <path fill="currentColor" d="M 115 232 Q 88 182 145 155 Q 202 182 175 232 Z" />
            <rect fill="currentColor" x="139" y="135" width="12"  height="23"  />
            <polygon fill="currentColor" points="145,120 147,127 154,127 148,132 150,139 145,134 140,139 142,132 136,127 143,127" />
          </g>

          {/* ── 2 · UT TOWER (About Me) ── */}
          <g {...buildingProps('about', 'About Me', '#about')}>
            <rect fill="currentColor" x="234" y="260" width="148" height="135" />
            <rect fill="currentColor" x="238" y="310" width="140" height="5" opacity="0.4" />
            <rect fill="currentColor" x="238" y="325" width="140" height="5" opacity="0.4" />
            <rect fill="currentColor" x="286" y="78"  width="44"  height="182" />
            <rect fill="currentColor" x="276" y="64"  width="64"  height="17"  />
            <rect fill="currentColor" x="282" y="42"  width="52"  height="25"  />
            <rect fill="currentColor" x="288" y="26"  width="40"  height="19"  />
            <rect fill="currentColor" x="288" y="18"  width="9"   height="10"  />
            <rect fill="currentColor" x="303" y="18"  width="10"  height="10"  />
            <rect fill="currentColor" x="319" y="18"  width="9"   height="10"  />
            <rect fill="currentColor" x="306" y="4"   width="4"   height="16"  />
          </g>

          {/* ── 3 · FROST BANK TOWER (Experience) — tallest ── */}
          <g {...buildingProps('experience', 'Experience', '#experience')}>
            <rect fill="currentColor" x="460" y="78"  width="100" height="317" />
            <polygon fill="currentColor" points="460,78 460,46 492,78" />
            <polygon fill="currentColor" points="560,78 560,46 528,78" />
            <rect fill="currentColor" x="492" y="50"  width="36"  height="30"  />
            <rect fill="currentColor" x="508" y="22"  width="5"   height="30"  />
            <rect fill="currentColor" x="463" y="138" width="94"  height="5" opacity="0.35" />
            <rect fill="currentColor" x="463" y="188" width="94"  height="5" opacity="0.35" />
          </g>

          {/* ── 4 · 360 CONDOS (Projects) ── */}
          <g {...buildingProps('projects', 'Projects', '#projects')}>
            <rect fill="currentColor" x="632" y="104" width="80"  height="291" rx="3" />
            <rect fill="currentColor" x="637" y="94"  width="70"  height="14"  />
            <rect fill="currentColor" x="644" y="82"  width="56"  height="15"  />
            <rect fill="currentColor" x="652" y="68"  width="40"  height="17"  />
          </g>

          {/* ── 5 · THE INDEPENDENT / JENGA TOWER (Outside of CS) ── */}
          <g {...buildingProps('outside-cs', 'Outside of CS', '#outside-cs')}>
            {/* Main shaft */}
            <rect fill="currentColor" x="768" y="92"  width="80"  height="303" />
            {/* Jenga cantilevered slabs — alternating left / right protrusions */}
            <rect fill="currentColor" x="752" y="120" width="20"  height="36"  />
            <rect fill="currentColor" x="844" y="175" width="20"  height="36"  />
            <rect fill="currentColor" x="752" y="232" width="20"  height="36"  />
            <rect fill="currentColor" x="844" y="288" width="20"  height="36"  />
            {/* Top crown */}
            <rect fill="currentColor" x="773" y="80"  width="70"  height="15"  />
            <rect fill="currentColor" x="780" y="68"  width="56"  height="15"  />
            {/* Antenna */}
            <rect fill="currentColor" x="806" y="46"  width="4"   height="24"  />
          </g>

          {/* ── 6 · CONGRESS AVE TOWER (Contact Me) ── */}
          <g {...buildingProps('contact', 'Contact Me', '#contact')}>
            <rect fill="currentColor" x="910" y="118" width="96"  height="277" />
            <rect fill="currentColor" x="915" y="108" width="86"  height="13"  />
            <rect fill="currentColor" x="923" y="96"  width="70"  height="15"  />
            <rect fill="currentColor" x="930" y="82"  width="56"  height="17"  />
            <rect fill="currentColor" x="941" y="68"  width="34"  height="17"  />
            <rect fill="currentColor" x="956" y="48"  width="4"   height="22"  />
          </g>

          {/* ── TOOLTIP IN WATER REFLECTION ── */}
          {hovBuilding && (
            <g className="skyline-tooltip">
              <rect
                x={hovBuilding.centerX - hovBuilding.tooltipW / 2}
                y="414"
                width={hovBuilding.tooltipW}
                height="30"
                rx="8"
                fill="rgba(108,99,255,0.28)"
                stroke="#6c63ff"
                strokeWidth="1"
              />
              <text
                x={hovBuilding.centerX}
                y="433"
                textAnchor="middle"
                fill="#c5c2ff"
                fontSize="13"
                fontWeight="700"
                fontFamily="'Segoe UI', system-ui, sans-serif"
              >
                {hovBuilding.label}
              </text>
            </g>
          )}

          {/* ── WINDOW LIGHTS ── */}
          {[92,112,132,152,172].map(wx => [280,300,320,340,360].map(wy => (
            <rect key={`cw-${wx}-${wy}`} x={wx} y={wy} width="6" height="8" fill="#ffe8a0" opacity="0.12" rx="1" />
          )))}
          {[291,301,311,321].map(wx => [100,120,140,160,180,200,220,240].map(wy => (
            <rect key={`uw-${wx}-${wy}`} x={wx} y={wy} width="5" height="7" fill="#ffe8a0" opacity="0.10" rx="1" />
          )))}
          {[468,482,496,510,524,538,552].map(wx => [100,125,150,175,200,225,250,275,300,325,350].map(wy => (
            <rect key={`fw-${wx}-${wy}`} x={wx} y={wy} width="6" height="9" fill="#a0c4ff" opacity="0.09" rx="1" />
          )))}
          {[776,788,800,812,824,836].map(wx => [110,138,165,192,220,248,276,304,332,360].map(wy => (
            <rect key={`jw-${wx}-${wy}`} x={wx} y={wy} width="5" height="8" fill="#a0c4ff" opacity="0.08" rx="1" />
          )))}
        </svg>
      </div>
    </section>
  )
}
