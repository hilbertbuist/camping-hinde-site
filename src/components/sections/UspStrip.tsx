const usps = [
  "Echt werkend boerenbedrijf",
  "Kleinschalig, 19 plekken",
  "Veluwemeer op de fiets",
  "Magisch voor kinderen",
];

export function UspStrip() {
  return (
    <section className="usp" style={{ padding: "22px 0" }}>
      <div className="container">
        <div className="usp-list">
          {usps.map((usp) => (
            <div key={usp} className="usp-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {usp}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
