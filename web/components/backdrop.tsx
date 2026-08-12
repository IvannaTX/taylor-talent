/**
 * Ambient gradient field — deep violet, indigo and cyan orbs drifting behind a
 * charcoal ground, plus a faint technical grid. CSS-only (no JS, no scroll
 * listeners) so it costs nothing on the main thread, and `fixed` + `clip` means
 * it can never widen the document.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 -z-10 overflow-clip"
    >
      {/* Grid — 1px lines, masked out toward the edges. */}
      <div
        className="absolute inset-0 opacity-[0.55] mask-fade-y"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--line) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--line) / 0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        className="absolute -left-[18vw] -top-[22vh] h-[62vh] w-[62vh] animate-drift rounded-full blur-[110px] sm:h-[78vh] sm:w-[78vh]"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgb(var(--orb-a) / var(--orb-opacity)), transparent 68%)`,
        }}
      />
      <div
        className="absolute -right-[20vw] top-[14vh] h-[58vh] w-[58vh] animate-drift-alt rounded-full blur-[120px] sm:h-[72vh] sm:w-[72vh]"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgb(var(--orb-b) / var(--orb-opacity)), transparent 68%)`,
        }}
      />
      <div
        className="absolute -bottom-[26vh] left-[24vw] h-[54vh] w-[54vh] animate-drift rounded-full blur-[130px] sm:h-[68vh] sm:w-[68vh]"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgb(var(--orb-c) / var(--orb-opacity)), transparent 68%)`,
          animationDelay: "-9s",
        }}
      />

      {/* Vignette keeps text contrast stable over the orbs. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent,rgb(var(--bg)/0.75))]" />
    </div>
  );
}
