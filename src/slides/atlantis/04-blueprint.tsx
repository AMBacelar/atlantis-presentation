import { PlatoRings } from './svgs'

export default function Blueprint() {
  return (
    <section className="atl">
      <h2 className="atl-h2">Plato's blueprint</h2>
      <div className="atl-two" style={{ marginTop: '1.5vh' }}>
        <div>
          <div className="atl-svg-frame" style={{ height: '52vh' }}>
            <PlatoRings />
          </div>
          <p className="atl-caption">Plato's Atlantis, drawn from Critias</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="atl-quote-card">
            <p className="citation">Critias, 113d–114d</p>
            <p className="quote">
              “Around the central hill he built a circle of land and sea, creating two
              rings of land and three of water, all perfectly circular and equidistant
              from each other.”
            </p>
          </div>
          <table className="atl-dim-table">
            <thead>
              <tr>
                <th>Plato says</th>
                <th>Richat measures</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total diameter: 127 stadia (~23.5 km)</td>
                <td>Inner ringed zone: 22–24 km</td>
              </tr>
              <tr>
                <td>Alternating rings of land and water</td>
                <td>Alternating ridges and valleys</td>
              </tr>
              <tr>
                <td>Red, white, black building stone</td>
                <td>Red sandstone, white quartzite, dark basalt</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p className="atl-slideline" style={{ position: 'absolute', bottom: '3vh', left: 0, right: 0 }}>
        He wasn't writing fantasy. He was describing a satellite image before satellites existed.
      </p>
    </section>
  )
}
