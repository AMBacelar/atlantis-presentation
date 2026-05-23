export default function Catch() {
  return (
    <section className="atl atl-catch">
      <div>
        <h2 className="atl-h2">Now, the hardest catch.</h2>
        <p className="atl-catch__sub">
          The Richat is ~400 m above sea level, 500 km inland.
          Post-Ice-Age sea-level rise was only about 130 m.
        </p>
        <p className="atl-catch__sub atl-catch__sub--em">
          But two details soften it before we even start.
        </p>
      </div>

      <div className="atl-catch__row">
        <div className="atl-catch__vizstack">
          <div className="atl-photo-frame atl-catch__viz">
            <img
              src="/images/richat-3d.jpg"
              alt="3D perspective render of the Richat Structure showing the concentric rings sit in a clear bowl below the surrounding rim plateau"
            />
          </div>
          <div className="atl-photo-frame atl-catch__viz">
            <img
              src="/images/richat-topo.jpg"
              alt="Topographic relief of the Richat Structure showing it sits in a basin lower than the surrounding rim, surrounded by dendritic drainage channels"
            />
          </div>
        </div>

        <div className="atl-catch__answers">
          <p className="atl-catch__points-head">It’s a basin, not a peak.</p>
          <p className="atl-catch__points-body">
            Rim ~500 m, inner floor ~340 m. The rings sit in a <em>bowl</em>,
            ~150 m below the surrounding plateau — not perched on top of it.
          </p>
          <p className="atl-catch__points-head">The landscape was carved by water.</p>
          <p className="atl-catch__points-body">
            Dendritic drainage, dry wadis, the Sebkha Akerdi salt flat — the whole
            region is sculpted by rivers and lakes that aren’t there now.
          </p>
          <p className="atl-catch__points-head atl-catch__points-head--rust">
            Four readings that still work
          </p>
          <ol>
            <li>
              <b>1.</b> Inland capital, coastal empire sank.
              <em>Plato says Atlantis ruled “many islands and parts of the continent.”</em>
            </li>
            <li><b>2.</b> Regional flooding, not ocean rise.</li>
            <li><b>3.</b> 9,000 years of transmission noise.</li>
            <li><b>4.</b> The river dried up. The fertile plain died.</li>
          </ol>
        </div>
      </div>

      <div className="atl-catch__verdict">
        <h3>Pick option 1.</h3>
        <p>
          It is the strongest answer because it requires no translation gymnastics —
          just reading more of Plato’s own text. The capital stays inland.
          The coastal territories sink.
        </p>
      </div>
    </section>
  )
}
