export function initReveal(root: HTMLElement = document.body): void {
  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (els.length === 0) return;

  const revealed = new WeakSet<HTMLElement>();
  let seen = 0;

  const reveal = (el: HTMLElement, delay: number) => {
    revealed.add(el);
    window.setTimeout(() => el.classList.add("is-visible"), delay);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (revealed.has(el)) { io.unobserve(el); return; }
        if (!entry.isIntersecting) return;
        io.unobserve(el);
        reveal(el, (seen++ % 4) * 70);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));

  // Fallback: catches elements a fast scroll/anchor jump moves straight past
  // without IO ever flipping isIntersecting.
  let ticking = false;
  const sweep = () => {
    ticking = false;
    els.forEach((el) => {
      if (revealed.has(el)) return;
      if (el.getBoundingClientRect().top < window.innerHeight) {
        io.unobserve(el);
        reveal(el, 0);
      }
    });
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(sweep); }
  }, { passive: true });
  sweep();
}
