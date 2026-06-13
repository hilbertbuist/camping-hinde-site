import type { ReactNode } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { getCurrentUser } from "@/lib/admin/auth";
import "./admin-theme.css";

/**
 * Admin root layout — fully isolated from the website.
 *
 * - Owns its own <html>/<body> (route group has no shared root layout that
 *   provides them) and loads ONLY admin-theme.css (never the site globals.css).
 *
 * AUTH MODEL (read carefully, module agents):
 * - This layout does NOT redirect. Each protected page calls `requireAdmin()`
 *   at its top, which redirects to /beheer/login when there is no session.
 * - The login page (/beheer/login) must NOT call requireAdmin (it lives under
 *   this same layout — gating here would create a redirect loop).
 * - The sidebar/shell only renders when a user is logged in. The login page is
 *   reached when logged out, so it renders standalone (centered card) without a
 *   sidebar. This is purely cosmetic — real protection is `requireAdmin()` per
 *   page. A logged-in user visiting /beheer/login still sees the shell wrapper;
 *   that's acceptable.
 */

const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&family=Caveat:wght@400;600;700&display=swap";

export const metadata = {
  title: "Beheer · Boerderijcamping De Hinde",
};

// Het beheerpaneel leest altijd de ingelogde gebruiker (cookies/headers) en
// live data uit Payload — nooit statisch prerenderen. Geldt voor alle /beheer-routes.
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>
        {user ? (
          <div className="admin-shell">
            <Sidebar userName={user.name} userRole={user.role} />
            <main className="admin-main">{children}</main>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
