import { PlatoRings } from './svgs'

export default function SideBySide() {
  return (
    <section className="atl">
      <h2 className="atl-h2">Side by side.</h2>
      <div className="atl-sbs" style={{ marginTop: '1.5vh' }}>
        <div className="atl-sbs__col">
          <div className="atl-svg-frame">
            <PlatoRings />
          </div>
          <p className="atl-sbs__label">PLATO'S ATLANTIS</p>
          <p className="atl-sbs__caption">23.5 km · concentric rings · central island</p>
        </div>

        <div className="atl-sbs__equals">=</div>

        <div className="atl-sbs__col">
          <div className="atl-photo-frame">
            <img
              src="/images/richat-satellite.jpg"
              alt="Satellite image of the Richat Structure (Guelb er Richât), Mauritania"
            />
          </div>
          <p className="atl-sbs__label">THE RICHAT STRUCTURE</p>
          <p className="atl-sbs__caption">~23 km inner zone · concentric · central core</p>
        </div>
      </div>
    </section>
  )
}
