export type InfoCard = {
  title: string;
  rows: [string, string][];
  foot?: string;
};
export type Step = {
  from: "them" | "me";
  text: string;
  time: string;
  delay?: number;
  /** property id (real-estate listing card) */
  card?: string;
  /** niche-specific rich card */
  info?: InfoCard;
  /** values written to the system record when this message lands */
  set?: Record<string, string>;
};
export type Scenario = {
  id: string;
  name: string;
  header: string;
  recordTitle: string;
  fields: [string, string][];
  doneNote: string;
  steps: Step[];
};

const REALESTATE_STEPS: Step[] = [
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
    set: { Interest: "4-bed duplex, Lokogoma" },
  },
  {
    from: "them",
    text: "For myself. But ₦95m is above what I planned.",
    time: "4:42 PM",
    set: { Budget: "Above ₦95m, wants to rent" },
  },
  {
    from: "me",
    text: "That's fair — most people start there. What number were you working with, roughly? I'd rather show you something you can actually close on than push this one.",
    time: "4:42 PM",
  },
  {
    from: "them",
    text: "I'd rather rent for now. 3 bedrooms, around Wuse.",
    time: "4:44 PM",
    set: { Intent: "Rent, 3 bedrooms, Wuse" },
  },
  {
    from: "me",
    text: "Got it. Who's moving in with you, and what's your yearly rent range?",
    time: "4:44 PM",
  },
  {
    from: "them",
    text: "Wife and one child. Up to ₦7m if it's serviced.",
    time: "4:45 PM",
    set: { Household: "Couple + 1 child", Budget: "Up to ₦7m / yr, serviced" },
  },
  {
    from: "me",
    text: "Then two make sense. Wuse 2 serviced 3-bed at ₦6.5m plus ₦900k service charge, and a bigger Gwarinpa terrace at ₦4.8m with no service charge.",
    time: "4:46 PM",
    card: "wuse-apartment",
  },
  {
    from: "me",
    text: "",
    time: "4:46 PM",
    card: "gwarinpa-terrace",
    delay: 700,
  },
  {
    from: "them",
    text: "Gwarinpa is cheaper and bigger. Why not that one?",
    time: "4:47 PM",
  },
  {
    from: "me",
    text: "It is bigger, and if space is your priority I'd say take it. But you told me your office is in the business district.\n\nGwarinpa is 35–45 mins each way in traffic. Wuse 2 is a walk. Over a year that's about 300 hours of your life — and the ₦1.7m gap is mostly that commute.",
    time: "4:48 PM",
  },
  {
    from: "them",
    text: "Hmm. True. Can I see the Wuse one?",
    time: "4:49 PM",
    set: { Priority: "Short commute" },
  },
  {
    from: "me",
    text: "Yes. Saturday 11:00 AM or Sunday 2:00 PM — which works? I'll put the Gwarinpa one on the same run so you can judge both yourself.",
    time: "4:49 PM",
  },
  {
    from: "them",
    text: "Saturday 11.",
    time: "4:50 PM",
    set: { Viewing: "Saturday 11:00 AM" },
  },
  {
    from: "me",
    text: "Locked in. Saturday, 11:00 AM, Wuse 2 then Gwarinpa. Tunde will call you Friday evening to confirm, and I've sent both floor plans to this chat.",
    time: "4:50 PM",
    set: { Status: "Viewing booked · agent assigned" },
  },
];

export const SCENARIOS: Scenario[] = [
  {
    id: "realestate",
    name: "Real estate",
    header: "Hooze — Property Consultant",
    recordTitle: "Lead record",
    fields: [
      ["Interest", "Interest"],
      ["Intent", "Intent"],
      ["Budget", "Budget"],
      ["Household", "Household"],
      ["Priority", "Priority"],
      ["Viewing", "Viewing"],
      ["Status", "Status"],
    ],
    doneNote:
      "Sample scenario on demo listings. Not a real customer or booking.",
    steps: REALESTATE_STEPS,
  },
  {
    id: "restaurant",
    name: "Restaurants & catering",
    header: "Hooze — Restaurant & Catering",
    recordTitle: "Catering enquiry",
    fields: [
      ["Event", "Event"],
      ["Date", "Date"],
      ["Guests", "Guests"],
      ["Location", "Location"],
      ["Package", "Package"],
      ["Estimate", "Estimate"],
      ["Status", "Status"],
    ],
    doneNote: "Sample scenario on a demo menu. Not a real customer or order.",
    steps: [
      {
        from: "them",
        text: "Hi, do you do catering? It's for our office end-of-year party.",
        time: "11:02 AM",
        set: { Event: "Office end-of-year party" },
      },
      {
        from: "me",
        text: "Yes, we do. What date is it, and roughly how many people?",
        time: "11:02 AM",
      },
      {
        from: "them",
        text: "Friday 18 December. About 80 people.",
        time: "11:03 AM",
        set: { Date: "Fri 18 Dec", Guests: "80" },
      },
      {
        from: "me",
        text: "Lovely. Where will it be held, and are you thinking a full buffet with service staff, or small chops and grills?",
        time: "11:03 AM",
      },
      {
        from: "them",
        text: "At our office in Wuse 2. Buffet please.",
        time: "11:04 AM",
        set: { Location: "Wuse 2 (office)", Package: "Full buffet" },
      },
      {
        from: "me",
        text: "Full catering is from ₦6,500 per guest, minimum 50, and includes setup and service staff. Drinks and venue aren't included. For 80 guests that's from ₦520,000.",
        time: "11:04 AM",
        info: {
          title: "Catering estimate",
          rows: [
            ["Package", "Full buffet + staff"],
            ["Guests", "80"],
            ["Rate", "From ₦6,500 / guest"],
            ["Estimate", "From ₦520,000"],
            ["Not included", "Drinks, venue"],
          ],
          foot: "Demo menu prices",
        },
        set: { Estimate: "From ₦520,000" },
      },
      {
        from: "them",
        text: "Okay. Can we do a tasting first?",
        time: "11:05 AM",
      },
      {
        from: "me",
        text: "I can't confirm a tasting slot myself, so I'll pass this to our events manager with everything you've told me. She'll call you today. What name should she ask for?",
        time: "11:05 AM",
        set: { Status: "Handover to events manager" },
      },
      { from: "them", text: "Chidi.", time: "11:06 AM" },
      {
        from: "me",
        text: "Thanks, Chidi. Saved: 80 guests, Fri 18 Dec, Wuse 2, full buffet. Our events manager will call you today about the tasting and menu.",
        time: "11:06 AM",
        set: { Status: "Callback today · tasting requested" },
      },
    ],
  },
  {
    id: "school",
    name: "Schools & education",
    header: "Hooze — Admissions Assistant",
    recordTitle: "Admissions enquiry",
    fields: [
      ["Parent", "Parent"],
      ["Child", "Child"],
      ["Class", "Class"],
      ["Start", "Start"],
      ["Tour", "Tour"],
      ["Status", "Status"],
    ],
    doneNote: "Sample scenario on demo fees. Not a real family or application.",
    steps: [
      {
        from: "them",
        text: "Hello, how much are primary school fees please?",
        time: "2:10 PM",
      },
      {
        from: "me",
        text: "Primary is ₦520,000 per term. Which class is your child going into, and for which term?",
        time: "2:10 PM",
      },
      {
        from: "them",
        text: "Primary 3, from January.",
        time: "2:11 PM",
        set: { Class: "Primary 3", Start: "January term" },
      },
      {
        from: "me",
        text: "Thank you. New pupils also pay a one-time registration fee and development levy. Have you visited the school yet?",
        time: "2:11 PM",
        info: {
          title: "First-term fees · Primary",
          rows: [
            ["Tuition (term)", "₦520,000"],
            ["Registration", "₦25,000"],
            ["Development levy", "₦150,000"],
            ["First term total", "₦695,000"],
          ],
          foot: "Demo fee schedule · new pupils",
        },
      },
      {
        from: "them",
        text: "Not yet. Is there an entrance exam?",
        time: "2:12 PM",
      },
      {
        from: "me",
        text: "Yes. Primary and above have a short assessment on a Saturday. The steps are a tour, the application form, the assessment, then an offer letter. Would you like a tour on Thursday at 10:00 AM or Saturday at 9:00 AM?",
        time: "2:12 PM",
      },
      {
        from: "them",
        text: "Thursday please.",
        time: "2:13 PM",
        set: { Tour: "Thursday 10:00 AM" },
      },
      {
        from: "me",
        text: "Booked. What's your name, and your child's name?",
        time: "2:13 PM",
      },
      {
        from: "them",
        text: "Mrs Okafor. Her name is Ada.",
        time: "2:14 PM",
        set: { Parent: "Mrs Okafor", Child: "Ada" },
      },
      {
        from: "me",
        text: "Thank you, Mrs Okafor. Ada's tour is booked for Thursday at 10:00 AM, and the admissions officer has her details. Questions about payment plans go to them directly.",
        time: "2:14 PM",
        set: { Status: "Tour booked · officer notified" },
      },
    ],
  },
  {
    id: "homeservices",
    name: "Trades & home services",
    header: "Hooze — Jobs & Quotes",
    recordTitle: "Job ticket",
    fields: [
      ["Customer", "Customer"],
      ["Job", "Job"],
      ["Location", "Location"],
      ["Photo", "Photo"],
      ["Urgency", "Urgency"],
      ["Visit", "Visit"],
      ["Status", "Status"],
    ],
    doneNote: "Sample scenario on demo rates. Not a real customer or job.",
    steps: [
      {
        from: "them",
        text: "Hi, my kitchen sink is leaking badly. Can someone come today?",
        time: "7:48 AM",
        set: { Job: "Leak, kitchen sink", Urgency: "Urgent" },
      },
      {
        from: "me",
        text: "Sorry to hear that. Is the water coming from the pipe under the sink, the tap or the drain? And where are you in Abuja?",
        time: "7:48 AM",
      },
      {
        from: "them",
        text: "The pipe under the sink. I'm in Gwarinpa.",
        time: "7:49 AM",
        set: { Location: "Gwarinpa" },
      },
      {
        from: "me",
        text: "Thanks. Is the water turned off at the mains, and can you send a photo of the pipe?",
        time: "7:49 AM",
      },
      {
        from: "them",
        text: "📷 Photo · pipe under sink. Mains is off.",
        time: "7:50 AM",
        set: { Photo: "Received" },
      },
      {
        from: "me",
        text: "That helps. Plumbing is quoted after inspection. The call-out is ₦10,000 and is deducted from the job if you go ahead. I can't promise a same-day fix, but I can book an inspection tomorrow morning or Saturday.",
        time: "7:50 AM",
        info: {
          title: "Inspection visit",
          rows: [
            ["Call-out", "₦10,000"],
            ["If you proceed", "Deducted from job"],
            ["Plumbing", "Quoted after inspection"],
            ["Hours", "Mon–Sat, 8:00–18:00"],
          ],
          foot: "Demo rates",
        },
      },
      {
        from: "them",
        text: "Tomorrow morning.",
        time: "7:51 AM",
        set: { Visit: "Tomorrow morning" },
      },
      {
        from: "me",
        text: "Booked. The lead technician will confirm a time window by phone. What name should he ask for?",
        time: "7:51 AM",
      },
      {
        from: "them",
        text: "Ibrahim.",
        time: "7:51 AM",
        set: { Customer: "Ibrahim" },
      },
      {
        from: "me",
        text: "Thanks, Ibrahim. Saved: kitchen sink leak, Gwarinpa, photo attached, inspection tomorrow morning. The technician will call to confirm the window.",
        time: "7:52 AM",
        set: { Status: "Inspection booked · tech to confirm" },
      },
    ],
  },
];

export const SCENARIO_BY_ID = Object.fromEntries(
  SCENARIOS.map((s) => [s.id, s]),
) as Record<string, Scenario>;
