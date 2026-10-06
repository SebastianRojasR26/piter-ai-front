import { useEffect, type RefObject } from "react";

export function useScrollReveal(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = root.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = element.querySelectorAll<HTMLElement>(
      ".ed-section-heading, .ed-benefits article, .ed-plan, .ed-faq > div, .ed-closing",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ed-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    const revealAll = () => {
      if (preference.matches) {
        observer.disconnect();
        targets.forEach((target) =>
          target.classList.remove("ed-reveal", "ed-revealed"),
        );
      }
    };
    if (!preference.matches) {
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top >= window.innerHeight) {
          target.classList.add("ed-reveal");
          observer.observe(target);
        }
      });
    }
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) {
        event.target.closest(".ed-reveal")?.classList.add("ed-revealed");
      }
    };
    preference.addEventListener("change", revealAll);
    element.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", revealAll);
      element.removeEventListener("focusin", onFocus);
      targets.forEach((target) =>
        target.classList.remove("ed-reveal", "ed-revealed"),
      );
    };
  }, [root]);
}
