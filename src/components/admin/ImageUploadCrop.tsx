"use client";

import { useRef, useState } from "react";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Upload, Crop as CropIcon, X, ImagePlus } from "lucide-react";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { uploadImage } from "@/app/(admin)/beheer/media/actions";

export type MediaOption = { id: string; label: string; url?: string };

type Props = {
  /** form field name for the linked media id (e.g. "image") */
  name: string;
  initialId?: string | null;
  initialUrl?: string | null;
  /** existing media to optionally pick from */
  mediaOptions?: MediaOption[];
};

type AspectKey = "vrij" | "1" | "43";
const ASPECTS: { key: AspectKey; label: string; value?: number }[] = [
  { key: "vrij", label: "Vrij", value: undefined },
  { key: "43", label: "Liggend 4:3", value: 4 / 3 },
  { key: "1", label: "Vierkant", value: 1 },
];

function toBlobAsync(canvas: HTMLCanvasElement, type: string, q: number): Promise<Blob | null> {
  return new Promise((res) => canvas.toBlob((b) => res(b), type, q));
}

type PercentRect = { x: number; y: number; width: number; height: number };

/**
 * Snijdt de afbeelding bij op de gekozen uitsnede (in %) en exporteert
 * geoptimaliseerd. Rekent met de NATUURLIJKE afmetingen, zodat het niet afhangt
 * van hoe groot de afbeelding op het scherm wordt getoond. Probeert WebP
 * (kleiner) en valt terug op JPEG als de browser geen WebP-export kan.
 */
async function getCroppedBlob(
  image: HTMLImageElement,
  pct: PercentRect,
  maxWidth = 1600,
): Promise<{ blob: Blob; ext: string; mime: string }> {
  const nw = image.naturalWidth;
  const nh = image.naturalHeight;
  const sx = (pct.x / 100) * nw;
  const sy = (pct.y / 100) * nh;
  const sw = Math.max(1, (pct.width / 100) * nw);
  const sh = Math.max(1, (pct.height / 100) * nh);
  const scale = Math.min(1, maxWidth / sw);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(sw * scale));
  canvas.height = Math.max(1, Math.round(sh * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas niet beschikbaar");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

  let blob = await toBlobAsync(canvas, "image/webp", 0.85);
  if (blob && blob.type === "image/webp") return { blob, ext: "webp", mime: "image/webp" };
  blob = await toBlobAsync(canvas, "image/jpeg", 0.9);
  if (blob) return { blob, ext: "jpg", mime: "image/jpeg" };
  throw new Error("Bijsnijden mislukt");
}

export function ImageUploadCrop({ name, initialId, initialUrl, mediaOptions = [] }: Props) {
  const [value, setValue] = useState<string>(initialId ?? "");
  const [thumb, setThumb] = useState<string | null>(initialUrl ?? null);

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("afbeelding.webp");
  const [crop, setCrop] = useState<Crop>();
  const [completed, setCompleted] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(4 / 3);
  const [aspectKey, setAspectKey] = useState<AspectKey>("43");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setError(null);
    setFileName(f.name.replace(/\.[^.]+$/, "") + ".webp");
    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result as string);
    reader.readAsDataURL(f);
    e.target.value = "";
  }

  function setCenteredCrop(width: number, height: number, a: number) {
    const c = centerCrop(makeAspectCrop({ unit: "%", width: 90 }, a, width, height), width, height);
    setCrop(c);
    // Ook de pixel-uitsnede vast klaarzetten, zodat direct opslaan werkt
    // zonder dat de gebruiker eerst hoeft te slepen.
    setCompleted({
      unit: "px",
      x: (c.x / 100) * width,
      y: (c.y / 100) * height,
      width: (c.width / 100) * width,
      height: (c.height / 100) * height,
    });
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCenteredCrop(width, height, aspect ?? width / height);
  }

  function changeAspect(k: AspectKey, v?: number) {
    setAspectKey(k);
    setAspect(v);
    const img = imgRef.current;
    if (img) setCenteredCrop(img.width, img.height, v ?? img.width / img.height);
  }

  function resolvePercentCrop(img: HTMLImageElement): PercentRect {
    // De live crop wordt in % bijgehouden (resolutie-onafhankelijk).
    if (crop?.width && crop.unit === "%") {
      return { x: crop.x, y: crop.y, width: crop.width, height: crop.height };
    }
    // Voltooide uitsnede in px → omrekenen naar % via de getoonde afmetingen.
    if (completed?.width && img.width && img.height) {
      return {
        x: (completed.x / img.width) * 100,
        y: (completed.y / img.height) * 100,
        width: (completed.width / img.width) * 100,
        height: (completed.height / img.height) * 100,
      };
    }
    // Hele afbeelding.
    return { x: 0, y: 0, width: 100, height: 100 };
  }

  async function saveCrop() {
    const img = imgRef.current;
    if (!img) {
      setError("Afbeelding niet geladen.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const pct = resolvePercentCrop(img);
      const { blob, ext, mime } = await getCroppedBlob(img, pct);
      const base = fileName.replace(/\.[^.]+$/, "") || "afbeelding";
      const fd = new FormData();
      fd.set("file", new File([blob], `${base}.${ext}`, { type: mime }));
      fd.set("alt", base);
      const res = await uploadImage(fd);
      if (!res.ok || !res.id) {
        setError(res.error ?? "Uploaden mislukt.");
        return;
      }
      setValue(res.id);
      setThumb(res.thumbUrl ?? res.url ?? null);
      setImgSrc(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bijsnijden mislukt.");
    } finally {
      setBusy(false);
    }
  }

  function clearLink() {
    setValue("");
    setThumb(null);
  }

  function pickExisting(id: string) {
    setValue(id);
    const opt = mediaOptions.find((m) => m.id === id);
    setThumb(opt?.url ?? null);
  }

  return (
    <div>
      <input type="hidden" name={name} value={value} />

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div
          style={{
            width: 88,
            height: 66,
            borderRadius: 10,
            border: "1px solid var(--a-rand)",
            background: "var(--a-creme)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flex: "none",
          }}
        >
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <ImagePlus size={22} color="var(--a-grijs)" aria-hidden />
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <AdminButton type="button" variant="primary" size="sm" onClick={() => fileRef.current?.click()}>
            <Upload size={15} aria-hidden /> Upload & bijsnijden
          </AdminButton>
          {mediaOptions.length > 0 && (
            <select
              className="a-input"
              style={{ maxWidth: 220 }}
              value=""
              onChange={(e) => e.target.value && pickExisting(e.target.value)}
            >
              <option value="">of kies uit mediabank…</option>
              {mediaOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          )}
          {value && (
            <AdminButton type="button" variant="ghost" size="sm" onClick={clearLink}>
              Koppeling verwijderen
            </AdminButton>
          )}
        </div>
      </div>

      <input ref={fileRef} type="file" accept="image/*" onChange={pickFile} style={{ display: "none" }} />

      {imgSrc && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(31,36,33,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "1.25rem",
              maxWidth: 720,
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <h3 style={{ margin: 0, fontFamily: "var(--a-font-head)", fontStyle: "italic", color: "var(--a-paars)" }}>
                Bijsnijden
              </h3>
              <button
                type="button"
                onClick={() => setImgSrc(null)}
                aria-label="Sluiten"
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--a-grijs)" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              {ASPECTS.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => changeAspect(a.key, a.value)}
                  className="a-input"
                  style={{
                    cursor: "pointer",
                    padding: "0.3rem 0.8rem",
                    width: "auto",
                    fontWeight: 600,
                    color: aspectKey === a.key ? "#fff" : "var(--a-tekst)",
                    background: aspectKey === a.key ? "var(--a-paars)" : "#fff",
                    borderColor: aspectKey === a.key ? "var(--a-paars)" : "var(--a-rand)",
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", background: "var(--a-creme)", borderRadius: 10, padding: "0.5rem" }}>
              <ReactCrop
                crop={crop}
                onChange={(_, percent) => setCrop(percent)}
                onComplete={(c) => setCompleted(c)}
                aspect={aspect}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="Te bijsnijden"
                  onLoad={onImageLoad}
                  style={{ maxHeight: "55vh", maxWidth: "100%" }}
                />
              </ReactCrop>
            </div>

            {error && <p style={{ color: "var(--a-danger)", margin: "0.75rem 0 0" }}>{error}</p>}

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", justifyContent: "flex-end" }}>
              <AdminButton type="button" variant="ghost" onClick={() => setImgSrc(null)} disabled={busy}>
                Annuleren
              </AdminButton>
              <AdminButton type="button" variant="primary" onClick={saveCrop} disabled={busy}>
                <CropIcon size={16} aria-hidden /> {busy ? "Opslaan…" : "Bijsnijden & opslaan"}
              </AdminButton>
            </div>
          </div>
        </div>
      )}

      {error && !imgSrc && <p style={{ color: "var(--a-danger)", margin: "0.5rem 0 0", fontSize: "0.9rem" }}>{error}</p>}
    </div>
  );
}

export default ImageUploadCrop;
