export default function Reveal() {
  return (
    <section className="atl atl-reveal">
      <div>
        <p className="atl-reveal__quote">
          “Onion-like concentric rings of resistant quartzite ridges and eroded valleys.”
        </p>
        <p className="atl-reveal__cite">— ESA / NASA Earth Observatory</p>
      </div>

      <div className="atl-photo-frame atl-reveal__svg">
        <img
          src="/images/richat-satellite.jpg"
          alt="Satellite image of the Richat Structure (Guelb er Richât), Mauritania"
        />
      </div>

      <div className="atl-reveal__meta">
        <p className="atl-reveal__eyebrow">THE EYE OF THE SAHARA</p>
        <p className="atl-reveal__name">Guelb er Richât</p>
        <p className="atl-reveal__loc">21.11°N, 11.39°W<br/>Mauritania</p>
        <p className="atl-reveal__stat">50 km outer rim</p>
        <p className="atl-reveal__stat">~23 km inner ringed core</p>
        <p className="atl-reveal__stat">Visible from orbit, 1965</p>
      </div>
    </section>
  )
}
