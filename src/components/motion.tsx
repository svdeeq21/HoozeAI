import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Inertial smooth scrolling (off for reduced-motion). Also smooth-scrolls #anchors. */
export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -72 } });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

/** Hairline reading-progress bar. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current)
        ref.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-line/40"
    >
      <div
        ref={ref}
        className="h-full origin-left bg-amber"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/** Headline that rises word by word from a mask when it enters view. */
export function SplitWords({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (reducedMotion()) {
      setOn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <span
            className="inline-block transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{
              transform: on ? "none" : "translateY(112%)",
              transitionDelay: `${delay + i * 55}ms`,
            }}
          >
            {w}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}

/** Pointer-reactive dot field. Cheap canvas, paused offscreen, static for reduced motion / touch. */
export function DotField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = ref.current;
    const host = c?.parentElement;
    if (!c || !host) return;
    const ctx = c.getContext("2d")!;
    const GAP = 30;
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      visible = true;
    const mouse = { x: -999, y: -999 };
    const animate =
      !reducedMotion() && window.matchMedia("(pointer: fine)").matches;
    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = w + "px";
      c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let x = GAP / 2; x < w; x += GAP)
        for (let y = GAP / 2; y < h; y += GAP) {
          const dx = x - mouse.x,
            dy = y - mouse.y,
            d = Math.hypot(dx, dy),
            R = 150;
          const k = d < R ? 1 - d / R : 0;
          const px = x + (d ? (dx / d) * k * 9 : 0),
            py = y + (d ? (dy / d) * k * 9 : 0);
          ctx.fillStyle =
            k > 0.02
              ? `rgba(245,166,35,${0.18 + k * 0.7})`
              : "rgba(240,237,232,0.10)";
          ctx.beginPath();
          ctx.arc(px, py, 1.1 + k * 1.6, 0, 6.283);
          ctx.fill();
        }
      if (animate && visible) raf = requestAnimationFrame(draw);
    };
    size();
    draw();
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const leave = () => {
      mouse.x = mouse.y = -999;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible && animate) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      }
    });
    io.observe(host);
    window.addEventListener("resize", size);
    if (animate) {
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", size);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}

/** Subtle magnetic pull on primary buttons. */
export function Magnetic() {
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches)
      return;
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        ".btn-amber",
      ) as HTMLElement | null;
      document
        .querySelectorAll<HTMLElement>(".btn-amber[data-mag]")
        .forEach((b) => {
          if (b !== el) {
            b.style.transform = "";
            b.removeAttribute("data-mag");
          }
        });
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.setAttribute("data-mag", "1");
      el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.12}px, ${(e.clientY - (r.top + r.height / 2)) * 0.2}px)`;
    };
    document.addEventListener("pointermove", move);
    return () => document.removeEventListener("pointermove", move);
  }, []);
  return null;
}
