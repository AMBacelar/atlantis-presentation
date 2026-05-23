import { TamanrassettMap } from './svgs'

export default function River() {
  return (
    <section className="atl">
      <h2 className="atl-h2">The lost river.</h2>
      <div className="atl-two" style={{ marginTop: '1.5vh' }}>
        <div className="atl-svg-frame" style={{ height: '60vh' }}>
          <TamanrassettMap />
        </div>

        <div className="atl-river-stats">
          <div>
            <p style={{
              fontFamily: 'var(--atl-head)',
              fontWeight: 700,
              color: 'var(--atl-slate)',
              fontSize: 'clamp(1.4rem, 2.3vw, 1.9rem)',
              margin: 0,
            }}>
              The Tamanrasett
            </p>
            <p style={{
              fontFamily: 'var(--atl-body)',
              fontStyle: 'italic',
              color: 'var(--atl-charcoal)',
              fontSize: '0.9rem',
              margin: '0.3rem 0 0',
            }}>
              Buried palaeo-river, confirmed by Japanese PALSAR radar imagery.
              <br/>Skonieczny et al., Nature Communications, 2015.
            </p>
          </div>

          <div>
            <p className="atl-stat__num">500+ km</p>
            <p className="atl-stat__sub">from central Sahara to the Atlantic</p>
          </div>

          <div>
            <p className="atl-stat__num">12th largest</p>
            <p className="atl-stat__sub">drainage basin on Earth, if it still flowed</p>
          </div>

          <p style={{
            fontFamily: 'var(--atl-head)',
            fontStyle: 'italic',
            color: 'var(--atl-slate)',
            fontSize: '1.05rem',
            margin: 0,
          }}>
            Atlanteans didn't need to live on the coast to sail to one.
          </p>
        </div>
      </div>
      <p className="atl-slideline" style={{ position: 'absolute', bottom: '3vh', left: 0, right: 0 }}>
        Where is the water? Buried under the Sahara.
      </p>
    </section>
  )
}
