"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Croissant,
  ShoppingBag,
  Tent,
  Image as ImageIcon,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { logoutAction } from "@/app/(admin)/beheer/login/actions";

type NavItem = { label: string; href: string; icon: LucideIcon };
type NavGroup = { title?: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
  {
    items: [{ label: "Dashboard", href: "/beheer", icon: LayoutDashboard }],
  },
  {
    title: "Winkel",
    items: [
      { label: "Producten", href: "/beheer/producten", icon: Package },
      { label: "Categorieën", href: "/beheer/categorieen", icon: FolderTree },
      { label: "Broodjes", href: "/beheer/broodjes", icon: Croissant },
      { label: "Bestellingen", href: "/beheer/bestellingen", icon: ShoppingBag },
    ],
  },
  {
    title: "Camping",
    items: [{ label: "Boekingen", href: "/beheer/boekingen", icon: Tent }],
  },
  {
    title: "Beheer",
    items: [
      { label: "Media", href: "/beheer/media", icon: ImageIcon },
      { label: "Instellingen", href: "/beheer/instellingen", icon: Settings },
    ],
  },
];

type SidebarProps = {
  userName?: string;
  userRole?: string;
};

function isActive(pathname: string, href: string): boolean {
  if (href === "/beheer") return pathname === "/beheer";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ userName, userRole }: SidebarProps) {
  const pathname = usePathname() ?? "";
  const initial = (userName ?? "?").trim().charAt(0).toUpperCase() || "?";

  return (
    <aside className="admin-sidebar">
      <Link href="/beheer" className="admin-sidebar__brand">
        <Image
          src="/logo.png"
          alt="Boerderijcamping De Hinde"
          width={1181}
          height={721}
          className="admin-sidebar__logo"
          priority
        />
        <span className="admin-sidebar__brand-sub">beheer</span>
      </Link>

      <nav className="admin-sidebar__nav">
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.title ?? `g${gi}`} className="admin-nav-group">
            {group.title && <span className="admin-nav-group__title">{group.title}</span>}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-item${active ? " admin-nav-item--active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon strokeWidth={2} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <div className="admin-sidebar__user">
          <span className="admin-sidebar__avatar">{initial}</span>
          <span className="admin-sidebar__user-text">
            <span className="admin-sidebar__user-name">{userName ?? "Beheerder"}</span>
            <span className="admin-sidebar__user-role">
              {userRole === "staff" ? "Personeel" : "Beheerder"}
            </span>
          </span>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="admin-logout">
            <LogOut strokeWidth={2} />
            Uitloggen
          </button>
        </form>
      </div>
    </aside>
  );
}

export default Sidebar;
