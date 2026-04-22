import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Orb } from "@/components/Orb";
import { pickAffirmation } from "@/lib/affirmations";
import { getLastCompleted } from "@/lib/ritual-store";

export const Route = createFileRoute("/blessing")({
  head: () => ({
    meta: [
      { title: "Blessing — Altar" },
      { name: "description", content: "The offering is accepted." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BlessingPage,
});

function BlessingPage() {
  const navigate = useNavigate();
  const [affirmation, setAffirmation] = useState("");
  const [duration, setDuration] = useState<number | null>(null);
  const [sacrifice, setSacrifice] = useState<string | null>(null);

  useEffect(() => {
    const last = getLastCompleted();
    if (!last) {
      navigate({ to: "/" });
      return;
    }
    setAffirmation(pickAffirmation());
    setDuration(last.duration);
    setSacrifice(last.sacrifice);
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full max-w-md flex-col items-center gap-12 text-center"
      >
        <Orb size={180} still />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="space-y-6"
        >
          <h1 className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-primary text-glow-cyan">
            The offering is accepted
          </h1>

          <p className="text-2xl font-light leading-relaxed text-foreground sm:text-[1.7rem]">
            “{affirmation}”
          </p>

          {duration != null && sacrifice && (
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
              {duration} min · without · {sacrifice}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8"
        >
          <Link
            to="/"
            className="group relative rounded-full px-8 py-3 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-foreground transition-all duration-500"
            style={{
              boxShadow:
                "inset 0 0 0 1px oklch(0.88 0.12 215 / 0.4), 0 0 24px oklch(0.88 0.12 215 / 0.15)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                boxShadow:
                  "inset 0 0 0 1px oklch(0.88 0.12 215 / 0.7), 0 0 40px oklch(0.88 0.12 215 / 0.4)",
              }}
            />
            Begin Another
          </Link>

          <Link
            to="/"
            className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
          >
            return to altar
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
