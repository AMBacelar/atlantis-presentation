import { HeroRings } from './svgs'

export default function Hook() {
  return (
    <section className="atl atl-hook">
      <div>
        <h1 className="atl-h1 atl-hook__title">ATLANTIS</h1>
        <h2 className="atl-h1 atl-hook__sub">IS IN AFRICA</h2>
        <p className="atl-hook__tag">A presentation in defence of the obvious.</p>
      </div>
      <div className="atl-svg-frame" style={{ height: '80vh' }}>
        <HeroRings />
      </div>
      <p className="atl-hook__byline">Adilson  ·  Games Night</p>
    </section>
  )
}
