import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  MessageCircle,
  MessageSquare,
  Menu,
  X,
  Minus,
  Plus,
  Building2,
  CalendarCheck,
  UserCheck,
  ShoppingBag,
  UtensilsCrossed,
  GraduationCap,
  Wrench,
  Stethoscope,
  CalendarClock,
  Briefcase,
  ShoppingCart,
  LifeBuoy,
  Workflow,
  Plug,
  ShieldCheck,
  Rocket,
} from "lucide-react";

import {
  PhoneFrame,
  StatusBar,
  ChatListHeader,
  ChatRow,
  Wallpaper,
  HomeIndicator,
} from "../components/phone";
import { ScenarioDemo } from "../components/scripted-demo";
import {
  SmoothScroll,
  ScrollProgress,
  SplitWords,
  DotField,
  Magnetic,
} from "../components/motion";
import { TryDemoSection } from "../components/try-section";
import lockup from "../assets/hooze-lockup.png";
import mark from "../assets/hooze-icon.png";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Hooze AI — AI sales systems and business automation" },
      {
        name: "description",
        content:
          "Hooze builds AI-powered sales systems and business automations that answer enquiries, follow up with customers and move work forward — on the WhatsApp number your customers already use.",
      },
      {
        property: "og:title",
        content: "Hooze AI — AI sales systems and business automation",
      },
      {
        property: "og:description",
        content:
          "Your business has work to do. Hooze handles the repeatable parts — enquiries, qualification, orders, bookings and follow-ups.",
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
        if (e?.isIntersecting) {
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
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <span className="eyebrow border-l-2 border-amber pl-3">{eyebrow}</span>
      <h2 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl text-ink pb-1">
        {typeof title === "string" ? <SplitWords text={title} /> : title}
      </h2>
      {sub && (
        <p
          className={`mt-5 text-lg text-muted leading-relaxed ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}

const WA_LINK =
  "https://wa.me/2349150754870?text=Hi%20Hooze%20AI%20%E2%80%94%20I%27d%20like%20to%20talk%20about%20automating%20part%20of%20my%20business.";

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 300 && y > last + 4);
      if (y < last - 4 || y <= 300) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#industries", label: "Industries" },
    { href: "#automations", label: "What it automates" },
    { href: "#try", label: "Try the demo" },
    { href: "#process", label: "Process" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "pt-3" : "pt-5"} ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        <div
          className={`mx-auto flex h-14 items-center justify-between rounded-full px-3 pl-5 transition-all duration-500 ${scrolled ? "glass max-w-5xl shadow-[var(--shadow-card)]" : "max-w-[1200px] border border-transparent"}`}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <img src={mark} alt="" className="h-7 w-7 object-contain" />
            <span className="font-bold tracking-tight text-ink">
              Hooze<span className="text-amber"> AI</span>
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-6 text-[13px] text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ink transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <a href="#brief" className="btn-amber whitespace-nowrap text-sm !py-2 !px-4">
              Describe your workflow <ArrowRight className="h-4 w-4" />
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
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#brief"
              onClick={() => setOpen(false)}
              className="btn-amber mt-4"
            >
              Describe your workflow <ArrowRight className="h-4 w-4" />
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
    <section
      id="top"
      className="relative overflow-hidden border-b border-line pt-28 pb-16 lg:pt-32"
    >
      <DotField className="[mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent_80%)]" />
      <div className="container-wrap relative">
        <div className="max-w-4xl">
          <p className="eyebrow border-l-2 border-amber pl-3">
            AI sales systems &amp; business automation
          </p>
          <h1 className="display mt-7 text-5xl sm:text-6xl lg:text-[4.5rem] text-ink">
            <SplitWords text="Your business gets the enquiries." delay={150} />{" "}
            <span className="font-serif font-normal italic tracking-normal text-amber">
              <SplitWords text="Hooze helps move them forward." delay={550} />
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
            We build AI-powered sales systems and automations that answer
            repetitive enquiries, qualify opportunities, coordinate follow-ups
            and pass the right next action to your team, configured around how
            your business actually works.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#brief" className="btn-amber">
              Discuss your workflow <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#try" className="btn-ghost">
              Explore what Hooze can do
            </a>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-5 py-3 text-xs text-muted">
            <span className="font-mono uppercase tracking-widest">
              Hooze · enquiry to next action
            </span>
            <span className="rounded border border-line px-2 py-0.5">
              Interactive sample · not live customer data
            </span>
          </div>
          <div className="p-6 lg:p-10">
            <ScenarioDemo scenarioId="realestate" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Industries ---------- */
type Industry = {
  id: string;
  name: string;
  icon: typeof ShoppingBag;
  tagline: string;
  problems: string;
  workflows: string[];
  outcome: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: "commerce",
    name: "Retail & commerce",
    icon: ShoppingBag,
    tagline: "Product enquiries, order capture, availability, follow-ups.",
    problems:
      "Customers ask about products and prices in chat, then disappear while your team is busy with the shop floor.",
    workflows: [
      "Answer product and price questions from your catalogue",
      "Capture orders and delivery details in chat",
      "Check availability before promising anything",
      "Follow up on abandoned enquiries",
    ],
    outcome:
      "Every product question answered instantly, and orders captured even after closing time.",
  },
  {
    id: "restaurants",
    name: "Restaurants & catering",
    icon: UtensilsCrossed,
    tagline: "Menus, orders, catering enquiries, booking requests.",
    problems:
      "Menu questions, catering quotes and table requests arrive across WhatsApp at the busiest hours of the day.",
    workflows: [
      "Share menus and answer dish questions",
      "Take orders and catering enquiries with details",
      "Capture booking requests and confirm slots",
      "Send reminders before reservations",
    ],
    outcome:
      "Fewer missed orders during rush hours, and catering enquiries handled like a dedicated coordinator.",
  },
  {
    id: "schools",
    name: "Schools & education",
    icon: GraduationCap,
    tagline:
      "Admissions enquiries, fees, application guidance, parent communication.",
    problems:
      "Admissions season floods the office with the same questions about fees, requirements and deadlines.",
    workflows: [
      "Answer admissions and fee questions from your published information",
      "Guide parents through application steps",
      "Collect enquiry details for follow-up",
      "Route complex cases to the admin team",
    ],
    outcome:
      "Parents get accurate answers immediately, and your admin team only handles the cases that need them.",
  },
  {
    id: "trades",
    name: "Trades & home services",
    icon: Wrench,
    tagline: "Quote requests, job scheduling, availability, follow-ups.",
    problems:
      "You're on a job when the next customer messages — and by the time you reply, they've called someone else.",
    workflows: [
      "Capture job details and photos requests",
      "Give ballpark guidance from your price list",
      "Offer real booking slots from your calendar",
      "Follow up on quotes that went quiet",
    ],
    outcome:
      "Quote requests answered while you're still on the tools, and fewer quotes left to go cold.",
  },
  {
    id: "clinics",
    name: "Clinics & health",
    icon: Stethoscope,
    tagline: "Appointment requests, service information, reminders.",
    problems:
      "Front-desk staff spend the day answering the same questions about services, hours and appointment availability.",
    workflows: [
      "Answer questions about services and opening hours",
      "Capture appointment requests and patient details",
      "Send confirmations and visit reminders",
      "Escalate anything clinical to staff — never medical advice",
    ],
    outcome:
      "A calmer front desk, fewer no-shows, and patients who get answers at any hour.",
  },
  {
    id: "appointments",
    name: "Appointments & bookings",
    icon: CalendarClock,
    tagline:
      "Salons, studios, consultants — scheduling, rescheduling, reminders.",
    problems:
      "Your day is spent delivering the service, while booking requests pile up unanswered.",
    workflows: [
      "Offer available slots and confirm bookings",
      "Handle reschedules and cancellations by rule",
      "Send reminders that cut no-shows",
      "Follow up for rebooking after a visit",
    ],
    outcome:
      "A fuller calendar with less back-and-forth, and fewer empty chairs.",
  },
  {
    id: "realestate",
    name: "Real estate",
    icon: Building2,
    tagline: "Listing enquiries, buyer qualification, inspection booking.",
    problems:
      "Buyers message three agents at once and go with whoever answers first — most inquiries never get a proper reply.",
    workflows: [
      "Answer from your verified listings, prices and payment plans",
      "Qualify on budget, location, timeline and purpose",
      "Book inspections into agents' calendars",
      "Run structured follow-up over two weeks",
    ],
    outcome:
      "Every inquiry handled like your best agent would, and only qualified buyers reaching your team.",
  },
  {
    id: "professional",
    name: "Professional services",
    icon: Briefcase,
    tagline: "Client intake, scoping questions, consultation booking.",
    problems:
      "Potential clients enquire at odd hours, and nobody asks the qualifying questions before the first call.",
    workflows: [
      "Capture the client's situation and what they need",
      "Ask your standard intake questions",
      "Book consultations into the right person's calendar",
      "Send pre-meeting information automatically",
    ],
    outcome:
      "First meetings that start prepared, with time-wasters filtered out before they reach your calendar.",
  },
];

const DEMO_FOR: Record<string, string> = {
  restaurants: "restaurant",
  schools: "school",
  trades: "homeservices",
  realestate: "realestate",
};

function Industries() {
  const [active, setActive] = useState<Industry>(INDUSTRIES[0]!);
  function pick(ind: Industry) {
    setActive(ind);
  }
  return (
    <section id="industries" className="py-28 border-b border-line">
      <div className="container-wrap">
        <SectionHeader
          eyebrow="01 — Your industry"
          title="One system. Shaped to how your business sells."
          sub="Select an industry to see the problem, the workflows and the intended outcome. Not every industry solution is production-ready today, and we say so on the call."
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-[280px_1fr]">
          <div
            role="tablist"
            aria-label="Industries"
            className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible"
          >
            {INDUSTRIES.map((ind) => {
              const on = ind.id === active.id;
              return (
                <button
                  key={ind.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(ind)}
                  className={`flex shrink-0 items-center gap-3 border-l-2 px-4 py-3 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-amber ${
                    on
                      ? "border-amber text-ink"
                      : "border-line text-muted hover:text-ink"
                  }`}
                >
                  <ind.icon className="h-4 w-4" strokeWidth={1.5} />
                  {ind.name}
                </button>
              );
            })}
          </div>
          <div
            key={active.id}
            role="tabpanel"
            className="grid gap-10 md:grid-cols-[1fr_1.1fr] animate-[hz-fade_.3s_ease-out]"
          >
            <div>
              <h3 className="font-serif text-4xl tracking-tight">
                {active.name}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">
                {active.problems}
              </p>
              <p className="mt-6 border-l-2 border-amber pl-4 text-ink/90">
                {active.outcome}
              </p>
            </div>
            <div>
              <p className="eyebrow">What Hooze runs</p>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {active.workflows.map((w) => (
                  <li key={w} className="flex items-start gap-3 py-3 text-sm">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber"
                      strokeWidth={2}
                    />
                    <span className="text-ink/90">{w}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                {DEMO_FOR[active.id] && (
                  <button
                    className="btn-amber text-sm"
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("hz-niche", {
                          detail: DEMO_FOR[active.id] ?? "",
                        }),
                      );
                      document
                        .getElementById("try")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    See the {active.name.toLowerCase()} demo{" "}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
                <a href="#brief" className="btn-ghost text-sm">
                  Discuss {active.name.toLowerCase()}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Fact band (non-numeric, all true of the offer) ---------- */
function FactBand() {
  const facts = [
    ["Your number", "Runs on your own WhatsApp Business number"],
    ["Human handover", "Unusual conversations pass to your team with context"],
    ["Built per business", "Configured around your prices, rules and calendar"],
    ["One scoped quote", "Priced to your volume and the systems we connect"],
  ];
  return (
    <section
      aria-label="How Hooze is delivered"
      className="border-b border-line"
    >
      <dl className="container-wrap grid grid-cols-2 lg:grid-cols-4">
        {facts.map(([k, v], i) => (
          <div
            key={k}
            className={`py-8 pr-6 ${i > 0 ? "lg:border-l lg:pl-8 lg:border-line" : ""}`}
          >
            <dt className="font-serif text-2xl text-ink">{k}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------- Automations: capability panels with product UI ---------- */
function UIFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-xs text-muted">
        <span className="font-mono uppercase tracking-widest">{title}</span>
        <span className="rounded border border-line px-2 py-0.5">
          Sample data
        </span>
      </div>
      {children}
    </div>
  );
}

function Automations() {
  const [active, setActive] = useState(0);
  const chapters = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) =>
            e.isIntersecting &&
            setActive(Number((e.target as HTMLElement).dataset["i"])),
        ),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    chapters.current.forEach((c) => c && obs.observe(c));
    return () => obs.disconnect();
  }, []);
  const rows = [
    {
      eyebrow: "Qualification",
      title: "Every enquiry becomes a lead record.",
      body: "The questions your best person would ask are asked up front: need, budget, timeline, seriousness. Your team sees a clean record, not a chat to scroll.",
      ui: (
        <UIFrame title="Lead record">
          <dl className="divide-y divide-line text-sm">
            {[
              ["Source", "WhatsApp enquiry"],
              ["Need", "2-bedroom, near the city centre"],
              ["Budget", "Provided"],
              ["Timeline", "Within 3 months"],
              ["Status", "Qualified · assigned to a person"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[7rem_1fr] gap-4 px-4 py-3"
              >
                <dt className="text-muted">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </UIFrame>
      ),
    },
    {
      eyebrow: "Follow-up",
      title: "Quiet enquiries get a structured sequence.",
      body: "Not one 'are you still interested?' at midnight. Follow-ups run over days, stop when the customer replies or opts out, and show their status to your team.",
      ui: (
        <UIFrame title="Follow-up queue">
          <ul className="divide-y divide-line text-sm">
            {[
              ["Enquiry A", "Reminder 1 sent", "Waiting"],
              ["Enquiry B", "Reminder 2 due tomorrow", "Scheduled"],
              ["Enquiry C", "Replied", "Handed to team"],
            ].map(([n, st, tag]) => (
              <li
                key={n}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <span className="text-ink">
                  {n}
                  <span className="ml-3 text-muted">{st}</span>
                </span>
                <span className="rounded border border-line px-2 py-0.5 text-xs text-amber">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </UIFrame>
      ),
    },
    {
      eyebrow: "Bookings & orders",
      title: "The next action is already on the calendar.",
      body: "Slots offered from your calendar, orders captured with delivery details, confirmations and reminders sent. Inspections, tables, consultations or jobs, depending on your business.",
      ui: (
        <UIFrame title="This week">
          <ul className="divide-y divide-line text-sm">
            {[
              ["Mon 10:00", "Consultation"],
              ["Wed 14:30", "Site inspection"],
              ["Sat 11:00", "Viewing"],
            ].map(([t, w]) => (
              <li
                key={t}
                className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-4 px-4 py-3"
              >
                <span className="font-mono text-muted">{t}</span>
                <span className="text-ink">{w}</span>
                <span className="text-xs text-green">Confirmed</span>
              </li>
            ))}
          </ul>
        </UIFrame>
      ),
    },
  ];
  return (
    <section id="automations" className="border-b border-line py-28">
      <div className="container-wrap">
        <SectionHeader
          eyebrow="02 — What Hooze automates"
          title="Software your team can actually see working."
          sub="Enquiries, support questions, lead routing and notifications are handled in the background. These are the three places your team feels it."
        />
        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            {rows.map((r, i) => (
              <div
                key={r.eyebrow}
                ref={(el) => {
                  chapters.current[i] = el;
                }}
                data-i={i}
                className={`flex flex-col justify-center py-10 transition-opacity duration-500 lg:min-h-[80vh] ${active === i ? "lg:opacity-100" : "lg:opacity-30"}`}
              >
                <p className="font-mono text-xs text-muted">
                  ({String(i + 1).padStart(2, "0")})
                </p>
                <p className="eyebrow mt-3">{r.eyebrow}</p>
                <h3 className="mt-4 font-serif text-4xl leading-tight tracking-tight">
                  {r.title}
                </h3>
                <p className="mt-5 max-w-md leading-relaxed text-muted">
                  {r.body}
                </p>
                <div className="mt-8 lg:hidden">{r.ui}</div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-190px)] h-[420px]">
              {rows.map((r, i) => (
                <div
                  key={r.eyebrow}
                  aria-hidden={active !== i}
                  className="absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform:
                      active === i ? "none" : "translateY(24px) scale(.98)",
                    pointerEvents: active === i ? "auto" : "none",
                  }}
                >
                  {r.ui}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Closer (price + start, as Stripe closes) ---------- */
function Closer() {
  return (
    <section aria-label="Next steps" className="border-t border-line">
      <div className="container-wrap grid sm:grid-cols-2">
        <a
          href="#pricing"
          className="group border-b border-line py-10 sm:border-b-0 sm:border-r sm:pr-10"
        >
          <p className="font-serif text-3xl">See what it costs</p>
          <p className="mt-2 text-sm text-muted">
            Starting price, what is included, and what changes the quote.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm text-amber">
            Pricing{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </a>
        <a href={WA_LINK} className="group py-10 sm:pl-10">
          <p className="font-serif text-3xl">Start a conversation</p>
          <p className="mt-2 text-sm text-muted">
            Message us on WhatsApp. No form required.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm text-amber">
            Open WhatsApp{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      </div>
    </section>
  );
}

/* ---------- Mirror (the problem) ---------- */
function Mirror() {
  const inquiries = [
    {
      name: "Martin",
      time: "08:12",
      preview: "Good morning, do you still have this in stock?",
      tone: "#5B4B8A",
    },
    {
      name: "Sarah",
      time: "09:47",
      preview: "Please how much for the full package?",
      tone: "#3A6B7A",
    },
    {
      name: "Paul",
      time: "11:23",
      preview: "Can I book for this weekend?",
      tone: "#6B5335",
    },
    {
      name: "Adeyemi",
      time: "13:05",
      preview: "Still waiting for a reply 🙏",
      tone: "#4A6B4A",
    },
    {
      name: "Ngozi",
      time: "16:41",
      preview: "It's fine, I've gone with someone else.",
      tone: "#7A4A5A",
    },
  ];
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(inquiries.length);
      return;
    }
    const id = setInterval(() => {
      setCount((c) => (c >= inquiries.length ? 1 : c + 1));
    }, 1500);
    return () => clearInterval(id);
  }, [inquiries.length]);
  const shown = inquiries.slice(0, count);

  return (
    <section className="py-28 border-b border-line relative overflow-hidden">
      <div className="container-wrap relative">
        <SectionHeader
          eyebrow="Sound familiar?"
          title={
            <>
              Your inbox is full of people who{" "}
              <span className="font-serif italic font-normal tracking-normal text-amber pr-1">
                were
              </span>{" "}
              ready to buy.
            </>
          }
          sub="Whatever you sell, customers don't wait. They message three businesses at once and go with whoever answers first — and whoever asks the right questions."
        />

        <div className="mt-14 grid items-start gap-16 lg:grid-cols-[420px_1fr]">
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
                      5 enquiries. 0 replies. 0 bookings.
                    </p>
                  )}
                </div>
                <HomeIndicator />
              </Wallpaper>
            </PhoneFrame>
          </Reveal>

          <Reveal delay={160}>
            <ol className="divide-y divide-line border-y border-line">
              {[
                [
                  "You reply at 11 PM, when it's already over.",
                  "By the time someone gets back to the phone, the customer has spoken to two competitors and bought from one of them.",
                ],
                [
                  "Your team chases people who were never buying.",
                  "Nobody asked the qualifying questions up front, so half the calls, visits and quotes are wasted effort.",
                ],
                [
                  "Nobody knows where the enquiries went.",
                  "They live in one person's phone. When they travel, resign, or forget, the pipeline goes with them.",
                ],
              ].map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-4 py-7">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-serif text-2xl leading-snug">{t}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {b}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-muted">
              The phone on the left is an illustrative scenario, not a real
              inbox.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Built around your business ---------- */
function BuiltAround() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Your business knowledge",
      body: "Trained on your real prices, availability, policies and the way your best person actually sells. It never invents an answer.",
    },
    {
      icon: Plug,
      title: "Your tools, connected",
      body: "WhatsApp Business, your calendars, your spreadsheets or CRM — enquiries, bookings and follow-ups land where your team already works.",
    },
    {
      icon: Workflow,
      title: "Your rules",
      body: "What it may promise, what it must never say, when to offer a discount path and when to hold — configured with you, in plain language.",
    },
    {
      icon: UserCheck,
      title: "Human handoff",
      body: "The moment a conversation needs a person, it steps back and hands over with full context. Your team can take over any chat, any time.",
    },
    {
      icon: Rocket,
      title: "Deployed with you",
      body: "We build, test and launch it against your real conversations, then keep tuning it as your business changes.",
    },
  ];
  return (
    <section id="built" className="bg-bg-2 py-28 border-b border-line">
      <div className="container-wrap">
        <SectionHeader
          eyebrow="04 — Built around your business"
          title="Not a generic bot. Your system."
          sub="Every deployment is configured around one business: yours. Five things make it work like a member of your team instead of a widget."
        />
        <dl className="mt-16 divide-y divide-line border-y border-line">
          {items.map((it) => (
            <div
              key={it.title}
              className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-16"
            >
              <dt className="flex items-center gap-3 font-serif text-3xl">
                <it.icon
                  className="h-5 w-5 shrink-0 text-amber"
                  strokeWidth={1.5}
                  aria-hidden
                />
                {it.title}
              </dt>
              <dd className="max-w-xl leading-relaxed text-muted">{it.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  const steps = [
    {
      n: "01",
      day: "Discovery",
      title: "We learn your business and your script",
      body: "One working session. Your services, prices, policies, the questions your best person asks, and the workflow you want off your plate.",
    },
    {
      n: "02",
      day: "Workflow mapping",
      title: "We map the conversations before building",
      body: "Every enquiry type, every rule, every handoff point — written down and agreed with you before anything is configured.",
    },
    {
      n: "03",
      day: "Configuration & testing",
      title: "We build it and test it on real conversations",
      body: "Connected to your WhatsApp Business number and your tools, then tested against your last month of real enquiries before it talks to anyone.",
    },
    {
      n: "04",
      day: "Deployment",
      title: "It goes live, we watch it closely",
      body: "We monitor the first weeks of live conversations with you and correct anything it handles badly.",
    },
    {
      n: "05",
      day: "Ongoing improvement",
      title: "It keeps getting better",
      body: "As your prices, services and policies change, the system is updated and the conversation flow keeps being tuned.",
    },
  ];
  return (
    <section id="process" className="py-28 border-b border-line">
      <div className="container-wrap grid gap-16 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="05 — Implementation"
            title="From kickoff to live, in clear steps."
            sub="Nothing for your team to install or learn. It runs on the channels your customers already use."
          />
        </div>
        <ol className="relative border-l border-line">
          {steps.map((s) => (
            <li key={s.n} className="relative pb-10 pl-8 last:pb-0">
              <span
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber"
                aria-hidden
              />
              <p className="font-mono text-xs uppercase tracking-widest text-amber">
                {s.n} · {s.day}
              </p>
              <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  return (
    <section id="pricing" className="py-28 border-b border-line bg-bg-2">
      <div className="container-wrap">
        <SectionHeader
          eyebrow="Investment"
          title="One build. One yearly retainer."
          sub="Implementation is priced once, scoped to your enquiry volume and the systems we connect. The retainer covers everything that keeps it running."
        />
        <Reveal>
          <div className="mt-14 rounded-xl border border-line bg-surface p-8 sm:p-12">
            <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted font-medium">
                  Build — first year
                </p>
                <p className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
                  From <span className="text-amber">₦1.5M</span>
                </p>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Covers discovery, workflow mapping, training on your business
                  knowledge, WhatsApp Business setup, qualification and booking
                  flows, the dashboard, and the first weeks of live tuning.
                </p>
                <p className="mt-4 text-sm text-muted">
                  After year one:{" "}
                  <span className="text-ink font-semibold">
                    yearly retainer from ₦500k
                  </span>{" "}
                  — hosting, model and API costs, updates as your business
                  changes, and ongoing tuning.
                </p>
              </div>
              <div className="border-l border-line md:pl-8">
                <p className="text-sm text-muted leading-relaxed">
                  Final number depends on enquiry volume, the workflows we
                  automate, and the systems we connect to. Tell us about your
                  business and we'll send one fixed quote.
                </p>
                <a href="#brief" className="btn-amber w-full mt-5">
                  Get a tailored quote <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3 text-xs text-muted text-center">
                  We take a small number of builds at a time so each one gets
                  tuned properly.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Honesty / proof & trust ---------- */
function Honesty() {
  return (
    <section id="proof" className="py-20 border-t border-line">
      <div className="container-wrap max-w-3xl">
        <Reveal>
          <div>
            <dl className="mb-10 divide-y divide-line border-y border-line text-sm">
              {[
                [
                  "Interactive demos on this page",
                  "Sample data. Not a real customer or booking.",
                ],
                [
                  "Client systems",
                  "Configured per business during implementation.",
                ],
                [
                  "Client results & stories",
                  "None published yet. We will add only approved, verified ones.",
                ],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="grid gap-1 py-3 sm:grid-cols-[16rem_1fr]"
                >
                  <dt className="font-medium text-ink">{k}</dt>
                  <dd className="text-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="eyebrow border-l-2 border-amber pl-3">
              06 — Proof &amp; trust
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
              We&rsquo;re early — and we&rsquo;d rather say so.
            </h2>
            <div className="mt-5 space-y-3 text-sm text-muted leading-relaxed">
              <p>
                Hooze AI is a young studio out of Abuja. We are not going to
                show you invented testimonials, borrowed logos, or screenshots
                of dashboards that never existed.
              </p>
              <p>
                What we will do on a call is open your actual WhatsApp inbox
                with you, count the enquiries that never got a reply last month,
                and show you a live assistant answering questions about your own
                business before you pay anything.
              </p>
              <p>
                The demos on this page are clearly marked as demos. When we
                publish results and client stories, they will be verified and
                approved by the clients in them.
              </p>
              <p className="text-ink">
                If the numbers in your inbox don&rsquo;t justify the build,
                we&rsquo;ll tell you that on the call.
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
      a: "We set it up on WhatsApp Business API using your business number. Your customers keep messaging the same line they already know.",
    },
    {
      q: "Will customers know they're talking to an AI?",
      a: "We're upfront about it in the greeting, and it hands over to a human the moment someone asks or the conversation goes beyond what it should handle.",
    },
    {
      q: "What if it gives a wrong price or a wrong answer?",
      a: "It only answers from the material you give us, and it escalates anything outside that instead of guessing. During the first weeks we review live conversations with you and correct anything it handles badly.",
    },
    {
      q: "Can my team take over a conversation?",
      a: "Yes. Anyone on your team can jump into a chat at any point and the assistant steps back for that conversation.",
    },
    {
      q: "Which industries is this ready for today?",
      a: "The system is industry-agnostic, but we deploy industry by industry so each build is done properly. Real estate is our most developed deployment. For other industries we'll be direct on the call about what's ready now and what we'd build with you.",
    },
    {
      q: "Do we need any technical knowledge?",
      a: "No. We handle the setup, the integrations and the training. Your team uses a dashboard and their normal WhatsApp.",
    },
    {
      q: "What exactly does the retainer cover?",
      a: "Hosting, model and API usage, updates when your prices, services or policies change, and ongoing tuning of the conversation flow. It starts after the first year.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-bg-2 py-28 border-b border-line">
      <div className="container-wrap grid gap-16 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeader
          eyebrow="FAQ"
          title="Straight answers."
          sub="The questions owners ask before they commit."
        />
        <div className="divide-y divide-line border-y border-line">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-medium">{it.q}</span>
                  <span className="shrink-0 text-amber">
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                <div
                  id={`faq-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <p className="overflow-hidden pb-0 text-sm leading-relaxed text-muted">
                    <span className={`block ${isOpen ? "pb-5" : ""}`}>
                      {it.a}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Conversion: project brief ---------- */
function Brief() {
  const [business, setBusiness] = useState("");
  const [workflow, setWorkflow] = useState("");
  const valid = business.trim().length >= 3 && workflow.trim().length >= 10;
  const href = valid
    ? `https://wa.me/2349150754870?text=${encodeURIComponent(
        `Hi Hooze AI — my business: ${business.trim()}\n\nThe workflow I'd like to improve: ${workflow.trim()}`,
      )}`
    : WA_LINK;

  return (
    <section id="brief" className="py-28 border-t border-line">
      <div className="container-wrap max-w-4xl">
        <div className="rounded-xl border border-line bg-surface p-8 sm:p-14">
          <div className="relative">
            <p className="eyebrow">07 — Start here</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Tell us your business and the workflow{" "}
              <span className="font-serif italic font-normal tracking-normal text-amber pr-1">
                you want off your plate.
              </span>
            </h2>
            <p className="mt-4 text-muted max-w-xl">
              Two fields. It opens WhatsApp with your brief already written, so
              a real person picks it up and comes back with an honest answer on
              fit.
            </p>
            <div className="mt-8 grid gap-4 text-left">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted font-semibold">
                  Your business
                </span>
                <input
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  maxLength={120}
                  placeholder="e.g. a catering company in Abuja"
                  className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink outline-none focus-visible:border-amber focus-visible:ring-2 focus-visible:ring-amber/40"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted font-semibold">
                  The workflow you'd like to improve
                </span>
                <textarea
                  value={workflow}
                  onChange={(e) => setWorkflow(e.target.value)}
                  maxLength={600}
                  rows={4}
                  placeholder="e.g. catering enquiries come in on WhatsApp and nobody quotes them fast enough"
                  className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink outline-none focus-visible:border-amber focus-visible:ring-2 focus-visible:ring-amber/40 resize-none"
                />
              </label>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!valid}
                className={`btn-amber ${!valid ? "opacity-50 pointer-events-none" : ""}`}
              >
                <MessageSquare className="h-4 w-4" /> Send my brief on WhatsApp
              </a>
              <a href="mailto:ai@hoozeenterprises.co.uk" className="btn-ghost">
                Email us instead
              </a>
            </div>
            {!valid && (
              <p className="mt-3 text-xs text-muted">
                Fill in both fields above to enable the WhatsApp brief.
              </p>
            )}
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
          <img
            src={lockup}
            alt="Hooze AI"
            className="h-10 w-auto object-contain"
          />
          <p className="mt-3 max-w-xs text-xs leading-relaxed">
            AI sales systems and business automation. Abuja, Nigeria.
          </p>
        </div>
        <ul className="flex flex-wrap gap-6">
          <li>
            <a href="#industries" className="hover:text-ink">
              Industries
            </a>
          </li>
          <li>
            <a href="#process" className="hover:text-ink">
              Process
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-ink">
              Pricing
            </a>
          </li>
          <li>
            <a href="#brief" className="hover:text-ink">
              Start a project
            </a>
          </li>
        </ul>
        <p className="text-xs">© {new Date().getFullYear()} Hooze AI</p>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-ink overflow-x-clip">
      <SmoothScroll />
      <ScrollProgress />
      <Magnetic />
      <Nav />
      <main>
        <Hero />
        <FactBand />
        <Industries />
        <Automations />
        <Mirror />
        <TryDemoSection />
        <BuiltAround />
        <Process />
        <Pricing />
        <Honesty />
        <Faq />
        <Brief />
        <Closer />
      </main>
      <Footer />
    </div>
  );
}
