export default function Desert() {
  return (
    <section className="atl" style={{ paddingBottom: '9vh' }}>
      <div>
        <h2 className="atl-h2" style={{ fontStyle: 'italic' }}>“But it's a desert.”</h2>
        <p style={{
          fontFamily: 'var(--atl-head)',
          color: 'var(--atl-rust)',
          fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
          margin: '0.6rem 0 0',
        }}>
          Yes. Now.
        </p>
      </div>

      <div className="atl-thenow">
        <div className="atl-thenow__card then">
          <span className="badge">THEN</span>
          <span className="when">14,500 – 5,500 years ago</span>
          <span className="title">The African Humid Period</span>
          <ul>
            <li>Grasslands, woodland, permanent lakes</li>
            <li>Hippos, elephants, giraffes, crocodiles</li>
            <li>Rock art across Tassili, Acacus, Cave of Swimmers</li>
            <li>Hunter-gatherers, then pastoralists</li>
          </ul>
        </div>
        <div className="atl-thenow__card now">
          <span className="badge">NOW</span>
          <span className="when">Today</span>
          <span className="title">The Sahara Desert</span>
          <ul>
            <li>9.2 million km² of sand and rock</li>
            <li>AHP onset and end were both abrupt (1–2 centuries)</li>
            <li>Confirmed in ODP-658C marine cores off Mauritania</li>
            <li>Plato's date (9,600 BC) sits inside the green window</li>
          </ul>
        </div>
      </div>

      <p className="atl-slideline" style={{ position: 'absolute', bottom: '3vh', left: '6vw', right: '6vw' }}>
        The Sahara is not what it used to be.
      </p>
    </section>
  )
}
