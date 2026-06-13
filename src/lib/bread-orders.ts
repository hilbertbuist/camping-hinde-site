import "server-only";
import { payload } from "@/lib/payload";
import { sendMail } from "@/lib/email";

/**
 * Verzamelen + mailen van de dagelijkse broodjesbestellingen.
 *
 * Flow:
 *  1. collectBreadOrdersForDate(date) → groepeert alle broodjesbestellingen voor
 *     een dag per leverancier (via broodje → supplier).
 *  2. buildSupplierEmailHtml(...) → bouwt een nette HTML-mail per leverancier.
 *  3. sendSupplierOrders(date) → stuurt voor elke ACTIEVE leverancier de mail
 *     (ook "geen bestellingen" wanneer er niets is), met CC naar de eigenaar.
 */

// --- Kleuren (De Hinde) ---
const PURPLE = "#5b3a8c";
const GREEN = "#4a7c3f";
const INK = "#2b2b2b";
const SOFT = "#6b6b6b";
const LINE = "#e2e2e2";

const NO_SUPPLIER_ID = "__geen__";
const NO_SUPPLIER_NAME = "Overig / geen leverancier";

// --- Types ---
type Supplier = {
  id: string;
  name: string;
  email: string;
  ccOwner?: boolean;
  active?: boolean;
};

type BreadItemDoc = {
  id: string;
  name?: string;
  supplier?: Supplier | string | null;
};

type OrderBreadLine = {
  item?: BreadItemDoc | string | null;
  quantity?: number;
  name?: string;
};

type Booking = {
  id: string;
  reference?: string;
  guestName?: string;
  campsiteNumber?: string;
};

type OrderDoc = {
  id: string;
  type?: string;
  deliveryDate?: string | null;
  booking?: Booking | string | null;
  breadItems?: OrderBreadLine[];
  guestNote?: string;
};

/** Eén regel in de "per bestelling"-weergave. */
export type SupplierOrderLine = {
  name: string;
  quantity: number;
};

/** Eén bestelling van één plek/gast. */
export type SupplierOrderGroup = {
  orderId: string;
  reference?: string;
  guestName?: string;
  campsiteNumber?: string;
  note?: string;
  lines: SupplierOrderLine[];
};

/** Alle gegevens voor de mail aan één leverancier. */
export type SupplierOrderData = {
  supplierId: string;
  supplierName: string;
  /** Totaal per product over alle bestellingen heen. */
  totals: SupplierOrderLine[];
  /** Individuele bestellingen per plek/gast. */
  orders: SupplierOrderGroup[];
  /** Totaal aantal broodjes (alle producten samen). */
  itemCount: number;
};

export type CollectResult = {
  date: Date;
  suppliers: SupplierOrderData[];
};

// --- Hulpfuncties ---

/** Begin- en einddatum (UTC) van de dag waarin `date` valt. */
function dayBounds(date: Date): { start: string; end: string } {
  const start = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0),
  );
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start: start.toISOString(), end: end.toISOString() };
}

function resolveSupplier(item: BreadItemDoc | string | null | undefined): {
  id: string;
  name: string;
} {
  if (item && typeof item === "object") {
    const sup = item.supplier;
    if (sup && typeof sup === "object" && sup.id) {
      return { id: String(sup.id), name: sup.name ?? "Onbekende leverancier" };
    }
  }
  return { id: NO_SUPPLIER_ID, name: NO_SUPPLIER_NAME };
}

/**
 * Verzamelt en groepeert alle broodjesbestellingen voor de gegeven dag,
 * per leverancier.
 */
export async function collectBreadOrdersForDate(date: Date): Promise<CollectResult> {
  const p = await payload();
  const { start, end } = dayBounds(date);

  const result = await p.find({
    collection: "orders" as any,
    where: {
      and: [
        { type: { equals: "bread" } },
        { deliveryDate: { greater_than_equal: start } },
        { deliveryDate: { less_than: end } },
      ],
    },
    // depth 2: order → breadItems.item (bread-item) → supplier
    depth: 2,
    limit: 1000,
    sort: "createdAt",
  });

  const orders = result.docs as OrderDoc[];

  // Per leverancier: naam + totalen-map + lijst van bestellingen.
  const bySupplier = new Map<
    string,
    {
      name: string;
      totals: Map<string, { name: string; quantity: number }>;
      orders: SupplierOrderGroup[];
    }
  >();

  for (const order of orders) {
    const booking =
      order.booking && typeof order.booking === "object" ? order.booking : null;

    // Groepeer de regels van deze bestelling per leverancier, zodat één
    // bestelling die producten van meerdere leveranciers bevat netjes wordt
    // gesplitst per leverancier.
    const linesPerSupplier = new Map<
      string,
      { supplierName: string; lines: SupplierOrderLine[] }
    >();

    for (const line of order.breadItems ?? []) {
      const qty = Number(line.quantity ?? 0) || 0;
      if (qty <= 0) continue;

      const itemDoc =
        line.item && typeof line.item === "object" ? line.item : null;
      const productName = line.name || itemDoc?.name || "Onbekend broodje";
      const { id: supId, name: supName } = resolveSupplier(line.item);

      // Per-bestelling regels
      let perOrder = linesPerSupplier.get(supId);
      if (!perOrder) {
        perOrder = { supplierName: supName, lines: [] };
        linesPerSupplier.set(supId, perOrder);
      }
      const existingLine = perOrder.lines.find((l) => l.name === productName);
      if (existingLine) existingLine.quantity += qty;
      else perOrder.lines.push({ name: productName, quantity: qty });

      // Totalen per leverancier
      let bucket = bySupplier.get(supId);
      if (!bucket) {
        bucket = { name: supName, totals: new Map(), orders: [] };
        bySupplier.set(supId, bucket);
      }
      const totalLine = bucket.totals.get(productName);
      if (totalLine) totalLine.quantity += qty;
      else bucket.totals.set(productName, { name: productName, quantity: qty });
    }

    // Voeg de per-bestelling-groepen toe aan de juiste leverancier.
    for (const [supId, data] of linesPerSupplier) {
      let bucket = bySupplier.get(supId);
      if (!bucket) {
        bucket = { name: data.supplierName, totals: new Map(), orders: [] };
        bySupplier.set(supId, bucket);
      }
      bucket.orders.push({
        orderId: String(order.id),
        reference: booking?.reference,
        guestName: booking?.guestName,
        campsiteNumber: booking?.campsiteNumber,
        note: order.guestNote,
        lines: data.lines,
      });
    }
  }

  const suppliers: SupplierOrderData[] = [];
  for (const [supId, bucket] of bySupplier) {
    const totals = Array.from(bucket.totals.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "nl"),
    );
    const itemCount = totals.reduce((sum, t) => sum + t.quantity, 0);
    suppliers.push({
      supplierId: supId,
      supplierName: bucket.name,
      totals,
      orders: bucket.orders,
      itemCount,
    });
  }

  return { date, suppliers };
}

// --- E-mail HTML ---

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDateNl(date: Date): string {
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

const FONT = "font-family:Arial,Helvetica,sans-serif;";

function emailShell(title: string, dateLabel: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="nl">
<body style="margin:0;padding:0;background:#f5f3ef;${FONT}">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <div style="background:#ffffff;border:1px solid ${LINE};border-radius:12px;overflow:hidden;">
      <div style="background:${PURPLE};padding:20px 24px;">
        <div style="color:#ffffff;font-size:18px;font-weight:bold;${FONT}">Boerderijcamping De Hinde</div>
        <div style="color:#e7defa;font-size:13px;margin-top:2px;${FONT}">${escapeHtml(title)}</div>
      </div>
      <div style="padding:24px;color:${INK};${FONT}">
        <p style="margin:0 0 16px;color:${SOFT};font-size:14px;">Bezorgdag: <strong style="color:${INK};">${escapeHtml(dateLabel)}</strong></p>
        ${body}
      </div>
      <div style="padding:16px 24px;border-top:1px solid ${LINE};color:${SOFT};font-size:12px;${FONT}">
        Deze bestelmail is automatisch verstuurd door het beheersysteem van De Hinde.
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Bouwt de HTML-mail voor één leverancier. Wanneer `data` geen bestellingen
 * bevat (of null is) wordt de "Geen bestellingen"-variant teruggegeven.
 */
export function buildSupplierEmailHtml(
  supplierName: string,
  data: SupplierOrderData | null,
  date: Date = new Date(),
): string {
  const dateLabel = formatDateNl(date);

  if (!data || data.orders.length === 0 || data.itemCount === 0) {
    const body = `
      <p style="margin:0 0 8px;font-size:15px;">Beste ${escapeHtml(supplierName)},</p>
      <p style="margin:0 0 8px;font-size:15px;">Er zijn vandaag <strong>geen bestellingen</strong> voor de bezorgdag hierboven.</p>
      <p style="margin:16px 0 0;color:${SOFT};font-size:14px;">Geen bestellingen voor vandaag.</p>
    `;
    return emailShell("Broodjesbestelling", dateLabel, body);
  }

  // Totaaloverzicht
  const totalRows = data.totals
    .map(
      (t) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid ${LINE};font-size:14px;">${escapeHtml(t.name)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid ${LINE};font-size:14px;text-align:right;font-weight:bold;">${t.quantity}</td>
        </tr>`,
    )
    .join("");

  const totalTable = `
    <h2 style="margin:0 0 8px;font-size:16px;color:${PURPLE};">Totaaloverzicht</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${LINE};border-radius:8px;overflow:hidden;margin-bottom:24px;">
      <thead>
        <tr style="background:#f3eefb;">
          <th align="left" style="padding:8px 12px;font-size:13px;color:${PURPLE};">Product</th>
          <th align="right" style="padding:8px 12px;font-size:13px;color:${PURPLE};">Aantal</th>
        </tr>
      </thead>
      <tbody>
        ${totalRows}
        <tr style="background:#faf8f4;">
          <td style="padding:8px 12px;font-size:14px;font-weight:bold;">Totaal</td>
          <td style="padding:8px 12px;font-size:14px;font-weight:bold;text-align:right;color:${GREEN};">${data.itemCount}</td>
        </tr>
      </tbody>
    </table>
  `;

  // Per bestelling
  const orderBlocks = data.orders
    .map((o, idx) => {
      const who =
        o.campsiteNumber || o.guestName || o.reference || `Bestelling ${idx + 1}`;
      const sub = [o.guestName, o.reference]
        .filter(Boolean)
        .map((s) => escapeHtml(String(s)))
        .join(" · ");
      const lineRows = o.lines
        .map(
          (l) => `
            <tr>
              <td style="padding:6px 12px;border-bottom:1px solid ${LINE};font-size:14px;">${escapeHtml(l.name)}</td>
              <td style="padding:6px 12px;border-bottom:1px solid ${LINE};font-size:14px;text-align:right;font-weight:bold;">${l.quantity}</td>
            </tr>`,
        )
        .join("");
      const noteRow = o.note
        ? `<tr><td colspan="2" style="padding:6px 12px;font-size:13px;color:${SOFT};font-style:italic;">Opmerking: ${escapeHtml(o.note)}</td></tr>`
        : "";
      return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${LINE};border-radius:8px;overflow:hidden;margin-bottom:14px;">
          <thead>
            <tr style="background:#eef5ec;">
              <th align="left" colspan="2" style="padding:8px 12px;font-size:14px;color:${GREEN};">
                Plek/gast: ${escapeHtml(String(who))}${sub ? `<span style="color:${SOFT};font-weight:normal;font-size:12px;"> &nbsp;${sub}</span>` : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            ${lineRows}
            ${noteRow}
          </tbody>
        </table>`;
    })
    .join("");

  const perOrder = `
    <h2 style="margin:0 0 8px;font-size:16px;color:${PURPLE};">Per bestelling</h2>
    ${orderBlocks}
  `;

  const body = `
    <p style="margin:0 0 16px;font-size:15px;">Beste ${escapeHtml(supplierName)},</p>
    <p style="margin:0 0 20px;font-size:15px;">Hieronder de broodjesbestelling voor de bezorgdag hierboven.</p>
    ${totalTable}
    ${perOrder}
  `;

  return emailShell("Broodjesbestelling", dateLabel, body);
}

// --- Versturen ---

export type SendSummaryItem = {
  supplier: string;
  email?: string;
  sent: boolean;
  itemCount: number;
  error?: string;
};

/**
 * Verstuurt voor elke ACTIEVE leverancier de bestelmail voor `date`.
 * Leveranciers zonder bestellingen krijgen alsnog een "geen bestellingen"-mail.
 */
export async function sendSupplierOrders(date: Date): Promise<SendSummaryItem[]> {
  const p = await payload();
  const dateLabel = formatDateNl(date);

  const [collected, supplierResult] = await Promise.all([
    collectBreadOrdersForDate(date),
    p.find({
      collection: "suppliers" as any,
      where: { active: { equals: true } },
      limit: 1000,
    }),
  ]);

  const suppliers = supplierResult.docs as Supplier[];
  const ownerEmail = process.env.OWNER_EMAIL;

  const byId = new Map<string, SupplierOrderData>();
  for (const s of collected.suppliers) byId.set(s.supplierId, s);

  const summary: SendSummaryItem[] = [];

  for (const supplier of suppliers) {
    const data = byId.get(String(supplier.id)) ?? null;
    const itemCount = data?.itemCount ?? 0;
    const html = buildSupplierEmailHtml(supplier.name, data, date);
    const subject = data
      ? `Broodjesbestelling — ${dateLabel}`
      : `Geen bestellingen — ${dateLabel}`;

    const cc = supplier.ccOwner && ownerEmail ? ownerEmail : undefined;

    const res = await sendMail({
      to: supplier.email,
      cc,
      subject,
      html,
    });

    summary.push({
      supplier: supplier.name,
      email: supplier.email,
      sent: res.ok,
      itemCount,
      error: res.error,
    });
  }

  return summary;
}
