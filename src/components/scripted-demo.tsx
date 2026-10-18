import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  PhoneFrame,
  StatusBar,
  ChatHeader,
  Wallpaper,
  Bubble,
  TypingBubble,
  ListingCard,
  DayStamp,
  HomeIndicator,
  WA,
} from "./phone";
import { PROPERTY_BY_ID } from "../lib/demo-properties";
import { SCENARIO_BY_ID, type InfoCard } from "../lib/demo-scenarios";
import mark from "../assets/hooze-icon.png";

function InfoBubble({ c }: { c: InfoCard }) {
  return (
    <div className="flex justify-start">
      <div
        className="w-[88%] p-2 text-[12px]"
        style={{
          background: WA.incoming,
          color: WA.text,
          borderRadius: 8,
          borderTopLeftRadius: 0,
          animation: "hz-fade .3s ease-out",
        }}
      >
        <p className="text-[13px] font-semibold">{c.title}</p>
        <dl className="mt-1.5 divide-y" style={{ borderColor: WA.bar }}>
          {c.rows.map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between gap-3 py-1"
              style={{ borderColor: WA.bar }}
            >
              <dt style={{ color: WA.sub }}>{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        {c.foot && (
          <p
            className="mt-1.5 text-[10px] uppercase tracking-wider"
            style={{ color: WA.sub }}
          >
            {c.foot}
          </p>
        )}
      </div>
    </div>
  );
}

function usePlayer(scenarioId: string) {
  const scenario = SCENARIO_BY_ID[scenarioId] ?? SCENARIO_BY_ID["realestate"]!;
  const steps = scenario.steps;
  const ref = useRef<HTMLDivElement | null>(null);
  const [live, setLive] = useState(false);
  const [n, setN] = useState(0);
  const [typing, setTyping] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced.current) {
      setN(steps.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e?.isIntersecting && setLive(true),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [steps.length]);

  useEffect(() => {
    if (!live || n >= steps.length) return;
    const step = steps[n]!;
    const ai = step.from === "me";
    const read = n === 0 ? 600 : ai ? 900 : 1400;
    const type = ai
      ? Math.min(2600, 700 + step.text.length * 14)
      : Math.min(1600, 500 + step.text.length * 22);
    const t1 = setTimeout(() => setTyping(true), (step.delay ?? 0) + read);
    const t2 = setTimeout(
      () => {
        setTyping(false);
        setN((v) => v + 1);
      },
      (step.delay ?? 0) + read + type,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [live, n, steps]);

  const record = useMemo(() => {
    const r: Record<string, string> = {};
    steps.slice(0, n).forEach((s) => s.set && Object.assign(r, s.set));
    return r;
  }, [steps, n]);

  return {
    scenario,
    ref,
    n,
    typing,
    record,
    done: n >= steps.length,
    replay: () => {
      setN(0);
      setTyping(false);
      setLive(true);
    },
  };
}

type Player = ReturnType<typeof usePlayer>;

function Phone({ p }: { p: Player }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scenario, n, typing } = p;
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [n, typing]);
  const next = scenario.steps[n];
  return (
    <PhoneFrame ref={p.ref}>
      <StatusBar
        time={scenario.steps[0]?.time.replace(/\s?[AP]M/i, "") ?? "9:41"}
      />
      <ChatHeader
        name={scenario.header}
        status={typing && next?.from === "me" ? "typing…" : "online"}
        avatar={mark}
      />
      <Wallpaper>
        <div
          ref={scrollRef}
          className="h-[470px] space-y-1.5 overflow-y-auto px-2.5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <DayStamp label="Sample conversation" />
          {scenario.steps.slice(0, n).map((s, i) => (
            <div key={`${scenario.id}-${i}`} className="space-y-1.5">
              {s.text && (
                <Bubble from={s.from} time={s.time}>
                  {s.text}
                </Bubble>
              )}
              {s.card && PROPERTY_BY_ID[s.card] && (
                <ListingCard p={PROPERTY_BY_ID[s.card]!} />
              )}
              {s.info && <InfoBubble c={s.info} />}
            </div>
          ))}
          {typing && next?.from === "me" && <TypingBubble />}
        </div>
        <div
          className="flex items-center gap-2 px-2 py-2"
          style={{ background: WA.header }}
        >
          <span
            className="flex-1 rounded-full px-3 py-2 text-[13px]"
            style={{ background: WA.bar, color: WA.sub }}
          >
            Message
          </span>
          <span
            className="grid h-9 w-9 place-items-center rounded-full"
            style={{ background: "#00A884" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0B141A">
              <path d="M2 21 23 12 2 3v7l15 2-15 2v7Z" />
            </svg>
          </span>
        </div>
        <HomeIndicator />
      </Wallpaper>
    </PhoneFrame>
  );
}

export function RecordPanel({ p }: { p: Player }) {
  const { scenario, record, done } = p;
  const filled = Object.keys(record).length;
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{scenario.recordTitle} · building live</p>
        <span className="font-mono text-xs text-muted">
          {filled}/{scenario.fields.length}
        </span>
      </div>
      <div className="mt-3 h-px w-full bg-line" aria-hidden>
        <div
          className="h-px bg-amber transition-all duration-700"
          style={{ width: `${(filled / scenario.fields.length) * 100}%` }}
        />
      </div>
      <dl className="mt-2 divide-y divide-line">
        {scenario.fields.map(([k, label]) => {
          const v = record[k];
          return (
            <div
              key={k}
              className="grid grid-cols-[7.5rem_1fr] gap-4 py-3 text-sm"
            >
              <dt className="text-muted">{label}</dt>
              <dd
                key={v ?? "empty"}
                className={v ? "hz-flash text-ink" : "text-muted/40"}
              >
                {v ?? "—"}
              </dd>
            </div>
          );
        })}
      </dl>
      <div className="mt-auto flex items-center justify-between gap-4 pt-4 text-xs text-muted">
        <span>
          {done
            ? scenario.doneNote
            : "Filled in automatically as the conversation happens."}
        </span>
        {done && (
          <button
            onClick={p.replay}
            className="inline-flex shrink-0 items-center gap-1.5 text-amber hover:text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Replay
          </button>
        )}
      </div>
    </div>
  );
}

/** Phone conversation + the record it builds, for one niche. */
export function ScenarioDemo({ scenarioId }: { scenarioId: string }) {
  const p = usePlayer(scenarioId);
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
      <Phone p={p} />
      <RecordPanel p={p} />
    </div>
  );
}
