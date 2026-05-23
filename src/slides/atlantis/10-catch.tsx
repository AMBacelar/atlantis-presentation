import { ElevationProfile } from './svgs'

export default function Catch() {
  return (
    <section className="atl atl-catch">
      <div>
        <h2 className="atl-h2">Now, the hardest catch.</h2>
        <p style={{
          fontFamily: 'var(--atl-body)',
          color: 'var(--atl-charcoal)',
          fontStyle: 'italic',
          fontSize: '0.95rem',
          margin: '0.4rem 0 0',
        }}>
          The Richat is ~400 m above sea level, 500 km inland.
          Post-Ice-Age sea-level rise was only about 130 m.
        </p>
      </div>

      <div className="atl-catch__row">
        <div className="atl-svg-frame">
          <ElevationProfile />
        </div>

        <div className="atl-catch__answers">
          <p style={{
            fontFamily: 'var(--atl-head)',
            fontWeight: 700,
            color: 'var(--atl-rust)',
            margin: '0 0 0.5rem',
          }}>
            Four readings that work
          </p>
          <ol>
            <li>
              <b>1.</b> Inland capital, coastal empire sank.
              <em>Plato says Atlantis ruled "many islands and parts of the continent."</em>
            </li>
            <li><b>2.</b> Regional flooding, not ocean rise.</li>
            <li><b>3.</b> 9,000 years of transmission noise.</li>
            <li><b>4.</b> The river dried up. The fertile plain died.</li>
          </ol>
        </div>
      </div>

      <div /* row spacer */ />

      <div className="atl-catch__verdict">
        <h3>Pick option 1.</h3>
        <p>
          It is the strongest answer because it requires no translation gymnastics —
          just reading more of Plato's own text. The capital stays inland.
          The coastal territories sink.
        </p>
      </div>
    </section>
  )
}
