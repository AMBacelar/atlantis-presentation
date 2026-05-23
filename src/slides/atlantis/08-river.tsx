import { TamanrassettMap } from './svgs'

export default function River() {
  return (
    <section className="atl">
      <h2 className="atl-h2">The lost river.</h2>
      <div className="atl-two">
        <div className="atl-svg-frame" style={{ height: '72vh' }}>
          <TamanrassettMap />
        </div>

        <div className="atl-river-stats">
          <div>
            <p style={{
              fontFamily: 'var(--atl-head)',
              fontWeight: 700,
              color: 'var(--atl-slate)',
              fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              The Tamanrasett
            </p>
            <p style={{
              fontFamily: 'var(--atl-body)',
              fontStyle: 'italic',
              color: 'var(--atl-charcoal)',
              fontSize: '1.05rem',
              margin: '0.5rem 0 0',
              lineHeight: 1.5,
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
            fontSize: 'clamp(1.15rem, 1.5vw, 1.4rem)',
            margin: 0,
            lineHeight: 1.4,
          }}>
            Atlanteans didn't need to live on the coast to sail to one.
          </p>
        </div>
      </div>
      <p className="atl-slideline" style={{ position: 'absolute', bottom: '3vh', left: '6vw', right: '6vw' }}>
        Where is the water? Buried under the Sahara.
      </p>
    </section>
  )
}
