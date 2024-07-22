// store.ts

import { create } from "zustand";

import { StripeIcon } from "@/assets/icons/logo/StripeIcon";

import { GithubIcon } from "@/assets/icons/logo/GithubIcon";
import { AmazonIcon } from "@/assets/icons/logo/AmazonIcon";
import { SteamIcon } from "@/assets/icons/logo/SteamIcon";
import { AdobeIcon } from "@/assets/icons/logo/AdobeIcon";
import { ArcIcon } from "@/assets/icons/logo/ArcIcon";
import { FigmaIcon } from "@/assets/icons/logo/FigmaIcon";
import { SlackIcon } from "@/assets/icons/logo/SlackIcon";
import { OpenseaIcon } from "@/assets/icons/logo/OpenseaIcon";

export enum Statue {
  pending = "pending",
  cancelled = "cancelled",
  ongoing = "ongoing",
  waiting = "waiting",
  completed = "completed",
}

export const companies: company[] = [
  {
    id: 0,
    name: "Stripe Inc.",
    logo: StripeIcon,
  },
  {
    id: 1,
    name: "Github Corp.",
    logo: GithubIcon,
  },
  {
    id: 2,
    name: "Amazon",
    logo: AmazonIcon,
  },
  {
    id: 3,
    name: "Steam",
    logo: SteamIcon,
  },
  {
    id: 4,
    name: "Adobe LLC.",
    logo: AdobeIcon,
  },
  {
    id: 5,
    name: "The Browser Company",
    logo: ArcIcon,
  },
  {
    id: 6,
    name: "Figma",
    logo: FigmaIcon,
  },
  {
    id: 7,
    name: "Slack Inc.",
    logo: SlackIcon,
  },
  {
    id: 8,
    name: "Opensea",
    logo: OpenseaIcon,
  },
];

export interface company {
  id: number;
  name: string;
  logo: () => JSX.Element;
}

/* export type Statue =
  | "pending"
  | "cancelled"
  | "ongoing"
  | "waiting"
  | "completed"; */

export interface Deal {
  id: string;
  add: Date;
  amount: number;
  object: string;
  statue: Statue;
  company: string;
}

interface DealStore {
  deals: Deal[];
  addDeal: (newDeal: Deal) => void;
}

export const useDealStore = create<DealStore>()((set) => ({
  deals: [
    {
      id: "728ed52f",
      add: new Date("2024-01-24"),
      amount: 7800,
      object: "Product Design : Payme...",
      statue: Statue.pending,
      company: companies[0].name,
    },
    {
      id: "489e1d42",
      add: new Date("2024-01-24"),
      amount: 12800,
      object: "App Redesign : Onboar...",
      statue: Statue.cancelled,
      company: companies[1].name,
    },
    {
      id: "2f9e1d42",
      add: new Date("2023-12-23"),
      amount: 14000,
      object: "Pitch Deck B2B",
      statue: Statue.ongoing,
      company: companies[2].name,
    },
    {
      id: "2fr6671d42",
      add: new Date("2023-10-23"),
      amount: 2000,
      object: "Mobile App, UX Audit",
      statue: Statue.waiting,
      company: companies[3].name,
    },
    {
      id: "1fr2271d42",
      add: new Date("2023-10-23"),
      amount: 5500,
      object: "Splash Screen Illustrator",
      statue: Statue.completed,
      company: companies[4].name,
    },
    {
      id: "99fr2271d42",
      add: new Date("2023-10-23"),
      amount: 14500,
      object: "Features Add",
      statue: Statue.pending,
      company: companies[5].name,
    },
    {
      id: "6fr2zz1221d42",
      add: new Date("2023-09-23"),
      amount: 21500,
      object: "Brand Guidelines",
      statue: Statue.completed,
      company: companies[6].name,
    },
    {
      id: "4er2444221d42",
      add: new Date("2023-09-23"),
      amount: 1900,
      object: "New messages UX",
      statue: Statue.ongoing,
      company: companies[7].name,
    },
    {
      id: "77r2zaa21d42",
      add: new Date("2023-09-23"),
      amount: 2300,
      object: "Landing Page",
      statue: Statue.pending,
      company: companies[8].name,
    },
  ],
  addDeal: (newDeal) => set((state) => ({ deals: [...state.deals, newDeal] })),
}));
