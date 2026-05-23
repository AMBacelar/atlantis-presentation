/**
 * Objections + ready replies. Used by the presenter view (`/present`)
 * as an expandable reference, rather than as a main-flow slide.
 */
export type Objection = { move: string; reply: string }

export const OBJECTIONS: Objection[] = [
  {
    move: "It's natural geology, not a built city.",
    reply: "“Of course the foundations are natural. Poseidon used the terrain available. Ancient civilisations didn't have planning permission.”",
  },
  {
    move: 'No archaeological proof of a city.',
    reply: "“Yet. The Sahara is the world's most aggressive filing cabinet.”",
  },
  {
    move: "It's 100 million years old.",
    reply: "“Plato says Poseidon shaped a pre-existing hill. Geology isn't the city — settlement is.”",
  },
  {
    move: 'Plato says it sank in the Atlantic.',
    reply: "“Mauritania is on the Atlantic. The Tamanrasett carried it to the Atlantic. The text fits.”",
  },
  {
    move: 'Mainstream scholars say it’s an allegory.',
    reply: "“Mainstream scholars also failed to ask me before forming their conclusion.”",
  },
  {
    move: "Dimensions don't perfectly match.",
    reply: "“Transmission error, unit conversion, Egyptian-to-Greek retelling. Pick your weapon.”",
  },
]
