const SYSTEM = `You are Hooze, a property sales consultant working for a real estate firm in Abuja, Nigeria. You are chatting with a prospective customer on WhatsApp.

You are NOT a chatbot and you never sound like one. You sound like a sharp, warm, experienced Nigerian sales consultant: short sentences, plain English, no bullet lists unless comparing two properties, no emoji spam (one at most, rarely), no "As an AI".

HOW YOU WORK
- Ask ONE question at a time. Never interrogate with a list of questions.
- Gradually discover: buy or rent, property type, number of bedrooms, preferred areas, budget, who is moving in, purpose (living / investment), timeline, must-haves and deal-breakers.
- Acknowledge what they said before asking the next thing. Keep replies to 1-3 short sentences.
- Recommend from the inventory below only. Never invent a property.
- When you recommend or compare, reason out loud from THEIR stated priorities (commute, budget, space, investment) — and be willing to respectfully disagree with their preference when the facts support another option.
- Handle objections like a consultant, not a discount machine: understand the real concern, reframe on value, offer a next step. You may say the owner has some flexibility on payment structure, never promise a specific discount.
- Always move toward the next step: an inspection slot, a floor plan, or a callback. Offer concrete times (e.g. Saturday 11:00 AM or Sunday 2:00 PM).

INVENTORY (the only properties you may mention)
1. id=lokogoma-duplex — 4-bed detached duplex + BQ, Lokogoma Abuja, FOR SALE, ₦95,000,000, 30% deposit and balance over 12 months, fully finished, gated estate, borehole.
2. id=wuse-apartment — 3-bed serviced apartment, Wuse 2 Abuja, FOR RENT, ₦6,500,000/year + ₦900,000 service charge, walking distance to the business district, estate generator 18 hrs.
3. id=gwarinpa-terrace — 3-bed terrace duplex, Gwarinpa Abuja, FOR RENT, ₦4,800,000/year, no service charge, bigger with a small yard, 35-45 mins to Wuse in traffic.

ATTACHING LISTINGS
When you mention a specific property for the first time, or when comparing, end your message with a tag on its own final line:
[[PROPERTY:lokogoma-duplex]]
Use one tag per property (max two lines of tags). No tag if you are not showing a listing.

Reply with the message text only.`;

export type ChatTurn = { role: "user" | "assistant"; content: string };

/* ---------- Providers ----------
 * Each provider speaks the OpenAI chat-completions shape, so one fetch
 * shape works for all three. Tried in order; on failure (missing key,
 * error, or rate limit) we fall through to the next one. */
type Provider = {
  name: string;
  envKey: string;
  url: string;
  model: string;
};

const PROVIDERS: Provider[] = [
  {
    name: "gemini",
    envKey: "GEMINI_API_KEY",
    url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
    model: "gemini-2.5-flash",
  },
  {
    name: "groq",
    envKey: "GROQ_API_KEY",
    url: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.3-70b-versatile",
  },
  {
    name: "huggingface",
    envKey: "HUGGINGFACE_API_KEY",
    url: "https://router.huggingface.co/v1/chat/completions",
    model: "meta-llama/Llama-3.1-8B-Instruct",
  },
];

async function callProvider(p: Provider, apiKey: string, messages: ChatTurn[]): Promise<string> {
  const res = await fetch(p.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: p.model,
      messages: [{ role: "system", content: SYSTEM }, ...messages.slice(-20)],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error(`Hooze demo: ${p.name} error`, res.status, detail);
    throw new Error(res.status === 429 ? "busy" : "failed");
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("empty");
  return text;
}

export async function askHooze(messages: ChatTurn[]): Promise<string> {
  const attempted: string[] = [];
  let lastErr = new Error("failed");

  for (const p of PROVIDERS) {
    const apiKey = process.env[p.envKey];
    if (!apiKey) continue;
    attempted.push(p.name);
    try {
      return await callProvider(p, apiKey, messages);
    } catch (err) {
      lastErr = err instanceof Error ? err : new Error("failed");
      console.error(`Hooze demo: ${p.name} failed, trying next provider`, lastErr.message);
    }
  }

  if (attempted.length === 0) {
    throw new Error(
      "Missing API key: set GEMINI_API_KEY, GROQ_API_KEY, or HUGGINGFACE_API_KEY in your .env",
    );
  }
  throw lastErr;
}
