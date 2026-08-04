export function initTheme(): void {
  const KEY = "ttp-theme-pref";
  const root = document.documentElement;
  const mq = window.matchMedia("(prefers-color-scheme: dark)");

  function resolve(pref: string): string {
    return pref === "system" ? (mq.matches ? "dark" : "light") : pref;
  }

  function apply(pref: string): void {
    root.setAttribute("data-theme", resolve(pref));
    document.querySelectorAll<HTMLElement>("[data-theme-btn]").forEach((btn) => {
      const active = btn.dataset.themeBtn === pref;
      btn.style.background = active ? "var(--bg-elevated-2)" : "transparent";
      btn.style.color = active ? "var(--text-primary)" : "var(--text-tertiary)";
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  let pref = "dark";
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark" || saved === "system") pref = saved;
  } catch (e) {}
  apply(pref);

  mq.addEventListener("change", () => { if (pref === "system") apply(pref); });

  document.querySelectorAll<HTMLElement>("[data-theme-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      pref = btn.dataset.themeBtn || "dark";
      try { localStorage.setItem(KEY, pref); } catch (e) {}
      apply(pref);
    });
  });
}
