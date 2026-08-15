import { useEffect, useRef, useState } from "react";
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
import mark from "../assets/hooze-icon.png";

type Step = {
  from: "them" | "me";
  text: string;
  time: string;
  delay?: number;
  card?: string;
};

const SCRIPT: Step[] = [
  {
    from: "them",
    text: "Hi, is the 4 bedroom duplex in Lokogoma still available?",
    time: "4:41 PM",
  },
  {
    from: "me",
    text: "Hi! Yes, that one is still listed as available — 4-bedroom detached duplex with a BQ, in the gated estate off Lokogoma.\n\nAre you looking at it for yourself, as an investment, or are you still comparing a few options?",
    time: "4:41 PM",
    card: "lokogoma-duplex",
  },
  { from: "them", text: "For myself. But ₦95m is above what I planned.", time: "4:42 PM" },
  {
    from: "me",
    text: "That's fair — most people start there. What number were you working with, roughly? I'd rather show you something you can actually close on than push this one.",
    time: "4:42 PM",
  },
  { from: "them", text: "I'd rather rent for now. 3 bedrooms, around Wuse.", time: "4:44 PM" },
  {
    from: "me",
    text: "Got it. Who's moving in with you, and what's your yearly rent range?",
    time: "4:44 PM",
  },
  { from: "them", text: "Wife and one child. Up to ₦7m if it's serviced.", time: "4:45 PM" },
  {
    from: "me",
    text: "Then two make sense. Wuse 2 serviced 3-bed at ₦6.5m plus ₦900k service charge, and a bigger Gwarinpa terrace at ₦4.8m with no service charge.",
    time: "4:46 PM",
    card: "wuse-apartment",
  },
  { from: "me", text: "", time: "4:46 PM", card: "gwarinpa-terrace", delay: 700 },
  { from: "them", text: "Gwarinpa is cheaper and bigger. Why not that one?", time: "4:47 PM" },
  {
    from: "me",
    text: "It is bigger, and if space is your priority I'd say take it. But you told me your office is in the business district.\n\nGwarinpa is 35–45 mins each way in traffic. Wuse 2 is a walk. Over a year that's about 300 hours of your life — and the ₦1.7m gap is mostly that commute.",
    time: "4:48 PM",
  },
  { from: "them", text: "Hmm. True. Can I see the Wuse one?", time: "4:49 PM" },
  {
    from: "me",
    text: "Yes. Saturday 11:00 AM or Sunday 2:00 PM — which works? I'll put the Gwarinpa one on the same run so you can judge both yourself.",
    time: "4:49 PM",
  },
  { from: "them", text: "Saturday 11.", time: "4:50 PM" },
  {
    from: "me",
    text: "Locked in. Saturday, 11:00 AM, Wuse 2 then Gwarinpa. Tunde will call you Friday evening to confirm, and I've sent both floor plans to this chat.",
    time: "4:50 PM",
  },
];

export function ScriptedDemo() {
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [live, setLive] = useState(false);
  const [n, setN] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setLive(true),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!live || n >= SCRIPT.length) return;
    const step = SCRIPT[n];
    const isAi = step.from === "me";
    const readPause = n === 0 ? 600 : isAi ? 900 : 1400;
    const typeFor = isAi
      ? Math.min(2600, 700 + step.text.length * 14)
      : Math.min(1600, 500 + step.text.length * 22);

    const t1 = setTimeout(() => setTyping(true), (step.delay ?? 0) + readPause);
    const t2 = setTimeout(
      () => {
        setTyping(false);
        setN((v) => v + 1);
      },
      (step.delay ?? 0) + readPause + typeFor,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [live, n]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [n, typing]);

  const done = n >= SCRIPT.length;

  return (
    <PhoneFrame ref={ref} tilt>
      <StatusBar time="4:50" />
      <ChatHeader
        name="Hooze — Property Consultant"
        status={typing ? "typing…" : "online"}
        avatar={mark}
      />
      <Wallpaper>
        <div
          ref={scrollRef}
          className="h-[500px] space-y-1.5 overflow-y-auto px-2.5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <DayStamp label="Today" />
          {SCRIPT.slice(0, n).map((s, i) =>
            s.text || s.card ? (
              <div key={i} className="space-y-1.5">
                {s.text && (
                  <Bubble from={s.from} time={s.time}>
                    {s.text}
                  </Bubble>
                )}
                {s.card && <ListingCard p={PROPERTY_BY_ID[s.card]} />}
              </div>
            ) : null,
          )}
          {typing && SCRIPT[n]?.from === "me" && <TypingBubble />}
          {done && (
            <p
              className="pt-2 text-center text-[10.5px]"
              style={{ color: WA.sub }}
            >
              Inspection booked in 9 minutes. Nobody on the team touched the phone.
            </p>
          )}
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
