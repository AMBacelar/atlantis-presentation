import { HeroRings } from './svgs'

export default function Closer() {
  return (
    <section className="atl atl-closer">
      <div className="atl-svg-frame" style={{ height: '80vh' }}>
        <HeroRings />
      </div>

      <div className="atl-closer__lines">
        <p className="atl-closer__lead">
          Atlantis was not lost beneath the Atlantic.
        </p>
        <p className="atl-closer__lead">
          It was stranded in Africa, buried by the Sahara, and left visible only from space.
        </p>

        <div className="atl-closer__hits">
          <p>Plato gave us the description.</p>
          <p>The Egyptians preserved the story.</p>
          <p>NASA accidentally published the evidence.</p>
        </div>

        <p className="atl-closer__q">Questions?</p>
      </div>
    </section>
  )
}
