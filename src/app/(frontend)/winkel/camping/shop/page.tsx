"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShopBrowser } from "@/components/winkel/ShopBrowser";
import type { GuestSession } from "../actions";
import { fetchShopData } from "./load";

type ShopData = Awaited<ReturnType<typeof fetchShopData>>;

export default function CamperShopPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<GuestSession | null>(null);
  const [data, setData] = useState<ShopData | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("hinde:booking");
    if (!raw) {
      router.replace("/winkel/camping");
      return;
    }
    try {
      setBooking(JSON.parse(raw) as GuestSession);
    } catch {
      router.replace("/winkel/camping");
    }
  }, [router]);

  useEffect(() => {
    if (!booking) return;
    fetchShopData().then(setData);
  }, [booking]);

  if (!booking || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-tekst-grijs">Laden...</p>
      </div>
    );
  }

  return (
    <ShopBrowser
      mode="camper"
      categories={data.categories}
      products={data.products}
      booking={booking}
    />
  );
}
