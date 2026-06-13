"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { payload } from "@/lib/payload";

export type LoginResult = { ok: boolean; error?: string };

/**
 * Authenticate against the Payload `users` collection and set the
 * `payload-token` httpOnly cookie. Returns a serializable result so the
 * client login form can show errors / redirect on success.
 */
export async function loginAction(formData: FormData): Promise<LoginResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, error: "Vul je e-mailadres en wachtwoord in." };
  }

  try {
    const p = await payload();
    const result = await p.login({
      collection: "users",
      data: { email, password },
    });

    if (!result?.token) {
      return { ok: false, error: "Inloggen mislukt. Probeer het opnieuw." };
    }

    (await cookies()).set("payload-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { ok: true };
  } catch {
    return { ok: false, error: "Onjuist e-mailadres of wachtwoord." };
  }
}

/** Clear the session cookie and return to the login page. */
export async function logoutAction(): Promise<void> {
  (await cookies()).delete("payload-token");
  redirect("/beheer/login");
}
