import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
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
import { hoozeDemoReply } from "../lib/hooze-chat.functions";
import mark from "../assets/hooze-icon.png";

type Line = { from: "them" | "me"; text: string; time: string; cards: string[] };

const OPENER =
  "Hi, welcome. I'm Hooze, the property consultant for this listing page.\n\nI can help you narrow down by budget, area, property type and what you actually need the place for. What brings you here today?";

function now() {
  return new Date().toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function parse(raw: string) {
  const cards: string[] = [];
  const text = raw
    .replace(/\[\[PROPERTY:([a-z-]+)\]\]/gi, (_m, id: string) => {
      if (PROPERTY_BY_ID[id] && !cards.includes(id)) cards.push(id);
      return "";
    })
    .trim();
  return { text, cards };
}

export function TryHooze() {
  const send = useServerFn(hoozeDemoReply);
  const [lines, setLines] = useState<Line[]>([
    { from: "me", text: OPENER, time: "", cards: [] },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [clock, setClock] = useState("9:41");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setClock(now().replace(/\s?[AP]M/i, ""));
    setLines((prev) => prev.map((l, i) => (i === 0 ? { ...l, time: now() } : l)));
  }, []);


  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines, busy]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = input.trim();
    if (!value || busy) return;
    const next: Line[] = [...lines, { from: "them", text: value, time: now(), cards: [] }];
    setLines(next);
    setInput("");
    setBusy(true);
    try {
      const history = next.map((l) => ({
        role: l.from === "me" ? ("assistant" as const) : ("user" as const),
        content: l.text,
      }));
      const res = await send({ data: { messages: history } });
      const { text, cards } = parse(res.text);
      setLines((prev) => [...prev, { from: "me", text, time: now(), cards }]);
    } catch {
      setLines((prev) => [
        ...prev,
        {
          from: "me",
          text: "Sorry, that didn't go through. Try sending it again.",
          time: now(),
          cards: [],
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <PhoneFrame>
      <StatusBar time={clock} />
      <ChatHeader
        name="Hooze — Property Consultant"
        status={busy ? "typing…" : "online"}
        avatar={mark}
      />
      <Wallpaper>
        <div
          ref={scrollRef}
          className="h-[480px] space-y-1.5 overflow-y-auto px-2.5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <DayStamp label="Demo conversation" />
          {lines.map((l, i) => (
            <div key={i} className="space-y-1.5">
              {l.text && (
                <Bubble from={l.from} time={l.time}>
                  {l.text}
                </Bubble>
              )}
              {l.cards.map((id) => (
                <ListingCard key={id} p={PROPERTY_BY_ID[id]} />
              ))}
            </div>
          ))}
          {busy && <TypingBubble />}
        </div>
        <form
          onSubmit={submit}
          className="flex items-center gap-2 px-2 py-2"
          style={{ background: WA.header }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type like a real customer…"
            aria-label="Message Hooze"
            maxLength={400}
            className="flex-1 rounded-full px-3 py-2 text-[13px] outline-none"
            style={{ backgroundColor: WA.bar, color: WA.text }}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Send message"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full disabled:opacity-50"
            style={{ background: "#00A884" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0B141A">
              <path d="M2 21 23 12 2 3v7l15 2-15 2v7Z" />
            </svg>
          </button>
        </form>
        <HomeIndicator />
      </Wallpaper>
    </PhoneFrame>
  );
}
