"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { inputClass } from "@/components/admin/ui/FormField";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { deleteMediaItem, updateMediaAlt } from "@/app/(admin)/beheer/media/actions";

type ImageSize = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

export type MediaItem = {
  id: string | number;
  alt?: string | null;
  caption?: string | null;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    thumbnail?: ImageSize | null;
    card?: ImageSize | null;
    hero?: ImageSize | null;
  } | null;
};

function formatFilesize(bytes?: number | null): string {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1).replace(".", ",")} MB`;
}

export function MediaLibrary({ items }: { items: MediaItem[] }) {
  return (
    <div>
      <MediaUpload />

      {items.length === 0 ? (
        <p
          style={{
            color: "var(--a-grijs)",
            fontStyle: "italic",
            padding: "1.5rem 0",
          }}
        >
          Nog geen foto's in de bibliotheek. Upload je eerste foto hierboven.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1.1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {items.map((item) => (
            <MediaTile key={String(item.id)} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function MediaTile({ item }: { item: MediaItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [altValue, setAltValue] = useState(item.alt ?? "");
  const [error, setError] = useState<string | null>(null);

  const thumb = item.sizes?.thumbnail?.url || item.url || "";
  const dims =
    item.width && item.height ? `${item.width}×${item.height}` : null;

  function saveAlt() {
    setError(null);
    startTransition(async () => {
      const result = await updateMediaAlt(String(item.id), altValue.trim());
      if (result.ok) {
        setEditing(false);
        router.refresh();
      } else {
        setError(result.error ?? "Opslaan mislukt.");
      }
    });
  }

  function remove() {
    if (!confirm(`Foto "${item.filename ?? item.alt ?? ""}" definitief verwijderen?`)) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteMediaItem(String(item.id));
      if (result.ok) {
        router.refresh();
      } else {
        setError(result.error ?? "Verwijderen mislukt.");
      }
    });
  }

  return (
    <figure
      className="a-media-tile"
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        background: "var(--a-creme)",
        border: "1px solid var(--a-rand)",
        borderRadius: 16,
        overflow: "hidden",
        transition: "transform .15s ease, box-shadow .15s ease",
        opacity: isPending ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 10px 22px rgba(61,20,72,.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div
        style={{
          aspectRatio: "4 / 3",
          background: "#fff",
          borderBottom: "1px solid var(--a-rand)",
          overflow: "hidden",
        }}
      >
        {thumb ? (
          // plain <img> on purpose: avoids next/image loader config in admin
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={item.alt ?? ""}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--a-grijs)",
              fontSize: ".8rem",
            }}
          >
            Geen voorbeeld
          </div>
        )}
      </div>

      <figcaption
        style={{
          padding: ".7rem .8rem .8rem",
          display: "flex",
          flexDirection: "column",
          gap: ".4rem",
          flex: 1,
        }}
      >
        <span
          title={item.filename ?? undefined}
          style={{
            color: "var(--a-paars)",
            fontWeight: 700,
            fontSize: ".88rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.filename ?? "naamloos"}
        </span>

        {editing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
            <input
              className={inputClass}
              value={altValue}
              onChange={(e) => setAltValue(e.target.value)}
              placeholder="Alt-tekst"
              aria-label="Alt-tekst"
              disabled={isPending}
              style={{ fontSize: ".82rem", padding: ".4rem .55rem" }}
            />
            <div style={{ display: "flex", gap: ".4rem" }}>
              <AdminButton size="sm" onClick={saveAlt} disabled={isPending}>
                Opslaan
              </AdminButton>
              <AdminButton
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditing(false);
                  setAltValue(item.alt ?? "");
                  setError(null);
                }}
                disabled={isPending}
              >
                Annuleren
              </AdminButton>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            title="Alt-tekst bewerken"
            style={{
              textAlign: "left",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: item.alt ? "var(--a-grijs)" : "var(--a-oranje)",
              fontSize: ".82rem",
              fontStyle: item.alt ? "normal" : "italic",
            }}
          >
            {item.alt ? item.alt : "alt-tekst toevoegen"}
            <span style={{ color: "var(--a-groen-donker)" }}> · bewerken</span>
          </button>
        )}

        <span style={{ color: "var(--a-grijs)", fontSize: ".75rem" }}>
          {formatFilesize(item.filesize)}
          {dims ? ` · ${dims}` : ""}
        </span>

        {error ? (
          <span style={{ color: "var(--a-danger)", fontSize: ".75rem", fontWeight: 600 }}>
            {error}
          </span>
        ) : null}

        <div style={{ marginTop: "auto", paddingTop: ".4rem" }}>
          <AdminButton size="sm" variant="danger" onClick={remove} disabled={isPending}>
            Verwijderen
          </AdminButton>
        </div>
      </figcaption>
    </figure>
  );
}

export default MediaLibrary;
