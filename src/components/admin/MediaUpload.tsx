"use client";

import { useRef, useState, useTransition, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { uploadMedia } from "@/app/(admin)/beheer/media/actions";

export function MediaUpload() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });
  const [pendingNames, setPendingNames] = useState<string[]>([]);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) {
      setStatus({ kind: "error", message: "Alleen afbeeldingen kunnen geüpload worden." });
      return;
    }

    const formData = new FormData();
    for (const file of files) formData.append("files", file);

    setPendingNames(files.map((f) => f.name));
    setStatus({ kind: "idle", message: "" });

    startTransition(async () => {
      const result = await uploadMedia(formData);
      setPendingNames([]);
      if (result.ok) {
        setStatus({
          kind: "ok",
          message: `${result.count} foto${result.count === 1 ? "" : "'s"} geüpload en bijgesneden.`,
        });
        router.refresh();
      } else {
        setStatus({ kind: "error", message: result.error ?? "Uploaden mislukt." });
      }
    });

    if (inputRef.current) inputRef.current.value = "";
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: ".45rem",
          padding: "2rem 1.25rem",
          textAlign: "center",
          cursor: isPending ? "wait" : "pointer",
          borderRadius: 16,
          border: `2px dashed ${dragOver ? "var(--a-groen)" : "var(--a-rand)"}`,
          background: dragOver ? "rgba(125,179,50,.08)" : "var(--a-creme)",
          color: "var(--a-grijs)",
          transition: "border-color .15s ease, background .15s ease",
          opacity: isPending ? 0.75 : 1,
        }}
      >
        <span style={{ fontSize: "1.6rem", lineHeight: 1 }} aria-hidden>
          🏕️
        </span>
        {isPending ? (
          <strong style={{ color: "var(--a-paars)" }}>Bezig met uploaden…</strong>
        ) : (
          <>
            <strong style={{ color: "var(--a-paars)", fontSize: "1.02rem" }}>
              Sleep foto's hierheen of klik om te kiezen
            </strong>
            <span style={{ fontSize: ".85rem" }}>
              Meerdere tegelijk kan. We snijden en optimaliseren ze automatisch.
            </span>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {isPending && pendingNames.length > 0 ? (
        <ul
          style={{
            listStyle: "none",
            margin: ".75rem 0 0",
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: ".4rem",
          }}
        >
          {pendingNames.map((name) => (
            <li
              key={name}
              style={{
                fontSize: ".78rem",
                color: "var(--a-grijs)",
                background: "var(--a-creme)",
                border: "1px solid var(--a-rand)",
                borderRadius: 999,
                padding: ".2rem .65rem",
              }}
            >
              {name} · bezig…
            </li>
          ))}
        </ul>
      ) : null}

      {status.kind !== "idle" ? (
        <p
          role="status"
          style={{
            margin: ".75rem 0 0",
            fontSize: ".88rem",
            fontWeight: 600,
            color: status.kind === "ok" ? "var(--a-groen-donker)" : "var(--a-danger)",
          }}
        >
          {status.message}
        </p>
      ) : null}
    </div>
  );
}

export default MediaUpload;
