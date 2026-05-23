import { LocatorMap } from './svgs'

export default function Where() {
  return (
    <section className="atl">
      <h2 className="atl-h2">Plato told us where to look.</h2>
      <div className="atl-two">
        <div className="atl-quote-card">
          <p className="citation">Timaeus, 24e–25a</p>
          <p className="quote">
            “For the ocean there was at that time navigable; for in front of the mouth
            which you Greeks call the Pillars of Heracles, there lay an island larger
            than Libya and Asia together…”
          </p>
        </div>
        <div className="atl-svg-frame" style={{ height: '70vh' }}>
          <LocatorMap />
        </div>
      </div>
      <p className="atl-slideline" style={{ position: 'absolute', bottom: '3vh', left: '6vw', right: '6vw' }}>
        Beyond the Pillars. Atlantic-facing. Africa is not a reach — it is in the text.
      </p>
    </section>
  )
}
