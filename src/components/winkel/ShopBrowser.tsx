"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Check,
  ArrowLeft,
  Beef,
  Milk,
  Beer,
  Wheat,
  Egg,
  ShoppingBag,
} from "lucide-react";
import { createShopOrder, type CreateOrderResult } from "@/app/(frontend)/winkel/checkout-actions";
import { fetchOpRekeningEnabled } from "@/app/(frontend)/winkel/settings-actions";

type Category = {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  description?: string;
  categoryId: string;
  imageUrl?: string;
};

type CartItem = {
  productId: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
};

type GuestSession = {
  bookingId: string;
  reference: string;
  guestName: string;
  campsiteNumber?: string;
  linked?: boolean;
};

type Props = {
  mode: "passant" | "camper";
  categories: Category[];
  products: Product[];
  booking?: GuestSession;
};

const iconMap: Record<string, typeof ShoppingBag> = {
  beef: Beef,
  milk: Milk,
  beer: Beer,
  wheat: Wheat,
  egg: Egg,
  "shopping-bag": ShoppingBag,
};

export function ShopBrowser({ mode, categories, products, booking }: Props) {
  const router = useRouter();
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    categories[0]?.id ?? null
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [opRekening, setOpRekening] = useState(false);

  useEffect(() => {
    fetchOpRekeningEnabled().then(setOpRekening).catch(() => setOpRekening(false));
  }, []);

  const visibleProducts = useMemo(
    () =>
      activeCategoryId
        ? products.filter((p) => p.categoryId === activeCategoryId)
        : products,
    [products, activeCategoryId]
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === p.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === p.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          productId: p.id,
          name: p.name,
          price: p.price,
          unit: p.unit,
          quantity: 1,
        },
      ];
    });
  };

  const updateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const checkout = (paymentMethod: "mollie" | "tab") => {
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set("type", "shop");
      fd.set("mode", mode);
      fd.set("paymentMethod", paymentMethod);
      fd.set("items", JSON.stringify(cart));
      if (booking) {
        fd.set("bookingId", booking.bookingId);
      }
      const res: CreateOrderResult = await createShopOrder(fd);
      if (res.ok) {
        if (res.redirectUrl) {
          window.location.href = res.redirectUrl;
        } else {
          router.push(`/winkel/bedankt?id=${res.orderId}&method=${paymentMethod}`);
        }
      } else {
        setError(res.error ?? "Er ging iets mis. Probeer het opnieuw.");
      }
    });
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-rand-zacht bg-wit/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-5 py-3">
          <a
            href={mode === "camper" ? "/winkel/camping/menu" : "/winkel"}
            className="inline-flex items-center gap-1.5 text-sm text-tekst-grijs hover:text-tekst-donker"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Terug
          </a>
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "1.2rem",
              color: "var(--paars)",
            }}
          >
            Boerderijwinkel
          </h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative inline-flex h-10 items-center gap-1.5 rounded-pill bg-groen-gras px-4 text-sm font-semibold text-wit transition hover:bg-groen-donker"
            aria-label="Open mandje"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden />
            <span>{itemCount}</span>
          </button>
        </div>

        {/* Category tabs */}
        {categories.length > 0 && (
          <div className="mx-auto max-w-2xl overflow-x-auto px-5 pb-3">
            <ul className="flex gap-2">
              {categories.map((c) => {
                const Icon = iconMap[c.icon ?? "shopping-bag"] ?? ShoppingBag;
                const active = activeCategoryId === c.id;
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => setActiveCategoryId(c.id)}
                      className={`inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-medium transition ${
                        active
                          ? "bg-paars-primair text-wit"
                          : "bg-creme text-tekst-donker hover:bg-rand-zacht"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {c.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>

      {/* Product list */}
      <main className="mx-auto max-w-2xl px-5 py-6">
        {visibleProducts.length === 0 ? (
          <p className="py-12 text-center text-tekst-grijs">
            Geen producten in deze categorie.
          </p>
        ) : (
          <ul className="space-y-3">
            {visibleProducts.map((p) => {
              const inCart = cart.find((i) => i.productId === p.id);
              return (
                <li
                  key={p.id}
                  className="flex items-center gap-4 rounded-card border border-rand-zacht bg-wit p-4 shadow-sm"
                >
                  {p.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-16 w-16 flex-none rounded-xl object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <h3
                      className="truncate text-tekst-donker"
                      style={{
                        fontFamily: "var(--serif)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: "1.05rem",
                      }}
                    >
                      {p.name}
                    </h3>
                    {p.description && (
                      <p className="mt-0.5 truncate text-xs text-tekst-grijs">
                        {p.description}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-semibold text-groen-donker">
                      €{p.price.toFixed(2)}{" "}
                      <span className="font-normal text-tekst-grijs">
                        {labelForUnit(p.unit)}
                      </span>
                    </p>
                  </div>
                  {inCart ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(p.id, -1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-rand-zacht text-tekst-donker"
                        aria-label="Min één"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[1.5rem] text-center font-bold">
                        {inCart.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(p.id, 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-groen-gras text-wit"
                        aria-label="Plus één"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(p)}
                      className="inline-flex items-center gap-1 rounded-pill bg-groen-gras px-4 py-2 text-sm font-semibold text-wit transition hover:bg-groen-donker"
                    >
                      <Plus className="h-4 w-4" aria-hidden />
                      Voeg toe
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </main>

      {/* Cart drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-tekst-donker/40 sm:items-center">
          <div className="w-full max-w-md rounded-t-card bg-wit p-6 shadow-2xl sm:rounded-card">
            <div className="flex items-center justify-between">
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "1.4rem",
                  color: "var(--paars)",
                }}
              >
                Mijn mandje
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-creme"
                aria-label="Sluiten"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="py-10 text-center text-tekst-grijs">
                Nog geen producten. Tik bij een product op &ldquo;Voeg toe&rdquo;.
              </p>
            ) : (
              <>
                <ul className="mt-4 max-h-[40vh] divide-y divide-rand-zacht overflow-y-auto">
                  {cart.map((item) => (
                    <li
                      key={item.productId}
                      className="flex items-center gap-3 py-3"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-tekst-donker">
                          {item.name}
                        </p>
                        <p className="text-sm text-tekst-grijs">
                          €{item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.productId, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-rand-zacht"
                          aria-label="Min"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-groen-gras text-wit"
                          aria-label="Plus"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-between border-t border-rand-zacht pt-4 text-base">
                  <span className="font-medium text-tekst-grijs">Totaal</span>
                  <span className="text-xl font-bold text-tekst-donker">
                    €{total.toFixed(2)}
                  </span>
                </div>

                {/* Confirm checkbox */}
                <label className="mt-5 flex items-start gap-3 rounded-xl border border-rand-zacht bg-creme p-3">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded border-rand-zacht text-groen-donker focus:ring-groen-donker"
                  />
                  <span className="text-sm text-tekst-donker">
                    Ik bevestig dat ik <strong>alle producten</strong> die ik
                    meeneem heb aangeslagen.
                  </span>
                </label>

                {error && (
                  <p className="mt-3 text-sm text-red-700">{error}</p>
                )}

                {/* CTAs */}
                <div className="mt-5 space-y-2">
                  <button
                    onClick={() => checkout("mollie")}
                    disabled={!confirmed || pending || cart.length === 0}
                    className="design-btn btn-groen w-full disabled:opacity-50"
                    style={{ padding: "0.875rem 1.5rem", fontSize: "1rem" }}
                  >
                    {pending ? (
                      "Bezig..."
                    ) : (
                      <>
                        <Check className="h-4 w-4" aria-hidden />
                        Direct betalen (€{total.toFixed(2)})
                      </>
                    )}
                  </button>
                  {opRekening && mode === "camper" && booking?.linked && booking?.bookingId && (
                    <button
                      onClick={() => checkout("tab")}
                      disabled={!confirmed || pending || cart.length === 0}
                      className="design-btn btn-outline w-full disabled:opacity-50"
                      style={{ padding: "0.875rem 1.5rem", fontSize: "1rem" }}
                    >
                      Op rekening zetten
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function labelForUnit(unit: string): string {
  const map: Record<string, string> = {
    stuk: "per stuk",
    pakje: "per pakje",
    fles: "per fles",
    kg: "per kilo",
    "100g": "per 100 g",
    liter: "per liter",
    zes: "per zes",
    twaalf: "per twaalf",
  };
  return map[unit] ?? `per ${unit}`;
}
