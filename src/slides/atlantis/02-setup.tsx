type Props = { stage?: number }

/**
 * Staged reveal (4 stages, 0..3):
 *   0 — opener only ("Ladies and gentlemen,")
 *   1 — + "I am not saying Atlantis might be in Mauritania."
 *   2 — + "I am saying" line + first two punch lines (gold)
 *   3 — + final rust punch line ("...and somehow we all agreed to ignore it.")
 *
 * The `.shown` toggle on each element handles the fade/slide in via CSS.
 */
export default function Setup({ stage = 0 }: Props) {
  const cls = (min: number) => (stage >= min ? 'shown' : '')
  return (
    <section className="atl atl-setup">
      <p className={`atl-setup__opener ${cls(0)}`}>Ladies and gentlemen,</p>

      <p className={`atl-setup__line ${cls(1)}`}>
        I am not saying <span className="em">Atlantis</span> might be in Mauritania.
      </p>

      <div className="atl-setup__punch">
        <p className={cls(2)}>I am saying Plato gave us a map,</p>
        <p className={cls(2)}>NASA took the photo,</p>
        <p className={cls(3)}>and somehow we all agreed to ignore it.</p>
      </div>
    </section>
  )
}
