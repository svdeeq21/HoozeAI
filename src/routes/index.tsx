import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  MessageSquare,
  Menu,
  X,
  Minus,
  Plus,
  Moon,
  Sun,
  Building2,
  CalendarCheck,
  UserCheck,
} from "lucide-react";

import {
  PhoneFrame,
  StatusBar,
  ChatListHeader,
  ChatRow,
  Wallpaper,
  HomeIndicator,
} from "../components/phone";
import { ScriptedDemo } from "../components/scripted-demo";
import { TryDemoSection } from "../components/try-section";
import lockup from "../assets/hooze-lockup.png";
import mark from "../assets/hooze-icon.png";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Hooze AI — WhatsApp lead qualification for Nigerian real estate" },
      {
        name: "description",
        content:
          "Hooze AI helps Nigerian real estate businesses turn WhatsApp inquiries into qualified, inspection-ready buyers — answered in seconds, followed up automatically.",
      },
      { property: "og:title", content: "Hooze AI — WhatsApp lead qualification for real estate" },
      {
        property: "og:description",
        content:
          "Every WhatsApp inquiry answered in seconds, qualified on budget and location, and booked for inspection. Built for Nigerian real estate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

/* ---------- Reveal on scroll ---------- */
function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "header";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- Section header ---------- */
function SectionHeader({
  eyebrow,
  title,
  sub,
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-muted leading-relaxed">{sub}</p>}
    </Reveal>
  );
}

const WA_LINK =
  "https://wa.me/2349150754870?text=Hi%20Hooze%20AI%20%E2%80%94%20I'd%20like%20the%20free%20WhatsApp%20lead%20audit%20for%20my%20real%20estate%20business.";

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#how", label: "How it works" },
    { href: "#system", label: "The system" },
    { href: "#try", label: "Try the demo" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all ${
          scrolled
            ? "backdrop-blur-md bg-[color-mix(in_oklab,var(--bg)_80%,transparent)] border-b border-line"
            : "bg-transparent"
        }`}
      >
        <div className="container-wrap flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <img src={mark} alt="" className="h-7 w-7 object-contain" />
            <span className="font-bold tracking-tight text-ink">
              Hooze<span className="text-amber"> AI</span>
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-8 text-sm text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ink transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <a href="#audit" className="btn-amber text-sm">
              Free lead audit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <button
            className="md:hidden text-ink"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-0 z-[60] bg-bg flex flex-col p-6 md:hidden">
          <div className="flex justify-end">
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-6 text-xl mt-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-ink">
                {l.label}
              </a>
            ))}
            <a href="#audit" onClick={() => setOpen(false)} className="btn-amber mt-4">
              Free lead audit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 overflow-hidden">
      <div className="container-wrap grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs text-muted">
              <Building2 className="h-3.5 w-3.5 text-amber" />
              Built for Nigerian real estate teams
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.06]">
              Turn WhatsApp inquiries into{" "}
              <span className="text-amber italic font-serif">qualified buyers</span> —
              automatically.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
              Hooze AI answers every property inquiry in seconds, asks the questions
              your agent would ask — budget, location, timeline, payment plan — and
              hands your team only the people worth calling.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#audit" className="btn-amber">
                Get my free WhatsApp lead audit <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#how" className="btn-ghost">
                See how it works
              </a>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-4 text-xs text-muted">
              15-minute call. We review your real WhatsApp inbox and show you what a
              qualified conversation should look like. No obligation, no pitch deck.
            </p>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <ScriptedDemo />
        </Reveal>
      </div>
    </section>
  );
}




/* ---------- Who it's for ---------- */
function WhoFor() {
  const yes = [
    "Real estate developers and estate marketers in Nigeria",
    "Teams getting 20+ WhatsApp inquiries a week",
    "Agencies where agents chase unqualified leads all day",
    "Anyone running paid ads that land in WhatsApp",
  ];
  const no = [
    "Businesses with no WhatsApp inquiry volume",
    "One-off website projects",
    "Anyone looking for the cheapest option available",
  ];
  return (
    <section className="py-20 border-t border-line">
      <div className="container-wrap grid md:grid-cols-2 gap-5">
        <Reveal>
          <div className="hz-card h-full">
            <p className="eyebrow">Who this is for</p>
            <ul className="mt-5 space-y-3 text-sm">
              {yes.map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 shrink-0 mt-0.5 text-amber" strokeWidth={2.5} />
                  <span className="text-ink/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="hz-card h-full">
            <p className="text-[11px] uppercase tracking-widest text-muted font-semibold">
              Who it&rsquo;s not for
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {no.map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <X className="h-4 w-4 shrink-0 mt-0.5 text-muted" strokeWidth={2.5} />
                  <span className="text-muted">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Mirror ---------- */
function Mirror() {
  const inquiries = [
    { name: "Martin", time: "08:12", preview: "Good morning, is the Lokogoma duplex still available?", tone: "#5B4B8A" },
    { name: "Sarah", time: "09:47", preview: "Please what's the payment plan on the Kubwa land?", tone: "#3A6B7A" },
    { name: "Paul", time: "11:23", preview: "Can I inspect this weekend?", tone: "#6B5335" },
    { name: "Adeyemi", time: "13:05", preview: "Still waiting for a reply 🙏", tone: "#4A6B4A" },
    { name: "Ngozi", time: "16:41", preview: "It's fine, I've paid deposit with another agent.", tone: "#7A4A5A" },
  ];
  // Reveal one contact at a time, then pause on the full inbox before looping.
  const [count, setCount] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= inquiries.length ? 1 : c + 1));
    }, 1500);
    return () => clearInterval(id);
  }, [inquiries.length]);
  const shown = inquiries.slice(0, count);

  return (
    <section className="py-24 border-t border-line relative overflow-hidden">
      <div className="container-wrap relative">
        <SectionHeader
          eyebrow="Sound familiar?"
          title={
            <>
              Your inbox is full of people who{" "}
              <span className="text-amber italic font-serif">were</span> ready to buy.
            </>
          }
          sub="Property buyers don't wait. They message three agents at once and go with whoever answers first — and whoever asks the right questions."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-6 items-start">
          <Reveal>
            <PhoneFrame>
              <StatusBar time="10:52" />
              <ChatListHeader unread={shown.length} />
              <Wallpaper>
                <div className="h-[420px] overflow-hidden px-1">
                  {shown.map((c) => (
                    <ChatRow
                      key={c.name}
                      name={c.name}
                      preview={c.preview}
                      time={c.time}
                      unread={1}
                      tone={c.tone}
                    />
                  ))}
                  {count >= inquiries.length && (
                    <p className="pt-3 text-center text-[11px] text-red">
                      5 inquiries. 0 replies. 0 inspections booked.
                    </p>
                  )}
                </div>
                <HomeIndicator />
              </Wallpaper>
            </PhoneFrame>
          </Reveal>

          <Reveal delay={160}>
            <div className="space-y-4">
              {[
                {
                  title: "You reply at 11 PM, when it's already over.",
                  body: "By the time your agent gets back to the phone, the buyer has spoken to two other marketers and inspected with one of them.",
                },
                {
                  title: "Your agents chase people who were never buying.",
                  body: "Nobody asked about budget, timeline or payment plan up front — so half the inspections you drive to are wasted fuel and wasted Saturdays.",
                },
                {
                  title: "Nobody knows where the leads went.",
                  body: "Inquiries live in one person's phone. When they travel, resign, or forget, the pipeline goes with them.",
                },
              ].map((b) => (
                <div key={b.title} className="hz-card">
                  <p className="font-semibold">{b.title}</p>
                  <p className="mt-1.5 text-sm text-muted leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Before / After ---------- */
function BeforeAfter() {
  const [after, setAfter] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setAfter((v) => !v), 4200);
    return () => clearInterval(id);
  }, []);

  const rows = [
    { label: "First reply time", before: "4h 12m", after: "Under 30 seconds" },
    { label: "Inquiries answered", before: "Whoever your agent gets to", after: "Every single one" },
    { label: "Qualified before a call", before: "Rarely", after: "Budget, location, timeline, plan" },
    { label: "Follow-up", before: "Once, if remembered", after: "5 touches over 14 days" },
    { label: "Where leads live", before: "One agent's phone", after: "One shared dashboard" },
  ];

  return (
    <section className="py-24 border-t border-line bg-bg-2">
      <div className="container-wrap">
        <SectionHeader
          center
          eyebrow="Before → After"
          title={
            <>
              Same inquiries. Same team.{" "}
              <span className="text-amber italic font-serif">Different outcome.</span>
            </>
          }
          sub="We're not promising you more leads. We're making sure the ones you already pay for get handled properly."
        />

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setAfter(false)}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${
                !after ? "border-line bg-surface text-ink" : "border-line/50 text-muted"
              }`}
            >
              <Moon className="h-4 w-4" /> Today
            </button>
            <button
              onClick={() => setAfter(true)}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${
                after ? "border-amber/60 bg-amber/10 text-amber" : "border-line/50 text-muted"
              }`}
            >
              <Sun className="h-4 w-4" /> With Hooze
            </button>
          </div>

          <div className="mt-8 hz-card divide-y divide-line p-0">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[1fr_1.2fr] gap-4 px-5 py-4">
                <p className="text-sm text-muted">{r.label}</p>
                <p
                  key={after ? `a-${r.label}` : `b-${r.label}`}
                  className={`text-sm font-semibold animate-[fade-in_.4s_ease-out] ${
                    after ? "text-amber" : "text-ink/70"
                  }`}
                >
                  {after ? r.after : r.before}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted">
            Tap either side — or watch it flip on its own.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- The system ---------- */
function System() {
  const parts = [
    {
      icon: MessageSquare,
      title: "Instant, on-brand replies",
      body: "Trained on your listings, prices, estates, payment plans and policies. It answers in your tone — in English or Pidgin — day or night.",
    },
    {
      icon: UserCheck,
      title: "Qualification before your agent spends a minute",
      body: "Budget, preferred location, outright or instalment, timeline, and whether they've inspected before. Unqualified chats never reach your team.",
    },
    {
      icon: CalendarCheck,
      title: "Inspection booking",
      body: "Serious buyers get offered real slots from your agents' calendars and get confirmed and reminded automatically.",
    },
    {
      icon: Clock,
      title: "Follow-up that doesn't forget",
      body: "Quiet leads get a structured sequence over the next two weeks — not one 'are you still interested?' at midnight.",
    },
  ];
  return (
    <section id="system" className="py-24 border-t border-line">
      <div className="container-wrap">
        <SectionHeader
          center
          eyebrow="The system"
          title="One WhatsApp number. Four jobs done properly."
          sub="This is a system we build into your business and hand you the keys to — not an agency retainer where work disappears into a black box."
        />
        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {parts.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="hz-card h-full">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-line bg-bg text-amber">
                  <p.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  const steps = [
    {
      n: "01",
      day: "Week 1",
      title: "We learn your listings and your script",
      body: "One working session. Your estates, prices, payment plans, objections, and the exact questions your best agent asks before booking an inspection.",
    },
    {
      n: "02",
      day: "Week 2",
      title: "We build and test it on real conversations",
      body: "The assistant is connected to your WhatsApp Business number, trained on your material, and tested against your last month of real inquiries before it talks to anyone.",
    },
    {
      n: "03",
      day: "Week 3 onward",
      title: "It goes live, we watch it, we tune it",
      body: "We monitor the first weeks of live conversations with you, correct answers it gets wrong, and hand your team the dashboard.",
    },
  ];
  return (
    <section id="how" className="py-24 border-t border-line bg-bg-2">
      <div className="container-wrap">
        <SectionHeader
          center
          eyebrow="How it works"
          title="Three weeks from kickoff to live."
          sub="Nothing for your team to install or learn. It runs on the WhatsApp number your buyers already message."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="hz-card h-full relative overflow-hidden">
                <span className="absolute -top-4 -right-2 text-[110px] font-bold text-line/70 leading-none select-none">
                  {s.n}
                </span>
                <p className="text-[11px] uppercase tracking-widest text-amber font-medium">
                  {s.day}
                </p>
                <h3 className="mt-3 text-lg font-semibold relative">{s.title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed relative">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  return (
    <section id="pricing" className="py-24 border-t border-line">
      <div className="container-wrap max-w-4xl">
        <SectionHeader
          center
          eyebrow="Investment"
          title="One build. One yearly retainer."
          sub="Priced against what the system replaces, and scoped to your listing volume and number of agents."
        />
        <Reveal>
          <div className="mt-12 hz-card border-amber/40 relative overflow-hidden">
            <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted font-medium">
                  Build — first year
                </p>
                <p className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
                  From <span className="text-amber">₦1.5M</span>
                </p>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Covers discovery, training on your listings, WhatsApp Business setup,
                  qualification and booking flows, the dashboard, and the first weeks of
                  live tuning.
                </p>
                <p className="mt-4 text-sm text-muted">
                  After year one:{" "}
                  <span className="text-ink font-semibold">yearly retainer from ₦500k</span> —
                  hosting, model and API costs, updates as your listings change, and ongoing
                  tuning.
                </p>
                <p className="mt-4 text-xs text-muted">
                  For context: a single junior agent on salary costs more per year, and one
                  additional closed unit typically covers the build.
                </p>
              </div>
              <div className="border-l border-line md:pl-8">
                <p className="text-sm text-muted leading-relaxed">
                  Final number depends on listing volume, number of agents, and the systems
                  we connect to. We&rsquo;ll walk through your inbox on a short call and send
                  one fixed quote.
                </p>
                <a href="#audit" className="btn-amber w-full mt-5">
                  Get a tailored quote <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3 text-xs text-muted text-center">
                  We take a small number of builds at a time so each one gets tuned properly.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Honesty / early-stage credibility ---------- */
function Honesty() {
  return (
    <section className="py-20 border-t border-line bg-bg-2">
      <div className="container-wrap max-w-3xl">
        <Reveal>
          <div className="hz-card">
            <p className="eyebrow">Where we are</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
              We&rsquo;re early — and we&rsquo;d rather say so.
            </h2>
            <div className="mt-5 space-y-3 text-sm text-muted leading-relaxed">
              <p>
                Hooze AI is a young studio out of Abuja. We are not going to show you
                invented testimonials or screenshots of dashboards that never existed.
              </p>
              <p>
                What we will do on the call is open your actual WhatsApp inbox with you,
                count the inquiries that never got a reply last month, and show you a live
                assistant answering your own listings before you pay anything.
              </p>
              <p className="text-ink">
                If the numbers in your inbox don&rsquo;t justify the build, we&rsquo;ll tell
                you that on the call.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const items = [
    {
      q: "Does it use my existing WhatsApp number?",
      a: "We set it up on WhatsApp Business API using your business number. Your buyers keep messaging the same line they already know.",
    },
    {
      q: "Will buyers know they're talking to an AI?",
      a: "We're upfront about it in the greeting, and it hands over to a human agent the moment someone asks or the conversation goes beyond what it should handle.",
    },
    {
      q: "What if it gives a wrong price or a wrong answer?",
      a: "It only answers from the listing and policy material you give us, and it escalates anything outside that instead of guessing. During the first weeks we review live conversations with you and correct anything it handles badly.",
    },
    {
      q: "Can my agents take over a conversation?",
      a: "Yes. Any agent can jump into a chat at any point and the assistant steps back for that conversation.",
    },
    {
      q: "Do we need any technical knowledge?",
      a: "No. We handle the setup, the integrations and the training. Your team uses a dashboard and their normal WhatsApp.",
    },
    {
      q: "What exactly does the retainer cover?",
      a: "Hosting, model and API usage, updates when your listings, prices or payment plans change, and ongoing tuning of the conversation flow. It starts after the first year.",
    },
    {
      q: "We're not in real estate. Can you still help?",
      a: "Possibly, but real estate is our focus right now and it's where we do our best work. Message us and we'll be honest about whether we're the right fit.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 border-t border-line">
      <div className="container-wrap max-w-3xl">
        <SectionHeader center eyebrow="FAQ" title="Straight answers." />
        <div className="mt-12 divide-y divide-line border-y border-line">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-medium">{it.q}</span>
                  <span className="shrink-0 text-amber">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? 260 : 0 }}
                >
                  <p className="pb-5 text-sm text-muted leading-relaxed">{it.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function Audit() {
  return (
    <section id="audit" className="py-24 border-t border-line bg-bg-2">
      <div className="container-wrap max-w-4xl">
        <div className="hz-card p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative">
            <p className="eyebrow">Free WhatsApp lead audit</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Find out how many buyers you lost{" "}
              <span className="text-amber italic font-serif">last month.</span>
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              A 15-minute call. We go through your WhatsApp inbox together, count the
              unanswered inquiries and slow replies, and show you the assistant answering
              your own listings.
            </p>
            <ul className="mt-8 grid sm:grid-cols-3 gap-3 text-sm text-left max-w-2xl mx-auto">
              {[
                "Your missed-inquiry count from last month",
                "A live demo on your own listings",
                "One fixed quote, or an honest no",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-muted">
                  <Check className="h-4 w-4 shrink-0 mt-0.5 text-amber" strokeWidth={2.5} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-amber">
                <MessageSquare className="h-4 w-4" /> Get my free lead audit
              </a>
              <a href="mailto:hello@hooze.ai" className="btn-ghost">
                Email us instead
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="py-12 border-t border-line">
      <div className="container-wrap flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between text-sm text-muted">
        <div>
          <img src={lockup} alt="Hooze AI" className="h-10 w-auto object-contain" />
          <p className="mt-3 max-w-xs text-xs leading-relaxed">
            WhatsApp lead qualification for Nigerian real estate. Abuja, Nigeria.
          </p>
        </div>
        <ul className="flex flex-wrap gap-6">
          <li><a href="#how" className="hover:text-ink">How it works</a></li>
          <li><a href="#pricing" className="hover:text-ink">Pricing</a></li>
          <li><a href="#audit" className="hover:text-ink">Free audit</a></li>
        </ul>
        <p className="text-xs">© {new Date().getFullYear()} Hooze AI</p>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Nav />
      <main>
        <Hero />
        <WhoFor />
        <Mirror />
        <BeforeAfter />
        <System />
        <TryDemoSection />
        <Process />
        <Pricing />
        <Honesty />
        <Faq />
        <Audit />
      </main>
      <Footer />
    </div>
  );
}
