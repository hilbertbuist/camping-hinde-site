"use server";

import nodemailer from "nodemailer";
import { site } from "@/lib/content/site";

export type ContactFormState = {
  ok: boolean;
  error?: string;
};

const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function sendContactEmail(
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot — bots fill hidden fields
  if (formData.get("website")) return { ok: true };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const subject = String(formData.get("subject") ?? "Algemene vraag").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Vul alstublieft alle verplichte velden in." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "Vul een geldig e-mailadres in." };
  }
  if (message.length > 5000) {
    return { ok: false, error: "Het bericht is te lang." };
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM ?? `"${site.name}" <${user ?? ""}>`;
  const to = process.env.MAIL_TO ?? site.contact.email;

  // In development without SMTP env vars: log and pretend success.
  if (!host || !user || !pass) {
    console.log("[contact form — no SMTP configured]", {
      name,
      email,
      phone,
      subject,
      message,
    });
    return { ok: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const text = [
      `Naam: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefoon: ${phone}` : null,
      `Onderwerp: ${subject}`,
      "",
      "Bericht:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <h2>Nieuw contactformulier-bericht</h2>
      <p><strong>Naam:</strong> ${escapeHtml(name)}<br>
      <strong>E-mail:</strong> ${escapeHtml(email)}<br>
      ${phone ? `<strong>Telefoon:</strong> ${escapeHtml(phone)}<br>` : ""}
      <strong>Onderwerp:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Bericht:</strong></p>
      <p style="white-space:pre-line">${escapeHtml(message)}</p>
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `[Website] ${subject} — ${name}`,
      text,
      html,
    });

    return { ok: true };
  } catch (err) {
    console.error("[contact form] SMTP error:", err);
    return {
      ok: false,
      error:
        "Er ging iets mis bij het versturen. Probeer het later opnieuw of bel ons direct.",
    };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
