import { ArrowRight, AlertTriangle } from "lucide-react";
import { TryHooze } from "./try-hooze";

export function TryDemoSection() {
  return (
    <section id="try" className="border-t border-line py-24">
      <div className="container-wrap">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <p className="eyebrow">Try it yourself</p>
            <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              Talk to it the way your customer would.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              This is the same consultant, running on three sample listings in Abuja.
              Type anything — haggle, change your mind, say it&rsquo;s too expensive,
              ask it to compare two houses, or tell it you need to discuss with your
              wife. It should hold the conversation the way a good agent would.
            </p>

            <ul className="mt-8 space-y-3 border-l border-line pl-5 text-sm text-muted">
              {[
                "Understands buy vs rent, area, budget, occupants, timeline",
                "Recommends from inventory instead of guessing",
                "Compares two properties and explains the trade-off",
                "Pushes back respectfully when your pick isn't the best fit",
                "Handles price objections and moves you to an inspection",
              ].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3 border border-line bg-surface p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              <div className="text-xs leading-relaxed text-muted">
                <p className="font-semibold uppercase tracking-widest text-ink">
                  Demo data
                </p>
                <p className="mt-1.5">
                  The properties, prices and images in this demo are illustrative samples
                  for demonstration only. They are not verified listings, they are not for
                  sale or rent, and details may be inaccurate or outdated. The demo shows
                  how the assistant behaves — not our inventory.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:pt-4">
            <TryHooze />
          </div>
        </div>

        <div className="mt-24 grid items-center gap-10 border-t border-line pt-16 md:grid-cols-2">
          <div>
            <p className="eyebrow">And that was only the demo</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Now imagine it running on your actual properties.
            </h3>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-muted">
              A real deployment is built around your verified listings, your prices and
              payment plans, your estates and locations, your availability, your policies
              and the way your best agent actually sells. It answers on your WhatsApp
              number, books into your agents&rsquo; calendars, and hands your team only
              the people worth calling.
            </p>
            <a href="#audit" className="btn-amber mt-6">
              Build my Hooze AI <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
