import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { TryHooze } from "./try-hooze";
import { ScenarioDemo } from "./scripted-demo";

type Niche = {
  id: "realestate" | "restaurant" | "school" | "homeservices";
  name: string;
  problem: string;
  workflow: string[];
  note: string;
};

const NICHES: Niche[] = [
  {
    id: "realestate",
    name: "Real estate",
    problem:
      "Buyers message three agents at once. Whoever answers first and asks the right questions wins the viewing.",
    workflow: [
      "Enquiry answered from verified listings",
      "Budget, area and household qualified",
      "Viewing offered and confirmed, agent assigned",
    ],
    note: "Our most developed deployment. This demo runs on sample listings.",
  },
  {
    id: "restaurant",
    name: "Restaurants & catering",
    problem:
      "Menu and catering questions arrive at the busiest hours and go unanswered. Event leads go cold overnight.",
    workflow: [
      "Menu and pricing answered",
      "Event date, headcount, location and package captured",
      "Estimate given, edge cases handed to your events manager",
    ],
    note: "Illustrative. A live build would connect your real menu, prices and reservation calendar.",
  },
  {
    id: "school",
    name: "Schools & education",
    problem:
      "Admissions season floods the office with the same questions about fees, requirements and dates.",
    workflow: [
      "Fees and admission steps answered from your published information",
      "Class, start term and contact captured",
      "Tour or assessment booked, officer notified",
    ],
    note: "Illustrative. A live build would use your admissions policy, fee schedule and tour calendar.",
  },
  {
    id: "homeservices",
    name: "Trades & home services",
    problem:
      "You're on a job when the next customer messages, and by the time you reply they have called someone else.",
    workflow: [
      "Job, location and urgency captured, photo requested",
      "Call-out and listed rates explained, no invented quotes",
      "Inspection booked, technician confirms the window",
    ],
    note: "Illustrative. A live build would connect your price list and work calendar.",
  },
];

export function TryDemoSection() {
  const [id, setId] = useState<Niche["id"]>("realestate");
  const [mode, setMode] = useState<"watch" | "live">("watch");
  const niche = NICHES.find((n) => n.id === id)!;

  useEffect(() => {
    const onPick = (e: Event) => {
      const next = (e as CustomEvent<string>).detail;
      if (NICHES.some((n) => n.id === next)) {
        setId(next as Niche["id"]);
        setMode("watch");
      }
    };
    window.addEventListener("hz-niche", onPick);
    return () => window.removeEventListener("hz-niche", onPick);
  }, []);

  return (
    <section id="try" className="border-b border-line py-28">
      <div className="container-wrap">
        <p className="eyebrow border-l-2 border-amber pl-3">
          03 — See it in your industry
        </p>
        <h2 className="display mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl text-ink">
          The conversation changes with the business.{" "}
          <span className="font-serif font-normal italic tracking-normal text-amber">
            So does everything behind it.
          </span>
        </h2>

        <div
          role="tablist"
          aria-label="Demo industry"
          className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-b border-line"
        >
          {NICHES.map((n) => (
            <button
              key={n.id}
              role="tab"
              aria-selected={n.id === id}
              onClick={() => {
                setId(n.id);
                setMode("watch");
              }}
              className={`-mb-px border-b-2 pb-3 text-sm transition-colors ${n.id === id ? "border-amber text-ink" : "border-transparent text-muted hover:text-ink"}`}
            >
              {n.name}
            </button>
          ))}
        </div>

        <div
          key={id}
          className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] animate-[hz-fade_.4s_ease-out]"
        >
          <div>
            <h3 className="font-serif text-4xl tracking-tight">{niche.name}</h3>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              {niche.problem}
            </p>
            <ol className="mt-8 divide-y divide-line border-y border-line">
              {niche.workflow.map((w, i) => (
                <li
                  key={w}
                  className="grid grid-cols-[2rem_1fr] gap-3 py-3.5 text-sm"
                >
                  <span className="font-mono text-xs text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink/90">{w}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-l-2 border-line pl-4 text-xs leading-relaxed text-muted">
              {niche.note}
            </p>
            <a href="#brief" className="btn-amber mt-8">
              Discuss {niche.name.toLowerCase()}{" "}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div>
            <div
              className="mb-6 inline-flex rounded-lg border border-line p-1 text-sm"
              role="group"
              aria-label="Demo mode"
            >
              {(
                [
                  ["watch", "Watch it run"],
                  ["live", "Try it yourself"],
                ] as const
              ).map(([m, label]) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`rounded-md px-4 py-1.5 transition-colors ${mode === m ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {mode === "watch" ? (
              <ScenarioDemo key={id} scenarioId={id} />
            ) : (
              <div className="grid items-start gap-8 lg:grid-cols-[auto_1fr]">
                <TryHooze key={id} personaId={id} />
                <p className="max-w-xs text-sm leading-relaxed text-muted">
                  Type like a real customer. This chat is answered by the live
                  assistant on{" "}
                  {id === "realestate"
                    ? "sample listings"
                    : "sample business information"}
                  , so it can be wrong or slow. It is a demo of the approach,
                  not a real business.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
