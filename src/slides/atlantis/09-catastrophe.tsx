import { ClimateTimeline } from './svgs'

export default function Catastrophe() {
  return (
    <section className="atl atl-cat">
      <h2 className="atl-h2">
        The catastrophe.
      </h2>

      <p className="atl-cat__quote">
        “In a single day and night of misfortune… the island of Atlantis disappeared in the depths of the sea.”
      </p>
      <p className="atl-cat__cite">— Plato, Timaeus 25c-d</p>

      <div className="atl-svg-frame">
        <ClimateTimeline />
      </div>

      <p className="atl-slideline">
        Plato's date lands exactly on the climate hinge that ended the wet Sahara.
      </p>
    </section>
  )
}
