import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orb } from "@/components/Orb";
import {
  clearActiveRitual,
  getActiveRitual,
  setLastCompleted,
} from "@/lib/ritual-store";

export const Route = createFileRoute("/focus")({
  head: () => ({
    meta: [
      { title: "Focus — Altar" },
      { name: "description", content: "The ritual is in progress." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FocusPage,
});

function FocusPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [sacrifice, setSacrifice] = useState("");
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  const ritualRef = useRef<ReturnType<typeof getActiveRitual>>(null);

  useEffect(() => {
    const ritual = getActiveRitual();
    if (!ritual) {
      navigate({ to: "/" });
      return;
    }
    ritualRef.current = ritual;
    setSacrifice(ritual.sacrifice);

    const totalMs = ritual.duration * 60 * 1000;

    const tick = () => {
      const elapsed = Date.now() - ritual.startedAt;
      const p = Math.min(1, elapsed / totalMs);
      setProgress(p);
      if (p >= 1) {
        complete();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);

    // Warn on tab close
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", beforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function complete() {
    const ritual = ritualRef.current;
    if (!ritual) return;
    ritualRef.current = null; // guard against double-fire

    setLastCompleted({
      sacrifice: ritual.sacrifice,
      duration: ritual.duration,
    });
    clearActiveRitual();
    navigate({ to: "/blessing" });
  }

  function abandon() {
    const ritual = ritualRef.current;
    ritualRef.current = null;
    if (!ritual) return;
    clearActiveRitual();
    navigate({ to: "/" });
  }

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "oklch(0.08 0.01 270)" }}
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-12"
      >
        <Orb size={280} progress={progress} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground"
        >
          Sacrificing · {sacrifice}
        </motion.p>
      </motion.div>

      {/* Abandon link */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <AnimatePresence mode="wait">
          {!confirmAbandon ? (
            <motion.button
              key="abandon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.4 }}
              onClick={() => setConfirmAbandon(true)}
              className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground"
            >
              abandon
            </motion.button>
          ) : (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 font-mono text-[0.6rem] uppercase tracking-[0.3em]"
            >
              <span className="text-muted-foreground">break the ritual?</span>
              <button
                onClick={abandon}
                className="text-destructive transition-colors hover:text-foreground"
              >
                yes
              </button>
              <button
                onClick={() => setConfirmAbandon(false)}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                no
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
