import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content/site";

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 4h16c1 0 2 1 2 2v12c0 1-1 2-2 2H4c-1 0-2-1-2-2V6c0-1 1-2 2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.4a4 4 0 1 1-8 .2 4 4 0 0 1 8-.2zM17.5 6.5h0" />
  </svg>
);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="design-footer" id="contact">
      <div className="design-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Image src="/logo.png" alt="De Hinde" width={180} height={110} />
            <p>
              Boerderijcamping op een werkend akkerbouwbedrijf in Dronten,
              Flevoland. Negentien kampeerplekken, drie safaritenten en twee
              houten hutten. Drie generaties boerenleven.
            </p>
            <div className="partners" style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.55)",
                  fontWeight: 600,
                }}
              >
                Aangesloten bij
              </span>
              <a
                href="https://www.inhetgroen.nl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="In het Groen — onze vakorganisatie"
                style={{ display: "inline-block" }}
              >
                <Image
                  src="/in-het-groen-geel.png"
                  alt="In het Groen"
                  width={180}
                  height={60}
                  style={{
                    display: "block",
                    height: 48,
                    width: "auto",
                    background: "transparent",
                    padding: 0,
                    borderRadius: 0,
                  }}
                />
              </a>
            </div>
          </div>

          <div>
            <h5>Verblijf</h5>
            <ul>
              <li>
                <Link href="/kamperen">Kampeerplekken</Link>
              </li>
              <li>
                <Link href="/verblijf/safaritent">Safaritent</Link>
              </li>
              <li>
                <Link href="/verblijf/duolodge">Duolodge</Link>
              </li>
              <li>
                <Link href="/verblijf/hindehut">Hindehut</Link>
              </li>
              <li>
                <Link href="/verblijf/hooiberghut">Hooiberghut</Link>
              </li>
              <li>
                <Link href="/praktisch/tarieven">Tarieven</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5>Boerderij</h5>
            <ul>
              <li>
                <Link href="/boerderij">Ons verhaal</Link>
              </li>
              <li>
                <Link href="/boerderij/dieren">De dieren</Link>
              </li>
              <li>
                <Link href="/boerderij/stalloon">De Stalloon</Link>
              </li>
              <li>
                <Link href="/omgeving">Omgeving</Link>
              </li>
              <li>
                <Link href="/blog">Nieuws</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <div className="footer-contact-line">
              <MapPinIcon />
              {site.address.street}, {site.address.postal} {site.address.city}
            </div>
            <div className="footer-contact-line">
              <PhoneIcon />
              {site.contact.tel}
            </div>
            <div className="footer-contact-line">
              <MailIcon />
              {site.contact.email}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {year} Boerderijcamping De Hinde · KvK {site.kvk}
          </div>
          <div className="footer-socials">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
          <div className="legal">
            <Link href="/privacy">Privacyverklaring</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
