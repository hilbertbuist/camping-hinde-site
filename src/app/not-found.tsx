import Link from "next/link";

export default function NotFound() {
  return (
    <section className="design-section bg-creme">
      <div className="design-container">
        <div className="mx-auto max-w-2xl flex min-h-[70vh] flex-col items-center justify-center text-center">
          <div
            className="font-serif italic"
            style={{
              color: "var(--oranje)",
              fontSize: "clamp(96px, 16vw, 180px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            404
          </div>
          <span className="section-tag mt-4">Oeps</span>
          <h1 className="section-h mt-2">Hier loopt geen pad meer</h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
            De pagina die je zocht bestaat niet meer of is verhuisd. Misschien helpen deze:
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="design-btn btn-paars">
              Terug naar home
            </Link>
            <Link href="/verblijf" className="design-btn btn-outline">
              Verblijf
            </Link>
            <Link href="/contact" className="design-btn btn-outline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
