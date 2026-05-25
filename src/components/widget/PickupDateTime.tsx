"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface PickupDateTimeProps {
  date: string; // yyyy-mm-dd
  time: string; // HH:MM (24h)
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  businessHoursStart?: string; // "09:00"
  businessHoursEnd?: string; // "15:00"
  businessDays?: string; // "0,1,2,3,4,5,6"
  primaryColor: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n: number) => String(n).padStart(2, "0");
const toISODate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Parse a yyyy-mm-dd string into a local Date (avoids UTC shift from new Date("yyyy-mm-dd"))
function parseISODate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function formatDateLabel(s: string): string {
  const d = parseISODate(s);
  if (!d) return "";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTimeLabel(hhmm: string): string {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
  if (!m) return "";
  let h = Number(m[1]);
  const min = m[2];
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${min} ${period}`;
}

function buildTimeSlots(start: string, end: string): string[] {
  const sm = /^(\d{1,2}):(\d{2})$/.exec(start || "09:00");
  const em = /^(\d{1,2}):(\d{2})$/.exec(end || "17:00");
  if (!sm || !em) return [];
  let cur = Number(sm[1]) * 60 + Number(sm[2]);
  const endMin = Number(em[1]) * 60 + Number(em[2]);
  const slots: string[] = [];
  // Slots up to (but not including) closing time, in 30-min steps
  while (cur < endMin && slots.length < 48) {
    slots.push(`${pad(Math.floor(cur / 60))}:${pad(cur % 60)}`);
    cur += 30;
  }
  return slots;
}

export default function PickupDateTime({
  date,
  time,
  onDateChange,
  onTimeChange,
  businessHoursStart,
  businessHoursEnd,
  businessDays,
  primaryColor,
}: PickupDateTimeProps) {
  const [openPanel, setOpenPanel] = useState<null | "date" | "time">(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = parseISODate(date);
  const [viewMonth, setViewMonth] = useState<Date>(
    selected ?? new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const allowedDays = (businessDays ?? "0,1,2,3,4,5,6")
    .split(",")
    .map((n) => Number(n))
    .filter((n) => !Number.isNaN(n));

  const slots = buildTimeSlots(businessHoursStart ?? "09:00", businessHoursEnd ?? "17:00");

  // Close panels on outside click
  useEffect(() => {
    if (!openPanel) return;
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openPanel]);

  // Build calendar grid for the viewed month
  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));

  const isDisabled = (d: Date) => d < today || !allowedDays.includes(d.getDay());

  const triggerClass =
    "w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-left flex items-center justify-between gap-2 outline-none transition-all duration-200 hover:border-slate-400";

  return (
    <div ref={containerRef} className="relative">
      <div className="grid grid-cols-2 gap-3">
        {/* Date trigger */}
        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "date" ? null : "date")}
          className={triggerClass}
          style={openPanel === "date" ? { borderColor: primaryColor } : {}}
        >
          <span className={date ? "text-slate-800" : "text-slate-400"}>
            {date ? formatDateLabel(date) : "Select date"}
          </span>
          <Calendar size={16} className="text-slate-400 shrink-0" />
        </button>

        {/* Time trigger */}
        <button
          type="button"
          onClick={() => setOpenPanel(openPanel === "time" ? null : "time")}
          className={triggerClass}
          style={openPanel === "time" ? { borderColor: primaryColor } : {}}
        >
          <span className={time ? "text-slate-800" : "text-slate-400"}>
            {time ? formatTimeLabel(time) : "Select time"}
          </span>
          <Clock size={16} className="text-slate-400 shrink-0" />
        </button>
      </div>

      {/* Calendar popover */}
      {openPanel === "date" && (
        <div className="absolute z-50 mt-2 left-0 w-[300px] max-w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-bold text-slate-800">
              {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((w) => (
              <div key={w} className="text-[10px] font-bold text-slate-400 text-center py-1">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={`e${i}`} />;
              const disabled = isDisabled(d);
              const iso = toISODate(d);
              const isSelected = iso === date;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => { onDateChange(iso); setOpenPanel(null); }}
                  className={`h-9 rounded-lg text-[13px] font-semibold transition-colors ${
                    disabled
                      ? "text-slate-300 cursor-not-allowed"
                      : isSelected
                      ? "text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                  style={isSelected ? { backgroundColor: primaryColor } : {}}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Time slots popover */}
      {openPanel === "time" && (
        <div className="absolute z-50 mt-2 right-0 w-[220px] max-w-full bg-white border border-slate-200 rounded-2xl shadow-xl p-2 animate-in fade-in slide-in-from-top-2">
          {slots.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4 px-2">No times available.</p>
          ) : (
            <div className="max-h-56 overflow-y-auto grid grid-cols-2 gap-1.5">
              {slots.map((s) => {
                const isSelected = s === time;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { onTimeChange(s); setOpenPanel(null); }}
                    className={`px-2 py-2 rounded-lg text-[12px] font-bold flex items-center justify-center gap-1 transition-colors ${
                      isSelected ? "text-white" : "text-slate-700 bg-slate-50 hover:bg-slate-100"
                    }`}
                    style={isSelected ? { backgroundColor: primaryColor } : {}}
                  >
                    {isSelected && <Check size={11} />}
                    {formatTimeLabel(s)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
