import { type ReactNode, forwardRef } from "react";
import { Check, Phone, Video, ArrowLeft, MoreVertical, Search, Camera } from "lucide-react";
import type { DemoProperty } from "../lib/demo-properties";

/* Device + WhatsApp replica colours. These are hardware/app colours of a real
   device screenshot, not brand tokens — kept together here on purpose. */
export const WA = {
  wallpaper: "#0B141A",
  header: "#1F2C34",
  incoming: "#202C33",
  outgoing: "#005C4B",
  text: "#E9EDEF",
  sub: "#8696A0",
  tick: "#53BDEB",
  bar: "#2A3942",
};

/* ---------- Realistic phone hardware ---------- */
export const PhoneFrame = forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string; tilt?: boolean }
>(function PhoneFrame({ children, className = "", tilt = false }, ref) {
  return (
    <div
      ref={ref}
      className={`relative mx-auto w-[300px] sm:w-[326px] ${className}`}
      style={
        tilt
          ? { transform: "perspective(1600px) rotateY(-7deg) rotateX(2deg)" }
          : undefined
      }
    >
      {/* contact shadow on the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[78%] -translate-x-1/2 rounded-[50%] blur-2xl"
        style={{ background: "rgba(0,0,0,0.65)" }}
      />

      {/* side buttons */}
      <div
        aria-hidden
        className="absolute -left-[3px] top-[112px] h-9 w-[3px] rounded-l-sm"
        style={{ background: "linear-gradient(180deg,#4a4a4e,#2a2a2d)" }}
      />
      <div
        aria-hidden
        className="absolute -left-[3px] top-[160px] h-9 w-[3px] rounded-l-sm"
        style={{ background: "linear-gradient(180deg,#4a4a4e,#2a2a2d)" }}
      />
      <div
        aria-hidden
        className="absolute -right-[3px] top-[140px] h-16 w-[3px] rounded-r-sm"
        style={{ background: "linear-gradient(180deg,#4a4a4e,#2a2a2d)" }}
      />

      {/* titanium rail */}
      <div
        className="relative rounded-[2.7rem] p-[3px]"
        style={{
          background:
            "linear-gradient(150deg,#6b6b70 0%,#232326 18%,#3d3d41 42%,#17171a 70%,#55555a 100%)",
          boxShadow:
            "0 40px 70px -30px rgba(0,0,0,.9), 0 2px 0 0 rgba(255,255,255,.06) inset",
        }}
      >
        {/* bezel */}
        <div className="relative rounded-[2.55rem] bg-black p-[9px]">
          <div
            className="relative overflow-hidden rounded-[2.05rem]"
            style={{ background: WA.wallpaper }}
          >
            {/* dynamic island */}
            <div
              aria-hidden
              className="absolute left-1/2 top-[9px] z-30 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black"
            >
              <span
                className="absolute right-[10px] top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #26343f, #06090b 65%)",
                }}
              />
            </div>
            {children}
            {/* glass reflection */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-40"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,.07) 0%, rgba(255,255,255,.02) 22%, rgba(255,255,255,0) 42%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

/* ---------- Screen chrome ---------- */
export function StatusBar({ time = "4:41" }: { time?: string }) {
  return (
    <div
      className="relative z-20 flex items-center justify-between px-6 pt-[13px] pb-[10px] text-[12px] font-semibold"
      style={{ background: WA.header, color: WA.text }}
    >
      <span className="tracking-tight">{time}</span>
      <span className="flex items-center gap-1.5 opacity-90">
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <rect x="0" y="7" width="2.5" height="4" rx="0.6" />
          <rect x="4" y="5" width="2.5" height="6" rx="0.6" />
          <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.6" />
          <rect x="12" y="0" width="2.5" height="11" rx="0.6" opacity="0.4" />
        </svg>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
          <path d="M7 10.5 0.4 3.6A9.3 9.3 0 0 1 13.6 3.6L7 10.5Z" opacity="0.9" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 24 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="20"
            height="11"
            rx="3"
            stroke="currentColor"
            opacity="0.5"
          />
          <rect x="2" y="2" width="15" height="8" rx="1.8" fill="currentColor" />
          <path d="M22 4v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

export function ChatHeader({
  name,
  status,
  avatar,
  initials,
}: {
  name: string;
  status: ReactNode;
  avatar?: string;
  initials?: string;
}) {
  return (
    <div
      className="relative z-20 flex items-center gap-2.5 px-3 pb-2.5"
      style={{ background: WA.header, color: WA.text }}
    >
      <ArrowLeft className="h-5 w-5 shrink-0 opacity-70" />
      {avatar ? (
        <img
          src={avatar}
          alt=""
          className="h-9 w-9 shrink-0 rounded-full object-contain"
          style={{ background: "#0E0E0F" }}
        />
      ) : (
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-semibold"
          style={{ background: "#3B4A54", color: WA.text }}
        >
          {initials}
        </span>
      )}
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-[14.5px] font-medium">{name}</p>
        <p className="truncate text-[11px]" style={{ color: WA.sub }}>
          {status}
        </p>
      </div>
      <Video className="h-[18px] w-[18px] opacity-70" />
      <Phone className="h-[16px] w-[16px] opacity-70" />
      <MoreVertical className="h-[18px] w-[18px] opacity-70" />
    </div>
  );
}

export function Wallpaper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        background: WA.wallpaper,
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {children}
    </div>
  );
}

export function Bubble({
  from,
  time,
  children,
}: {
  from: "them" | "me";
  time: string;
  children: ReactNode;
}) {
  const me = from === "me";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className="relative max-w-[85%] px-2 py-[5px] text-[13.5px] leading-[1.35]"
        style={{
          background: me ? WA.outgoing : WA.incoming,
          color: WA.text,
          borderRadius: 8,
          borderTopRightRadius: me ? 0 : 8,
          borderTopLeftRadius: me ? 8 : 0,
          boxShadow: "0 1px 0.5px rgba(0,0,0,.35)",
          animation: "hz-fade .28s ease-out",
        }}
      >
        <span className="whitespace-pre-wrap break-words">{children}</span>
        <span
          className="float-right ml-2 mt-[6px] flex items-center gap-[2px] text-[10px]"
          style={{ color: me ? "rgba(233,237,239,.6)" : WA.sub }}
        >
          {time}
          {me && (
            <span className="relative inline-flex" style={{ color: WA.tick }}>
              <Check className="h-3 w-3" strokeWidth={3} />
              <Check className="-ml-[7px] h-3 w-3" strokeWidth={3} />
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div
        className="flex items-center gap-1 px-3 py-[10px]"
        style={{
          background: WA.incoming,
          borderRadius: 8,
          borderTopLeftRadius: 0,
          animation: "hz-fade .2s ease-out",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-[6px] w-[6px] rounded-full"
            style={{
              background: WA.sub,
              animation: `hz-blink 1.2s ${i * 0.18}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ListingCard({ p }: { p: DemoProperty }) {
  return (
    <div className="flex justify-start">
      <div
        className="w-[85%] overflow-hidden p-[3px]"
        style={{
          background: WA.incoming,
          borderRadius: 8,
          borderTopLeftRadius: 0,
          animation: "hz-fade .3s ease-out",
        }}
      >
        <img
          src={p.image}
          alt={`${p.title} in ${p.area}`}
          loading="lazy"
          width={1024}
          height={768}
          className="h-[112px] w-full rounded-[6px] object-cover"
        />
        <div className="px-1.5 pb-1.5 pt-2" style={{ color: WA.text }}>
          <p className="text-[13px] font-semibold leading-snug">{p.title}</p>
          <p className="text-[11.5px]" style={{ color: WA.sub }}>
            {p.area} · {p.type}
          </p>
          <p className="mt-1 text-[13.5px] font-semibold">{p.price}</p>
          <p className="text-[11px] leading-snug" style={{ color: WA.sub }}>
            {p.terms}
          </p>
          <p className="mt-1.5 text-[10px] uppercase tracking-wider" style={{ color: WA.sub }}>
            Demo data
          </p>
        </div>
      </div>
    </div>
  );
}

export function DayStamp({ label }: { label: string }) {
  return (
    <div className="flex justify-center py-1">
      <span
        className="rounded px-2 py-[3px] text-[10.5px] uppercase tracking-wide"
        style={{ background: WA.bar, color: WA.sub }}
      >
        {label}
      </span>
    </div>
  );
}

export function HomeIndicator() {
  return (
    <div className="flex justify-center pb-[7px] pt-[6px]" style={{ background: WA.header }}>
      <span className="h-[4px] w-[110px] rounded-full bg-white/30" />
    </div>
  );
}

/* ---------- WhatsApp chat list (inbox) ---------- */
export function ChatListHeader({ unread }: { unread: number }) {
  return (
    <div
      className="relative z-20 px-4 pb-2.5"
      style={{ background: WA.header, color: WA.text }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[19px] font-semibold">WhatsApp</p>
        <div className="flex items-center gap-3.5 opacity-70">
          <Camera className="h-[17px] w-[17px]" />
          <Search className="h-[17px] w-[17px]" />
          <MoreVertical className="h-[18px] w-[18px]" />
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-4 text-[12.5px]">
        <span className="pb-1.5 font-medium" style={{ borderBottom: "2px solid #00A884", color: "#00A884" }}>
          Chats {unread > 0 && <span>({unread})</span>}
        </span>
        <span className="pb-1.5" style={{ color: WA.sub }}>Status</span>
        <span className="pb-1.5" style={{ color: WA.sub }}>Calls</span>
      </div>
    </div>
  );
}

export function ChatRow({
  name,
  preview,
  time,
  unread = 0,
  tone = "#3B4A54",
}: {
  name: string;
  preview: string;
  time: string;
  unread?: number;
  tone?: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5"
      style={{ animation: "hz-fade .3s ease-out" }}
    >
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[13px] font-semibold"
        style={{ background: tone, color: WA.text }}
      >
        {initials}
      </span>
      <div className="min-w-0 flex-1 border-b pb-2.5" style={{ borderColor: "rgba(255,255,255,.06)" }}>
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[14.5px] font-medium" style={{ color: WA.text }}>
            {name}
          </p>
          <span
            className="shrink-0 text-[10.5px]"
            style={{ color: unread ? "#00A884" : WA.sub }}
          >
            {time}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-[12.5px]" style={{ color: WA.sub }}>
            {preview}
          </p>
          {unread > 0 && (
            <span
              className="grid h-[18px] min-w-[18px] shrink-0 place-items-center rounded-full px-1 text-[10.5px] font-semibold"
              style={{ background: "#00A884", color: "#0B141A" }}
            >
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
