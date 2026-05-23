/**
 * SVG visuals ported from atlantis_deck.js (the pptxgenjs source).
 * Kept as raw SVG strings + dangerouslySetInnerHTML so they stay one-to-one
 * with the pptx source — easier to tweak both together.
 */

type RawProps = { className?: string }

function Raw({ html, className }: { html: string; className?: string }) {
  return <div className={className ?? 'atl-svg-frame'} dangerouslySetInnerHTML={{ __html: html }} />
}

// Plato-style concentric Atlantis rings (alternating land / water)
function platoRingsSvg(size = 600): string {
  const cx = size / 2, cy = size / 2
  const rings = [
    { r: 280, fill: '#1E3A5F' },
    { r: 235, fill: '#D4A574' },
    { r: 195, fill: '#1E3A5F' },
    { r: 165, fill: '#D4A574' },
    { r: 135, fill: '#1E3A5F' },
    { r: 100, fill: '#8C6A3E' },
    { r: 35,  fill: '#C44536' },
  ]
  const circles = rings.map(r => `<circle cx="${cx}" cy="${cy}" r="${r.r}" fill="${r.fill}" stroke="#0D1B2A" stroke-width="1.5"/>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#F4EFE6"/>
    ${circles}
  </svg>`
}

// Stylized satellite-style Richat rendering
function richatSatelliteSvg(size = 600): string {
  const cx = size / 2, cy = size / 2
  const rings = [
    { r: 285, fill: '#3a2f1f' },
    { r: 268, fill: '#5a4630' },
    { r: 250, fill: '#3a2f1f' },
    { r: 228, fill: '#8c6a3e' },
    { r: 210, fill: '#3a2f1f' },
    { r: 185, fill: '#9b774a' },
    { r: 165, fill: '#3a2f1f' },
    { r: 138, fill: '#a88554' },
    { r: 115, fill: '#3a2f1f' },
    { r: 90,  fill: '#b89466' },
    { r: 65,  fill: '#3a2f1f' },
    { r: 42,  fill: '#cca97d' },
    { r: 18,  fill: '#5a4630' },
  ]
  const circles = rings.map(r => `<circle cx="${cx}" cy="${cy}" r="${r.r}" fill="${r.fill}" stroke="#2a1f10" stroke-width="0.8"/>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <defs>
      <radialGradient id="ctx" cx="50%" cy="50%" r="60%">
        <stop offset="60%" stop-color="#2a1f10"/>
        <stop offset="100%" stop-color="#1a1208"/>
      </radialGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#ctx)"/>
    ${circles}
  </svg>`
}

const locatorMapSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#1E3A5F"/>
  <path d="M 290 110 Q 340 100 380 130 Q 400 160 390 200 Q 360 220 300 215 Q 270 200 280 160 Z" fill="#D4A574"/>
  <path d="M 280 240 Q 350 235 450 245 Q 550 250 650 240 Q 720 245 760 270 L 760 500 L 100 500 L 100 280 Q 150 250 280 240 Z" fill="#8C6A3E"/>
  <path d="M 380 210 Q 480 215 580 215 Q 680 220 760 215 L 760 250 Q 680 245 580 245 Q 480 240 380 245 Z" fill="#0D1B2A"/>
  <rect x="0" y="0" width="280" height="500" fill="#0D1B2A" opacity="0.85"/>
  <path d="M 0 100 Q 100 130 200 200 Q 250 270 200 350 Q 100 420 0 450 Z" fill="#1E3A5F" opacity="0.4"/>
  <circle cx="285" cy="225" r="10" fill="#C44536" stroke="#FFFFFF" stroke-width="2"/>
  <text x="170" y="195" fill="#F4EFE6" font-family="Georgia" font-size="20" font-weight="bold">Pillars of</text>
  <text x="170" y="220" fill="#F4EFE6" font-family="Georgia" font-size="20" font-weight="bold">Heracles</text>
  <line x1="200" y1="225" x2="275" y2="225" stroke="#F4EFE6" stroke-width="1.5"/>
  <circle cx="195" cy="345" r="14" fill="none" stroke="#D4A574" stroke-width="3"/>
  <circle cx="195" cy="345" r="8" fill="none" stroke="#D4A574" stroke-width="2"/>
  <circle cx="195" cy="345" r="3" fill="#D4A574"/>
  <text x="60" y="395" fill="#D4A574" font-family="Georgia" font-size="22" font-weight="bold">The Eye</text>
  <text x="60" y="420" fill="#D4A574" font-family="Georgia" font-size="16">Mauritania</text>
  <path d="M 275 245 Q 245 295 215 335" stroke="#C44536" stroke-width="3" fill="none" stroke-dasharray="6 4"/>
  <polygon points="210,330 220,345 207,345" fill="#C44536"/>
  <circle cx="620" cy="195" r="6" fill="#F4EFE6"/>
  <text x="635" y="200" fill="#F4EFE6" font-family="Georgia" font-size="16">Athens</text>
  <circle cx="680" cy="280" r="6" fill="#F4EFE6"/>
  <text x="695" y="285" fill="#F4EFE6" font-family="Georgia" font-size="16">Sais</text>
</svg>`

const tamanrassettMapSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#0D1B2A"/>
  <path d="M 100 100 L 700 100 L 720 200 L 700 350 L 650 500 L 500 550 L 300 540 L 150 480 L 80 350 L 80 200 Z" fill="#8C6A3E"/>
  <path d="M 130 120 L 690 120 L 700 280 L 600 320 L 250 310 L 130 260 Z" fill="#D4A574" opacity="0.7"/>
  <path d="M 80 200 L 80 350 L 150 480 Q 100 450 80 350 Z" fill="#1E3A5F"/>
  <polygon points="380,130 420,110 460,135 440,150 400,148" fill="#3D3733"/>
  <polygon points="450,125 490,108 525,130 510,145 470,143" fill="#3D3733"/>
  <text x="380" y="100" fill="#F4EFE6" font-family="Georgia" font-size="16" font-weight="bold">Atlas Mountains</text>
  <polygon points="540,200 580,180 620,205 600,225 555,220" fill="#3D3733"/>
  <text x="555" y="170" fill="#F4EFE6" font-family="Georgia" font-size="16" font-weight="bold">Hoggar Mts</text>
  <path d="M 460 140 Q 420 200 380 230 Q 330 260 260 280 Q 200 295 170 320 Q 150 340 130 365"
        stroke="#5DADE2" stroke-width="6" fill="none" opacity="0.95"/>
  <path d="M 590 210 Q 530 240 470 255 Q 400 270 340 275 Q 290 280 260 280"
        stroke="#5DADE2" stroke-width="5" fill="none" opacity="0.9"/>
  <circle cx="125" cy="370" r="10" fill="#5DADE2"/>
  <text x="20" y="395" fill="#5DADE2" font-family="Georgia" font-size="14" font-weight="bold">Cap Timiris</text>
  <text x="20" y="412" fill="#5DADE2" font-family="Georgia" font-size="14" font-weight="bold">Canyon</text>
  <circle cx="225" cy="290" r="16" fill="none" stroke="#C44536" stroke-width="3"/>
  <circle cx="225" cy="290" r="9" fill="none" stroke="#C44536" stroke-width="2"/>
  <circle cx="225" cy="290" r="4" fill="#C44536"/>
  <text x="245" y="285" fill="#C44536" font-family="Georgia" font-size="16" font-weight="bold">The Richat</text>
  <text x="245" y="305" fill="#F4EFE6" font-family="Calibri" font-size="13">on the river path</text>
  <text x="320" y="380" fill="#5DADE2" font-family="Georgia" font-size="18" font-style="italic" font-weight="bold">Tamanrasett</text>
  <text x="320" y="402" fill="#5DADE2" font-family="Georgia" font-size="14">paleo-river</text>
  <text x="320" y="420" fill="#F4EFE6" font-family="Calibri" font-size="12">(active ~14,500–5,500 BP)</text>
  <text x="20" y="290" fill="#F4EFE6" font-family="Georgia" font-size="18" font-style="italic">Atlantic</text>
  <text x="175" y="465" fill="#3D3733" font-family="Calibri" font-size="14">Mauritania (today)</text>
</svg>`

const climateTimelineSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 350">
  <rect width="1000" height="350" fill="#0D1B2A"/>
  <line x1="60" y1="220" x2="940" y2="220" stroke="#F4EFE6" stroke-width="2"/>
  <g font-family="Calibri" font-size="13" fill="#F4EFE6">
    <line x1="100" y1="220" x2="100" y2="230" stroke="#F4EFE6" stroke-width="1.5"/>
    <text x="100" y="250" text-anchor="middle">15,000 BP</text>
    <line x1="270" y1="220" x2="270" y2="230" stroke="#F4EFE6" stroke-width="1.5"/>
    <text x="270" y="250" text-anchor="middle">12,000 BP</text>
    <line x1="440" y1="220" x2="440" y2="230" stroke="#F4EFE6" stroke-width="1.5"/>
    <text x="440" y="250" text-anchor="middle">9,000 BP</text>
    <line x1="610" y1="220" x2="610" y2="230" stroke="#F4EFE6" stroke-width="1.5"/>
    <text x="610" y="250" text-anchor="middle">6,000 BP</text>
    <line x1="780" y1="220" x2="780" y2="230" stroke="#F4EFE6" stroke-width="1.5"/>
    <text x="780" y="250" text-anchor="middle">3,000 BP</text>
    <line x1="940" y1="220" x2="940" y2="230" stroke="#F4EFE6" stroke-width="1.5"/>
    <text x="940" y="250" text-anchor="middle">today</text>
  </g>
  <rect x="125" y="100" width="535" height="80" fill="#D4A574" opacity="0.75" rx="4"/>
  <text x="392" y="135" text-anchor="middle" fill="#0D1B2A" font-family="Georgia" font-size="20" font-weight="bold">African Humid Period</text>
  <text x="392" y="158" text-anchor="middle" fill="#0D1B2A" font-family="Calibri" font-size="14">Green Sahara — rivers, lakes, elephants, people</text>
  <rect x="220" y="190" width="68" height="22" fill="#C44536" opacity="0.85" rx="3"/>
  <text x="254" y="206" text-anchor="middle" fill="#F4EFE6" font-family="Calibri" font-size="11" font-weight="bold">Younger Dryas</text>
  <line x1="293" y1="60" x2="293" y2="220" stroke="#C44536" stroke-width="3" stroke-dasharray="5 3"/>
  <circle cx="293" cy="60" r="8" fill="#C44536"/>
  <text x="293" y="48" text-anchor="middle" fill="#F4EFE6" font-family="Georgia" font-size="16" font-weight="bold">Plato's date</text>
  <text x="293" y="29" text-anchor="middle" fill="#F4EFE6" font-family="Calibri" font-size="13">~9,600 BC (11,600 BP)</text>
  <text x="500" y="310" text-anchor="middle" fill="#D4A574" font-family="Georgia" font-size="15" font-style="italic">Plato's destruction date sits exactly on the Younger Dryas / Green Sahara transition.</text>
</svg>`

const elevationProfileSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350">
  <rect width="800" height="350" fill="#F4EFE6"/>
  <line x1="40" y1="280" x2="760" y2="280" stroke="#1E3A5F" stroke-width="2"/>
  <text x="50" y="275" fill="#1E3A5F" font-family="Calibri" font-size="13" font-weight="bold">sea level (0 m)</text>
  <rect x="40" y="280" width="120" height="40" fill="#1E3A5F" opacity="0.7"/>
  <text x="100" y="335" text-anchor="middle" fill="#1E3A5F" font-family="Calibri" font-size="13" font-weight="bold">Atlantic</text>
  <path d="M 160 280 L 320 270 L 440 250 L 560 200 L 640 130 L 720 110 L 760 105 L 760 320 L 160 320 Z" fill="#8C6A3E"/>
  <path d="M 560 200 L 640 130 L 720 110 L 760 105 L 760 200 L 560 200 Z" fill="#3D3733"/>
  <g>
    <circle cx="680" cy="118" r="14" fill="none" stroke="#C44536" stroke-width="3"/>
    <circle cx="680" cy="118" r="7" fill="none" stroke="#C44536" stroke-width="2"/>
    <circle cx="680" cy="118" r="3" fill="#C44536"/>
  </g>
  <line x1="40" y1="118" x2="780" y2="118" stroke="#C44536" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>
  <text x="50" y="113" fill="#C44536" font-family="Calibri" font-size="13" font-weight="bold">~400 m (Richat)</text>
  <line x1="40" y1="225" x2="780" y2="225" stroke="#5DADE2" stroke-width="1" stroke-dasharray="3 3" opacity="0.7"/>
  <text x="50" y="220" fill="#5DADE2" font-family="Calibri" font-size="12">~130 m (max post-glacial rise)</text>
  <line x1="160" y1="40" x2="680" y2="40" stroke="#3D3733" stroke-width="1.5"/>
  <line x1="160" y1="35" x2="160" y2="45" stroke="#3D3733" stroke-width="1.5"/>
  <line x1="680" y1="35" x2="680" y2="45" stroke="#3D3733" stroke-width="1.5"/>
  <text x="420" y="30" text-anchor="middle" fill="#3D3733" font-family="Georgia" font-size="16" font-weight="bold">~500 km inland</text>
  <text x="680" y="155" text-anchor="middle" fill="#C44536" font-family="Georgia" font-size="14" font-weight="bold">The Richat</text>
  <text x="720" y="195" text-anchor="middle" fill="#F4EFE6" font-family="Calibri" font-size="12" font-weight="bold">Adrar Plateau</text>
</svg>`

// Big concentric rings for hero / closer slides
function heroRingsSvg(size = 700): string {
  const cx = size / 2, cy = size / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#0D1B2A"/>
    <circle cx="${cx}" cy="${cy}" r="320" fill="none" stroke="#D4A574" stroke-width="1.5" opacity="0.4"/>
    <circle cx="${cx}" cy="${cy}" r="270" fill="none" stroke="#D4A574" stroke-width="2" opacity="0.55"/>
    <circle cx="${cx}" cy="${cy}" r="220" fill="none" stroke="#D4A574" stroke-width="2.5" opacity="0.7"/>
    <circle cx="${cx}" cy="${cy}" r="170" fill="none" stroke="#D4A574" stroke-width="3" opacity="0.85"/>
    <circle cx="${cx}" cy="${cy}" r="120" fill="none" stroke="#D4A574" stroke-width="3.5"/>
    <circle cx="${cx}" cy="${cy}" r="70" fill="none" stroke="#C44536" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="25" fill="#C44536"/>
  </svg>`
}

export function PlatoRings(props: RawProps) {
  return <Raw html={platoRingsSvg(600)} className={props.className} />
}
export function RichatSatellite(props: RawProps) {
  return <Raw html={richatSatelliteSvg(600)} className={props.className} />
}
export function LocatorMap(props: RawProps) {
  return <Raw html={locatorMapSvg} className={props.className} />
}
export function TamanrassettMap(props: RawProps) {
  return <Raw html={tamanrassettMapSvg} className={props.className} />
}
export function ClimateTimeline(props: RawProps) {
  return <Raw html={climateTimelineSvg} className={props.className} />
}
export function ElevationProfile(props: RawProps) {
  return <Raw html={elevationProfileSvg} className={props.className} />
}
export function HeroRings(props: RawProps) {
  return <Raw html={heroRingsSvg(700)} className={props.className} />
}
