const ROWS: Array<[string, string]> = [
  [
    "It's natural geology, not a built city.",
    "“Of course the foundations are natural. Poseidon used the terrain available. Ancient civilisations didn't have planning permission.”",
  ],
  [
    'No archaeological proof of a city.',
    "“Yet. The Sahara is the world's most aggressive filing cabinet.”",
  ],
  [
    "It's 100 million years old.",
    "“Plato says Poseidon shaped a pre-existing hill. Geology isn't the city — settlement is.”",
  ],
  [
    'Plato says it sank in the Atlantic.',
    "“Mauritania is on the Atlantic. The Tamanrasett carried it to the Atlantic. The text fits.”",
  ],
  [
    'Mainstream scholars say it’s an allegory.',
    "“Mainstream scholars also failed to ask me before forming their conclusion.”",
  ],
  [
    "Dimensions don't perfectly match.",
    "“Transmission error, unit conversion, Egyptian-to-Greek retelling. Pick your weapon.”",
  ],
]

export default function Objections() {
  return (
    <section className="atl">
      <h2 className="atl-h2">Objections you will get.</h2>
      <p style={{
        fontFamily: 'var(--atl-head)',
        fontStyle: 'italic',
        color: 'var(--atl-rust)',
        fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
        margin: '0.3rem 0 1.6rem',
      }}>
        Have these ready.
      </p>

      <table className="atl-obj-table">
        <thead>
          <tr>
            <th style={{ width: '32%' }}>Their move</th>
            <th>Your move</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([move, reply]) => (
            <tr key={move}>
              <td className="move">{move}</td>
              <td className="reply">{reply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
