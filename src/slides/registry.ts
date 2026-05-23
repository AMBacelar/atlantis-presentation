import type { ComponentType } from 'react'
import Hook from './atlantis/01-hook'
import Setup from './atlantis/02-setup'
import Where from './atlantis/03-where'
import Blueprint from './atlantis/04-blueprint'
import Reveal from './atlantis/05-reveal'
import SideBySide from './atlantis/06-sidebyside'
import Desert from './atlantis/07-desert'
import River from './atlantis/08-river'
import Catastrophe from './atlantis/09-catastrophe'
import Catch from './atlantis/10-catch'
import Objections from './atlantis/11-objections'
import Closer from './atlantis/12-closer'

export type SlideTheme = 'dark' | 'light'

export type Slide = {
  id: string
  title: string
  /** Short on-stage notes that fit comfortably on a phone. */
  notes: string
  /** Longer source-material disclosure (rendered in <details> on the presenter view). */
  details?: string
  /** Background theme for the display view. */
  theme: SlideTheme
  /**
   * Number of stages this slide has. 1 (or undefined) = no progressive reveal —
   * pressing next moves to the next slide. >1 lets the presenter step through
   * stages 0..stages-1 before advancing.
   */
  stages?: number
  /** Slides that accept a `stage` prop opt in via `ComponentType<{ stage?: number }>`. */
  Component: ComponentType<{ stage?: number }>
}

export const slides: Slide[] = [
  {
    id: 'hook',
    title: 'Hook · Atlantis Is In Africa',
    theme: 'dark',
    notes:
      'Let the title sit. Wait two beats before clicking. Tone: confident, slightly amused.',
    details:
      'Premise: Plato’s Atlantis is the Richat Structure (Eye of the Sahara) in Mauritania. ' +
      'Frame the whole talk as "I am defending the obvious."',
    Component: Hook,
  },
  {
    id: 'setup',
    title: 'The Setup',
    theme: 'dark',
    stages: 4,
    notes:
      'Stage 0: "Ladies and gentlemen,". Stage 1: I-am-not-saying line. Stage 2: the two gold lines (map + photo). Stage 3: the rust punchline. ' +
      'Slow down for the punchline.',
    details:
      'Opening line (verbatim): "Ladies and gentlemen, I am not saying Atlantis might be in Mauritania. ' +
      'I am saying Plato gave us a map, NASA took the photo, and somehow we all agreed to ignore it." ' +
      'The 4 stages match the four breaths: opener, deflection, claim, accusation.',
    Component: Setup,
  },
  {
    id: 'where',
    title: 'Plato Told Us Where',
    theme: 'light',
    notes:
      'Read the Timaeus quote out loud — it’s short. Land the slide line: "beyond the Pillars" is Atlantic, west of Gibraltar, which means Africa.',
    details:
      'Plato (Timaeus 24e–25a): "For the ocean there was at that time navigable; for in front of the mouth which you Greeks call the Pillars of Heracles, ' +
      'there lay an island larger than Libya and Asia together…" — Pillars of Heracles = Strait of Gibraltar. ' +
      '"Libya" in Plato = North Africa west of Egypt. "Asia" = Asia Minor. Beyond the Pillars = Atlantic-facing Africa.',
    Component: Where,
  },
  {
    id: 'blueprint',
    title: 'The Blueprint',
    theme: 'light',
    notes:
      'Hold up the diagram. Then run the table row by row. Land the punch: "He was describing a satellite image before satellites existed."',
    details:
      'Critias 113d–114d: concentric rings, 2 land + 3 water. Critias 115a-b: total diameter 127 stadia ≈ 23.5 km. ' +
      'Inner ringed zone of the Richat measures 22–24 km on Google Earth. ' +
      'Plato also mentions: oblong plain to the south, mountains to the north, red/white/black stone, hot+cold springs, elephants, orichalcum.',
    Component: Blueprint,
  },
  {
    id: 'reveal',
    title: 'The Reveal · Richat',
    theme: 'dark',
    notes:
      'Just let the image breathe. ESA quote on the left, stats on the right. 50 km outer rim, 23 km inner, first photographed from orbit in 1965.',
    details:
      'Officially Guelb er Richât. Adrar Plateau, Mauritania, 21.11°N, 11.39°W. ' +
      'Outer diameter 40–50 km. Inner ringed zone ~23 km. Elevation ~400 m. ' +
      'Origin: eroded structural dome (anticline) over an igneous intrusion, ~100 Myr old (Cretaceous). ' +
      'First space photo: Gemini IV, June 1965. IUGS: one of 100 sites of highest scientific geological value.',
    Component: Reveal,
  },
  {
    id: 'sidebyside',
    title: 'Side by Side',
    theme: 'light',
    notes:
      'Don’t over-explain. The equals sign does the work. Let people stare for a beat.',
    details:
      'Match: concentric geometry, ~23 km diameter, alternating ridge/valley, red/white/black stone, ' +
      'south-facing plain, mountains to the north, freshwater spring persists, destroyed ~9600 BC ≈ Younger Dryas. ' +
      'Suggestive: Plato’s first king Atlas; Berber Mauretania had a king Atlas; Herodotus places the "Atlantes" in West Africa.',
    Component: SideBySide,
  },
  {
    id: 'desert',
    title: '"But it\'s a desert" — Green Sahara',
    theme: 'light',
    notes:
      'This is the moment most of the audience does NOT know about. Slow down. ' +
      'African Humid Period: 14,500 to 5,500 BP. Plato’s date sits inside it.',
    details:
      'AHP driven by orbital forcing. Sahara had grasslands, woodlands, permanent lakes, hippos, elephants, giraffes, crocodiles. ' +
      'Lake Chad expanded many times. Rock art at Tassili n’Ajjer, Acacus, Cave of Swimmers. ' +
      'Onset and termination both abrupt (1–2 centuries). Confirmed in ODP-658C marine cores off Mauritania.',
    Component: Desert,
  },
  {
    id: 'river',
    title: 'The Lost River · Tamanrasett',
    theme: 'light',
    notes:
      'The single most under-discussed piece of evidence. Skonieczny et al, Nature Comms 2015, found via Japanese PALSAR radar. ' +
      'Land "Atlanteans didn’t need to live on the coast to sail to one."',
    details:
      'Tamanrasett paleo-river: 500+ km from central Sahara to the Mauritanian coast. ' +
      'Drained the Atlas and Hoggar mountains. Exited via the Cap Timiris submarine canyon (3 km deep, 2.5 km wide). ' +
      'Would today rank as the 12th largest river system on Earth by drainage basin. ' +
      'Active during humid periods including the early Holocene. Lower reaches now the Khatt Atui wadi.',
    Component: River,
  },
  {
    id: 'catastrophe',
    title: 'The Catastrophe · Younger Dryas',
    theme: 'dark',
    notes:
      'Read the Plato quote, then point to the timeline. Plato’s "single day and night" lands on the Younger Dryas / Green Sahara hinge.',
    details:
      'Younger Dryas: abrupt cold reversal ~12,900 to ~11,700 BP. Brief Sahara dry-out, sea level fluctuations, catastrophic meltwater discharge. ' +
      'Plato’s 9,600 BC (~11,600 BP) is right at the end of the YD. ' +
      'Younger Dryas Impact Hypothesis (Firestone, Kennett et al.) — contested but peer-reviewed; mention as "actively debated," not fact.',
    Component: Catastrophe,
  },
  {
    id: 'catch',
    title: 'The Hardest Catch',
    theme: 'light',
    notes:
      'The honest counter. ~400 m elevation, 500 km inland; post-Ice-Age rise was only ~130 m. ' +
      'Walk the 4 readings, then pick option 1: inland capital + drowned coastal empire.',
    details:
      'Four defensible readings:\n' +
      '1. Inland capital, coastal empire sank (Plato: "dominion over many islands and parts of the continent")\n' +
      '2. Regional flooding from AHP collapse — "swallowed" in the broader sense\n' +
      '3. Transmission/translation noise over 9,000 years\n' +
      '4. The Tamanrasett dried up; the fertile plain became uninhabitable\n\n' +
      'Pick option 1 if pressed — it needs no translation gymnastics, just more of Plato’s own text.',
    Component: Catch,
  },
  {
    id: 'objections',
    title: 'Objections · Have These Ready',
    theme: 'light',
    notes:
      'Don’t read every row. Let people pick. Be ready to deliver the deflections in character — they’re punchlines.',
    details:
      'Top deflections:\n' +
      '• Natural geology: "Of course — Poseidon used the terrain available."\n' +
      '• No archaeology: "Yet. The Sahara is the world’s most aggressive filing cabinet."\n' +
      '• 100 Myr old: "Plato says Poseidon shaped a pre-existing hill."\n' +
      '• Sank in Atlantic: "Mauritania is on the Atlantic. The Tamanrasett ran to the Atlantic."\n' +
      '• Allegory: "Mainstream scholars also failed to ask me before forming their conclusion."\n' +
      '• Dimensions off: "Transmission error, unit conversion, Egyptian-to-Greek retelling — pick your weapon."',
    Component: Objections,
  },
  {
    id: 'closer',
    title: 'The Closer',
    theme: 'dark',
    notes:
      'Slow. Hit the three lines like a kick drum: description, story, evidence. Then "Questions?" — wait.',
    details:
      'Closer (verbatim):\n' +
      '"Atlantis was not lost beneath the Atlantic. It was stranded in Africa, buried by the Sahara, and left visible only from space.\n' +
      'Plato gave us the description. The Egyptians preserved the story. NASA accidentally published the evidence."',
    Component: Closer,
  },
]
