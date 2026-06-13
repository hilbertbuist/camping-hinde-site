/**
 * Minimale root-layout (pass-through).
 *
 * De echte layouts leven in de route-groups:
 *  - (frontend)/layout.tsx  → de publieke website + winkel (html/body, globals.css, fonts, IntlProvider)
 *  - (payload)/layout.tsx   → het Payload admin-paneel (eigen html/body + admin-styling)
 *
 * Door de website-CSS niet meer in de root te importeren, lekt die niet langer
 * in /admin en kan Payload z'n eigen volledige opmaak laden.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
