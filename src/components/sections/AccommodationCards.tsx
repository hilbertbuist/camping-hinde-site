import Link from "next/link";

export function AccommodationCards() {
  return (
    <section className="acco design-section" id="verblijf">
      <div className="design-container">
        <div className="section-head-row">
          <div>
            <div className="section-tag">Kies je plek</div>
            <h2 className="section-h">
              <svg className="handarrow" viewBox="0 0 64 18" aria-hidden="true">
                <path d="M2 9 C 14 4, 30 14, 56 8" />
                <path d="M48 3 L 58 8 L 50 13" />
              </svg>
              Slapen onder canvas of in een knus huisje
            </h2>
          </div>
          <p style={{ color: "var(--tekst-grijs)", maxWidth: "420px", fontSize: "16px" }}>
            Vier soorten verblijf, één onvergetelijke vakantie
          </p>
        </div>

        <div className="acco-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          <article className="acco-card">
            <div
              className="acco-img"
              style={{
                backgroundImage:
                  "url('/images/photos/kampeerplek-gruttoveld-met-tent.jpg')",
              }}
            >
              <div className="acco-badge">16 + 3 camperplekken</div>
            </div>
            <div className="acco-body">
              <h3>Kampeerplaats &amp; campers</h3>
              <p>Voor je eigen tent, vouwwagen, caravan of camper. Zestien ruime grasvelden door groen van elkaar gescheiden, plus drie verharde plekken speciaal voor zware campers. Eigen wateraansluiting en 6 ampère stroom op elke plek.</p>
              <div className="acco-foot">
                <div className="acco-price">vanaf <strong>€24</strong> per nacht</div>
                <Link href="/kamperen" className="btn-link">Bekijk de plek <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></Link>
              </div>
            </div>
          </article>

          <article className="acco-card">
            <div
              className="acco-img"
              style={{
                backgroundImage:
                  "url('/images/photos/safaritent-veranda-met-zonsondergang.jpg')",
              }}
            >
              <div className="acco-badge acco-wiggle">Populair bij gezinnen</div>
            </div>
            <div className="acco-body">
              <h3>Safaritent</h3>
              <p>Glamping in een complete tent met houten details en oprolbare voorkant. Eigen toilet, complete keuken, twee slaapcabines voor maximaal zes personen. Twee stuks op het terrein.</p>
              <div className="acco-foot">
                <div className="acco-price">vanaf <strong>€95</strong> per nacht</div>
                <Link href="/verblijf/safaritent" className="btn-link">Reserveer je tent <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></Link>
              </div>
            </div>
          </article>

          <article className="acco-card">
            <div
              className="acco-img"
              style={{
                backgroundImage:
                  "url('/images/photos/Safaritent/safaritent-duolodge-met-open-ingang-en-stoelen.jpg')",
              }}
            >
              <div className="acco-badge">Voor 2 personen</div>
            </div>
            <div className="acco-body">
              <h3>Duolodge</h3>
              <p>Onze kleinere safaritent, ideaal voor stellen of doorreizigers die even tot rust willen komen. Twee eenpersoonsbedden, eigen veranda, comfortabel en compleet.</p>
              <div className="acco-foot">
                <div className="acco-price">vanaf <strong>€65</strong> per nacht</div>
                <Link href="/verblijf/duolodge" className="btn-link">Bekijk de Duolodge <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></Link>
              </div>
            </div>
          </article>

          <article className="acco-card">
            <div
              className="acco-img"
              style={{
                backgroundImage:
                  "url('/images/photos/hindehut-buitenkant-met-vlinderstruik-en-terras.jpg')",
              }}
            >
              <div className="acco-badge">2 hutten</div>
            </div>
            <div className="acco-body">
              <h3>Hindehut &amp; Hooiberghut</h3>
              <p>Twee houten verhuuraccommodaties naast het campingveld, elk met eigen sfeer. Compleet ingericht met keukenblok, zithoek en veranda. Comfort en houten warmte op een rustig plekje.</p>
              <div className="acco-foot">
                <div className="acco-price">vanaf <strong>€75</strong> per nacht</div>
                <Link href="/verblijf/hindehut" className="btn-link">Bekijk de hutten <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg></Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
