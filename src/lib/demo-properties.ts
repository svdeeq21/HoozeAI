import lokogoma from "../assets/prop-lokogoma.jpg";
import wuse from "../assets/prop-wuse.jpg";
import gwarinpa from "../assets/prop-gwarinpa.jpg";

export type DemoProperty = {
  id: string;
  title: string;
  area: string;
  type: string;
  beds: number;
  baths: number;
  price: string;
  terms: string;
  notes: string;
  image: string;
};

export const DEMO_PROPERTIES: DemoProperty[] = [
  {
    id: "lokogoma-duplex",
    title: "4-bed detached duplex + BQ",
    area: "Lokogoma, Abuja",
    type: "For sale",
    beds: 4,
    baths: 5,
    price: "₦95,000,000",
    terms: "30% deposit, balance over 12 months",
    notes: "Fully finished, gated estate, borehole and treatment plant.",
    image: lokogoma,
  },
  {
    id: "wuse-apartment",
    title: "3-bed serviced apartment",
    area: "Wuse 2, Abuja",
    type: "For rent",
    beds: 3,
    baths: 3,
    price: "₦6,500,000 / year",
    terms: "1 year upfront + ₦900,000 service charge",
    notes: "Walking distance to the business district. Estate generator runs 18 hrs.",
    image: wuse,
  },
  {
    id: "gwarinpa-terrace",
    title: "3-bed terrace duplex",
    area: "Gwarinpa, Abuja",
    type: "For rent",
    beds: 3,
    baths: 4,
    price: "₦4,800,000 / year",
    terms: "1 year upfront, no service charge",
    notes: "Bigger space and a small yard, but roughly 35–45 mins to Wuse in traffic.",
    image: gwarinpa,
  },
];

export const PROPERTY_BY_ID = Object.fromEntries(
  DEMO_PROPERTIES.map((p) => [p.id, p]),
) as Record<string, DemoProperty>;
