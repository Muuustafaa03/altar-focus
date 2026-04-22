import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { setActiveRitual } from "@/lib/ritual-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar — Begin a Focus Ritual" },
      {
        name: "description",
        content:
          "Choose what to sacrifice and how long to focus. A minimalist ritual for deep attention.",
      },
    ],
  }),
  component: AltarPage,
});

const DURATIONS = [15, 30, 60] as const;

function AltarPage() {
  const navigate = useNavigate();
  const [sacrifice, setSacrifice] = useState("");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>(30);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBegin(e: React.FormEvent) {
    e.preventDefault();
    const text = sacrifice.trim();
    if (!text || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const ritualId = crypto.randomUUID();

      const { error: insertError } = await supabase
        .from("rituals")
        .insert({
          id: ritualId,
          sacrifice_text: text,
          duration,
          completed_status: false,
        });
      if (insertError) throw insertError;

      setActiveRitual({
        id: ritualId,
        sacrifice: text,
        duration,
        startedAt: Date.now(),
      });

      navigate({ to: "/focus" });
    } catch (err) {
      console.error("Failed to begin ritual", {
        error: err,
        sacrifice: text,
        duration,
      });
      setError("The altar could not receive your offering. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between px-6 py-12 sm:py-16">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-xs tracking-[0.5em] text-muted-foreground"
      >
        ALTAR
      </motion.header>

      <motion.form
        onSubmit={handleBegin}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-md flex-col items-center gap-12"
      >
        <div className="w-full text-center">
          <label
            htmlFor="sacrifice"
            className="mb-8 block font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground"
          >
            What do you sacrifice?
          </label>
          <input
            id="sacrifice"
            type="text"
            value={sacrifice}
            onChange={(e) => setSacrifice(e.target.value)}
            placeholder="TikTok, Slack, the news…"
            autoFocus
            maxLength={80}
            className="w-full border-0 border-b border-border bg-transparent px-2 py-3 text-center text-xl font-light text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-0 transition-colors duration-300"
            style={{
              caretColor: "oklch(0.88 0.12 215)",
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            Duration · minutes
          </span>
          <div className="flex gap-3">
            {DURATIONS.map((d) => {
              const active = duration === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`relative h-14 w-14 rounded-full font-mono text-sm transition-all duration-300 ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{
                    boxShadow: active
                      ? "inset 0 0 0 1px oklch(0.88 0.12 215 / 0.6), 0 0 24px oklch(0.88 0.12 215 / 0.25)"
                      : "inset 0 0 0 1px oklch(0.94 0.005 270 / 0.08)",
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={!sacrifice.trim() || submitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative mt-4 rounded-full px-10 py-3 font-mono text-xs uppercase tracking-[0.35em] text-foreground transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-30"
          style={{
            boxShadow:
              "inset 0 0 0 1px oklch(0.78 0.13 305 / 0.4), 0 0 30px oklch(0.78 0.13 305 / 0.15)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-disabled:opacity-0"
            style={{
              boxShadow:
                "inset 0 0 0 1px oklch(0.78 0.13 305 / 0.7), 0 0 50px oklch(0.78 0.13 305 / 0.45)",
            }}
          />
          {submitting ? "Preparing…" : "Begin Ritual"}
        </motion.button>

        {error && (
          <p className="font-mono text-xs text-destructive">{error}</p>
        )}
      </motion.form>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="font-mono text-[0.6rem] tracking-[0.3em] text-muted-foreground/60"
      >
        ATTENTION · IS · THE · OFFERING
      </motion.footer>
    </main>
  );
}
