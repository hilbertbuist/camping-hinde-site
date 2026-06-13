"use client";

import { useEffect, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { reorderDocs } from "@/app/(admin)/beheer/reorder-actions";

export type SortableRow = { id: string; cells: ReactNode[] };

type Props = {
  /** Payload-collectie-slug, bv. "products" */
  collection: string;
  /** grid-template-columns voor de inhoud (zonder de sleepgreep-kolom) */
  template: string;
  /** koppen voor de inhoudskolommen (zelfde aantal als template-kolommen) */
  headers: string[];
  rows: SortableRow[];
  emptyText?: string;
};

export function SortableTable({ collection, template, headers, rows, emptyText }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(rows);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Houd de lijst in sync wanneer de server nieuwe data levert (na refresh).
  useEffect(() => {
    setItems(rows);
  }, [rows]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const gridTemplate = `2rem ${template}`;

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((r) => r.id === active.id);
    const newIndex = items.findIndex((r) => r.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const previous = items;
    const next = arrayMove(items, oldIndex, newIndex);
    setItems(next); // optimistisch
    setError(null);
    startTransition(async () => {
      const res = await reorderDocs(
        collection,
        next.map((r) => r.id),
      );
      if (!res.ok) {
        setItems(previous); // terugdraaien
        setError(res.error ?? "Volgorde opslaan mislukt.");
        return;
      }
      router.refresh();
    });
  }

  if (items.length === 0) {
    return (
      <div className="a-sort">
        <div className="a-sort__empty">{emptyText ?? "Geen gegevens."}</div>
      </div>
    );
  }

  return (
    <div className="a-sort">
      <div className="a-sort__bar">
        <span className="a-sort__hint">Sleep de rijen met ⠿ om de volgorde te bepalen.</span>
        {pending && <span className="a-sort__saving">Volgorde opslaan…</span>}
        {error && <span className="a-sort__error">{error}</span>}
      </div>

      <div className="a-sort__head" style={{ gridTemplateColumns: gridTemplate }}>
        <span />
        {headers.map((h, i) => (
          <span key={i}>{h}</span>
        ))}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((r) => r.id)} strategy={verticalListSortingStrategy}>
          <ul className="a-sort__list">
            {items.map((row) => (
              <SortableRowItem key={row.id} id={row.id} template={gridTemplate}>
                {row.cells.map((c, i) => (
                  <div key={i} className="a-sort__cell">
                    {c}
                  </div>
                ))}
              </SortableRowItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableRowItem({
  id,
  template,
  children,
}: {
  id: string;
  template: string;
  children: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <li
      ref={setNodeRef}
      className={`a-sort__row${isDragging ? " a-sort__row--drag" : ""}`}
      style={{
        gridTemplateColumns: template,
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <button
        type="button"
        className="a-sort__handle"
        aria-label="Versleep om volgorde te wijzigen"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={18} aria-hidden />
      </button>
      {children}
    </li>
  );
}

export default SortableTable;
