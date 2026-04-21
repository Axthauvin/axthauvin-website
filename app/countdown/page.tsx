"use client";

import { useEffect, useState } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";

type Countdown = {
  id: string;
  title: string;
  date: string;
};

const DEFAULT_COUNTDOWNS: Countdown[] = [
  {
    id: "may-vacation",
    title: "Vacances de mai",
    date: "2026-04-39T00:00:00",
  },
  {
    id: "summer-vacation",
    title: "Vacances d'été",
    date: "2026-08-01T00:00:00",
  },
  {
    id: "end-epita",
    title: "Fin d'EPITA",
    date: "2027-02-04T00:00:00",
  },
];

export const metadata = {
  title: "Countdowns",
  description: "Create and manage your countdowns to important events.",
};

export default function CountdownPage() {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("12:00");

  // Override css variables exposed by react-flip-clock-countdown
  const clockVars: Record<string, string> = {
    "--fcc-digit-block-width": "clamp(42px, 7vw, 64px)",
    "--fcc-digit-block-height": "clamp(60px, 10vw, 92px)",
    "--fcc-digit-font-size": "clamp(30px, 5vw, 50px)",
    "--fcc-label-font-size": "14px",
    "--fcc-spacing": "clamp(6px, 1.3vw, 10px)",
    "--fcc-background": "#f3f7ff",
    "--fcc-digit-color": "#111827",
    "--fcc-label-color": "#d1d5db",
    "--fcc-divider-color": "rgba(17,24,39,0)",
  };

  useEffect(() => {
    const stored = localStorage.getItem("countdowns");
    if (!stored) {
      setCountdowns(DEFAULT_COUNTDOWNS);
      localStorage.setItem("countdowns", JSON.stringify(DEFAULT_COUNTDOWNS));
      return;
    }

    try {
      const parsed: Countdown[] = JSON.parse(stored);
      const parsedArray = Array.isArray(parsed) ? parsed : [];
      const defaultById = new Map(DEFAULT_COUNTDOWNS.map((c) => [c.id, c]));

      // Keep custom countdowns, but always refresh default countdowns by id.
      const merged = parsedArray.map((c) => defaultById.get(c.id) ?? c);
      const existingIds = new Set(merged.map((c) => c.id));
      const missingDefaults = DEFAULT_COUNTDOWNS.filter(
        (c) => !existingIds.has(c.id),
      );

      const now = new Date();
      const valid = [...merged, ...missingDefaults].filter(
        (c) => new Date(c.date) > now,
      );
      setCountdowns(valid);
      localStorage.setItem("countdowns", JSON.stringify(valid));
    } catch {
      setCountdowns(DEFAULT_COUNTDOWNS);
      localStorage.setItem("countdowns", JSON.stringify(DEFAULT_COUNTDOWNS));
    }
  }, []);

  // Periodically prune expired countdowns (in case page stays open)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdowns((prev) => {
        const now = new Date();
        const valid = prev.filter((c) => new Date(c.date) > now);
        if (valid.length !== prev.length) {
          localStorage.setItem("countdowns", JSON.stringify(valid));
          return valid;
        }
        return prev;
      });
    }, 30_000);
    return () => clearInterval(timer);
  }, []);

  const addCountdown = () => {
    if (!title.trim() || !selectedDate) return;

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const target = new Date(selectedDate);
    target.setHours(hours || 0, minutes || 0, 0, 0);

    if (target <= new Date()) return;

    const newCountdown: Countdown = {
      id: Date.now().toString(),
      title: title.trim(),
      date: target.toISOString(),
    };
    const updated = [...countdowns, newCountdown];
    setCountdowns(updated);
    localStorage.setItem("countdowns", JSON.stringify(updated));
    setTitle("");
    setSelectedDate(undefined);
    setSelectedTime("12:00");
    setIsModalOpen(false);
  };

  const removeCountdown = (id: string) => {
    const updated = countdowns.filter((c) => c.id !== id);
    setCountdowns(updated);
    localStorage.setItem("countdowns", JSON.stringify(updated));
  };

  const sortedCountdowns = [...countdowns].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Countdowns</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create and manage your countdowns to important events.
        </p>
      </div>

      <div className="mb-6">
        <Button onClick={() => setIsModalOpen(true)}>Add countdown</Button>
      </div>

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New countdown"
        description="Pick a date and time."
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={addCountdown}
              disabled={!title.trim() || !selectedDate}
            >
              Create
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <input
            aria-label="Countdown title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Countdown title"
            className="w-full border border-input bg-background px-3 py-2 rounded-md"
          />

          <div className="rounded-md border border-border p-2 w-full">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <label
              className="text-sm text-muted-foreground"
              htmlFor="target-time"
            >
              Time
            </label>
            <input
              id="target-time"
              aria-label="Target time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border border-input bg-background px-3 py-2 rounded-md"
            />
          </div>
        </div>
      </Dialog>

      {countdowns.length === 0 ? (
        <Card>
          <div className="p-6">No countdowns yet.</div>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedCountdowns.map((c) => (
            <Card
              key={c.id}
              className="overflow-hidden border-border"
              //   style={{ backgroundColor: "#0b1220" }}
            >
              <div className="p-4 md:p-6 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold truncate">
                    {c.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {/* juste la date en petit */}
                    {new Date(c.date).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeCountdown(c.id)}
                >
                  Delete
                </Button>
              </div>

              <div className="px-2 md:px-6 pb-2 overflow-x-auto">
                <div
                  className="mx-auto w-fit min-w-[420px]"
                  style={clockVars as React.CSSProperties}
                >
                  <FlipClockCountdown
                    to={new Date(c.date)}
                    onComplete={() => removeCountdown(c.id)}
                    dividerStyle={{
                      height: 0,
                    }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
