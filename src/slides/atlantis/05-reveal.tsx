type Props = { stage?: number }

/**
 * Two stages:
 *   0 — dry today. ASTER satellite + ESA quote + Richat stats.
 *   1 — flooded +420m. Floodmap render + Plato's "rings of water and land" framing.
 *
 * Both images are stacked and crossfaded via the `.shown` class so the moment
 * lands cinematically when the presenter clicks forward.
 */
export default function Reveal({ stage = 0 }: Props) {
  const flooded = stage >= 1
  return (
    <section className="atl atl-reveal">
      <div className="atl-reveal__quotebox">
        <div className={`atl-reveal__quoteblock ${!flooded ? 'shown' : ''}`}>
          <p className="atl-reveal__quote">
            “Onion-like concentric rings of resistant quartzite ridges and eroded valleys.”
          </p>
          <p className="atl-reveal__cite">— ESA / NASA Earth Observatory</p>
        </div>
        <div className={`atl-reveal__quoteblock ${flooded ? 'shown' : ''}`}>
          <p className="atl-reveal__quote">
            “Two rings of land and three of water… encompassing one another in turn as if with a lathe.”
          </p>
          <p className="atl-reveal__cite">— Plato, Critias 113d</p>
        </div>
      </div>

      <div className="atl-reveal__svg atl-photo-frame atl-reveal__stack">
        <img
          className={`atl-reveal__layer ${!flooded ? 'shown' : ''}`}
          src="/images/richat-satellite.jpg"
          alt="Satellite image of the Richat Structure, Mauritania"
        />
        <img
          className={`atl-reveal__layer ${flooded ? 'shown' : ''}`}
          src="/images/richat-floodmap-420m.jpg"
          alt="Richat Structure with sea level raised 420 m — concentric rings of water and land"
        />
      </div>

      <div className="atl-reveal__meta">
        <div className={`atl-reveal__metablock ${!flooded ? 'shown' : ''}`}>
          <p className="atl-reveal__eyebrow">THE EYE OF THE SAHARA</p>
          <p className="atl-reveal__name">Guelb er Richât</p>
          <p className="atl-reveal__loc">21.11°N, 11.39°W<br/>Mauritania</p>
          <p className="atl-reveal__stat">50 km outer rim</p>
          <p className="atl-reveal__stat">~23 km inner ringed core</p>
          <p className="atl-reveal__stat">Visible from orbit, 1965</p>
        </div>
        <div className={`atl-reveal__metablock ${flooded ? 'shown' : ''}`}>
          <p className="atl-reveal__eyebrow">+420 m SEA LEVEL</p>
          <p className="atl-reveal__name">Plato’s blueprint, drawn in water</p>
          <p className="atl-reveal__loc">Source: floodmap.net<br/>Same coordinates. Same rings.</p>
          <p className="atl-reveal__stat">2 rings of land</p>
          <p className="atl-reveal__stat">3 rings of water</p>
          <p className="atl-reveal__stat">Central island, exactly where he said.</p>
        </div>
      </div>
    </section>
  )
}
