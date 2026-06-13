import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { payload } from "@/lib/payload";

export type AdminUser = {
  id: string | number;
  email: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
};

/** Returns the currently authenticated user (from the payload-token cookie) or null. */
export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const p = await payload();
    const { user } = await p.auth({ headers: await headers() });
    return (user as AdminUser | null) ?? null;
  } catch (err) {
    console.error("[admin/auth] getCurrentUser failed:", err);
    return null;
  }
}

/**
 * Guard for protected /beheer pages. Call at the top of any page that requires
 * a logged-in user. Redirects to the login page when there is no session.
 * NOTE: the login page must NOT call this (it would loop).
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/beheer/login");
  return user;
}
