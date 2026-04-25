"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MapPin, ChevronRight, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

interface Quote {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  pickupZip: string;
  dropoffZip: string;
  distanceMiles: number;
  serviceType: string;
  packageSize: string | null;
  packageWeight: string | null;
  selectedExtras: string | null;
  status: string;
  internalNotes: string | null;
  estimatedPrice: number;
  vehicleCount: number | null;
  awbNumber: string | null;
  paymentStatus: string | null;
  paidAt: Date | null;
  createdAt: Date;
}

const COLUMNS: { id: string; label: string; color: string; dot: string; bg: string }[] = [
  { id: "PENDING",   label: "Pending",   color: "text-amber-700",  dot: "bg-amber-400",  bg: "bg-amber-50/60" },
  { id: "CONFIRMED", label: "Confirmed", color: "text-blue-700",   dot: "bg-blue-500",   bg: "bg-blue-50/60" },
  { id: "WON",       label: "Won",       color: "text-emerald-700",dot: "bg-emerald-500",bg: "bg-emerald-50/60" },
  { id: "LOST",      label: "Lost",      color: "text-rose-700",   dot: "bg-rose-500",   bg: "bg-rose-50/60" },
  { id: "CANCELLED", label: "Cancelled", color: "text-slate-500",  dot: "bg-slate-400",  bg: "bg-slate-50/60" },
  { id: "PAID",      label: "Paid",      color: "text-emerald-700",dot: "bg-emerald-600",bg: "bg-emerald-50/60" },
];

function QuoteCard({
  quote,
  isDragging = false,
  onClick,
}: {
  quote: Quote;
  isDragging?: boolean;
  onClick?: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } =
    useSortable({ id: quote.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="group">
      <div
        className={`bg-white dark:bg-[#141414] rounded-2xl border border-slate-200/70 dark:border-white/6 shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-white/10 transition-all duration-200 overflow-hidden ${isDragging ? "rotate-1 shadow-xl scale-105" : ""}`}
      >
        {/* Drag handle + name row */}
        <div className="flex items-start gap-2 px-4 pt-4 pb-2">
          <button
            {...attributes}
            {...listeners}
            className="mt-0.5 text-slate-300 dark:text-zinc-600 hover:text-slate-500 dark:hover:text-zinc-400 cursor-grab active:cursor-grabbing shrink-0 transition-colors"
            aria-label="Drag to reorder"
          >
            <GripVertical size={14} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-slate-900 dark:bg-zinc-700 flex items-center justify-center text-white font-black text-[11px] shrink-0">
                {quote.customerName.charAt(0).toUpperCase()}
              </div>
              <p className="font-black text-slate-900 dark:text-white text-sm truncate tracking-tight">{quote.customerName}</p>
            </div>
          </div>
          <span className="text-base font-black text-slate-900 dark:text-white shrink-0 tracking-tight">${quote.estimatedPrice.toFixed(0)}</span>
        </div>

        {/* Route */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-zinc-500 mt-1">
            <MapPin size={10} className="text-red-400 shrink-0" />
            <span>{quote.pickupZip}</span>
            <ChevronRight size={9} className="text-slate-300 dark:text-zinc-600" />
            <span>{quote.dropoffZip}</span>
            <span className="ml-auto text-slate-400 dark:text-zinc-500">{quote.distanceMiles.toFixed(1)} mi</span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 dark:border-white/6 px-4 py-2.5 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500">
            {new Date(quote.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </span>
          <button
            onClick={onClick}
            className="text-[10px] font-black text-red-600 hover:text-red-700 transition-colors"
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}

function OverlayCard({ quote }: { quote: Quote }) {
  return (
    <div className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-white/6 shadow-2xl dark:shadow-black/60 rotate-2 scale-105 overflow-hidden w-64">
      <div className="flex items-start gap-2 px-4 pt-4 pb-2">
        <GripVertical size={14} className="text-slate-300 dark:text-zinc-600 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-slate-900 dark:bg-zinc-700 flex items-center justify-center text-white font-black text-[11px] shrink-0">
              {quote.customerName.charAt(0).toUpperCase()}
            </div>
            <p className="font-black text-slate-900 dark:text-white text-sm truncate">{quote.customerName}</p>
          </div>
        </div>
        <span className="text-base font-black text-slate-900 dark:text-white shrink-0">${quote.estimatedPrice.toFixed(0)}</span>
      </div>
      <div className="px-4 pb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-zinc-500 mt-1">
          <MapPin size={10} className="text-red-400 shrink-0" />
          <span>{quote.pickupZip}</span>
          <ChevronRight size={9} className="text-slate-300 dark:text-zinc-600" />
          <span>{quote.dropoffZip}</span>
        </div>
      </div>
    </div>
  );
}

export default function KanbanBoard({
  quotes: initialQuotes,
  onSelectQuote,
}: {
  quotes: Quote[];
  onSelectQuote: (q: Quote) => void;
}) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const activeQuote = activeId ? quotes.find((q) => q.id === activeId) : null;

  const quotesByStatus = (status: string) => quotes.filter((q) => q.status === status);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeQuote = quotes.find((q) => q.id === active.id);
    if (!activeQuote) return;

    // Check if dragging over a column droppable
    const targetColumn = COLUMNS.find((c) => c.id === over.id);
    if (targetColumn && activeQuote.status !== targetColumn.id) {
      setQuotes((prev) =>
        prev.map((q) => q.id === active.id ? { ...q, status: targetColumn.id } : q)
      );
    }

    // Check if dragging over another card — use that card's column
    const overQuote = quotes.find((q) => q.id === over.id);
    if (overQuote && overQuote.status !== activeQuote.status) {
      setQuotes((prev) =>
        prev.map((q) => q.id === active.id ? { ...q, status: overQuote.status } : q)
      );
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const movedQuote = quotes.find((q) => q.id === active.id);
    if (!movedQuote) return;

    // Persist to DB
    try {
      await fetch(`/api/dashboard/quotes/${movedQuote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: movedQuote.status }),
      });
    } catch {
      // silently ignore — status already updated optimistically
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-6 pt-1 -mx-1 px-1" style={{ minHeight: 500 }}>
        {COLUMNS.map((col) => {
          const colQuotes = quotesByStatus(col.id);
          return (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex-shrink-0 w-64 rounded-2xl ${col.bg} dark:bg-[#1c1c1c] border border-slate-200/60 dark:border-white/6 flex flex-col`}
              id={col.id}
            >
              {/* Column Header */}
              <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-200/60 dark:border-white/6">
                <span className={`w-2 h-2 rounded-full ${col.dot} shrink-0`} />
                <span className={`text-xs font-black uppercase tracking-widest ${col.color} dark:text-zinc-300`}>{col.label}</span>
                <span className="ml-auto text-xs font-black text-slate-400 dark:text-zinc-400 bg-white/70 dark:bg-white/5 px-2 py-0.5 rounded-full">
                  {colQuotes.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 p-3 space-y-2.5 overflow-y-auto" id={col.id}>
                <SortableContext
                  items={colQuotes.map((q) => q.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {colQuotes.map((quote) => (
                    <QuoteCard
                      key={quote.id}
                      quote={quote}
                      onClick={() => onSelectQuote(quote)}
                    />
                  ))}
                </SortableContext>

                {colQuotes.length === 0 && (
                  <div className="flex items-center justify-center h-20 rounded-xl border-2 border-dashed border-slate-200 dark:border-white/10 text-slate-300 dark:text-zinc-600 text-xs font-bold">
                    Drop here
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <DragOverlay>
        {activeQuote ? <OverlayCard quote={activeQuote} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
