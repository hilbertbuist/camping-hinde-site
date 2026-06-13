import "server-only";
import nodemailer from "nodemailer";

/**
 * Centrale mail-helper voor De Hinde, gebaseerd op de bestaande mijndomein
 * SMTP-configuratie (zie ook src/app/(frontend)/contact/actions.ts).
 *
 * Vereiste env-variabelen:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM
 *
 * Wanneer er geen SMTP geconfigureerd is (bv. lokale ontwikkeling) wordt de
 * mail enkel gelogd en als "verstuurd" beschouwd, zodat flows niet crashen.
 */

export type SendMailArgs = {
  to: string;
  cc?: string | string[];
  subject: string;
  html: string;
  text?: string;
};

export type SendMailResult = { ok: boolean; skipped?: boolean; error?: string };

export async function sendMail({
  to,
  cc,
  subject,
  html,
  text,
}: SendMailArgs): Promise<SendMailResult> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM ?? `"Boerderijcamping De Hinde" <${user ?? ""}>`;

  if (!host || !user || !pass) {
    console.log("[email — geen SMTP geconfigureerd]", { to, cc, subject });
    return { ok: true, skipped: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      cc,
      subject,
      html,
      text: text ?? stripHtml(html),
    });

    return { ok: true };
  } catch (err) {
    console.error("[email] SMTP-fout:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Versturen mislukt.",
    };
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
