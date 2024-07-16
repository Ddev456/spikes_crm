import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealsTable } from "./deals/DealsTable";

import { StripeIcon } from "@/assets/icons/logo/StripeIcon";

import { GithubIcon } from "@/assets/icons/logo/GithubIcon";
import { AmazonIcon } from "@/assets/icons/logo/AmazonIcon";
import { SteamIcon } from "@/assets/icons/logo/SteamIcon";
import { AdobeIcon } from "@/assets/icons/logo/AdobeIcon";
import { ArcIcon } from "@/assets/icons/logo/ArcIcon";
import { FigmaIcon } from "@/assets/icons/logo/FigmaIcon";
import { SlackIcon } from "@/assets/icons/logo/SlackIcon";
import { OpenseaIcon } from "@/assets/icons/logo/OpenseaIcon";
import { Deals } from "./deals/columns";
import { useState } from "react";

export const deals: Deals[] = [
  {
    id: "728ed52f",
    add: new Date("2024-01-24"),
    amount: 7800,
    object: "Product Design : Payme...",
    statue: "pending",
    company: {
      name: "Stripe Inc.",
      logo: <StripeIcon />,
    },
  },
  {
    id: "489e1d42",
    add: new Date("2024-01-24"),
    amount: 12800,
    object: "App Redesign : Onboar...",
    statue: "cancelled",
    company: {
      name: "Github Corp.",
      logo: <GithubIcon />,
    },
  },
  {
    id: "2f9e1d42",
    add: new Date("2023-12-23"),
    amount: 14000,
    object: "Pitch Deck B2B",
    statue: "ongoing",
    company: {
      name: "Amazon",
      logo: <AmazonIcon />,
    },
  },
  {
    id: "2fr6671d42",
    add: new Date("2023-10-23"),
    amount: 2000,
    object: "Mobile App, UX Audit",
    statue: "waiting",
    company: {
      name: "Steam",
      logo: <SteamIcon />,
    },
  },
  {
    id: "1fr2271d42",
    add: new Date("2023-10-23"),
    amount: 5500,
    object: "Splash Screen Illustrator",
    statue: "completed",
    company: {
      name: "Abode LLC.",
      logo: <AdobeIcon />,
    },
  },
  {
    id: "99fr2271d42",
    add: new Date("2023-10-23"),
    amount: 14500,
    object: "Features Add",
    statue: "pending",
    company: {
      name: "The Browser Company",
      logo: <ArcIcon />,
    },
  },
  {
    id: "6fr2zz1221d42",
    add: new Date("2023-09-23"),
    amount: 21500,
    object: "Brand Guidelines",
    statue: "completed",
    company: {
      name: "Figma",
      logo: <FigmaIcon />,
    },
  },
  {
    id: "4er2444221d42",
    add: new Date("2023-09-23"),
    amount: 1900,
    object: "New messages UX",
    statue: "ongoing",
    company: {
      name: "Slack Inc.",
      logo: <SlackIcon />,
    },
  },
  {
    id: "77r2zaa21d42",
    add: new Date("2023-09-23"),
    amount: 2300,
    object: "Landing Page",
    statue: "pending",
    company: {
      name: "Opensea",
      logo: <OpenseaIcon />,
    },
  },
  // ...
];

const tabs = [
  {
    name: "All deals",
    value: "all",
  },
  { name: "Completed", value: "completed", quantity: 3 },
  { name: "Pending", value: "pending", quantity: 10 },
  { name: "Ongoing", value: "ongoing", quantity: 4 },
  { name: "Waiting for confirmation", value: "waiting", quantity: 1 },
];

export const Navigation = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredDeals = deals.filter((deal) => {
    if (activeTab === "all") {
      return true; // Retourner true pour tous les deals
    } else {
      return activeTab === deal.statue; // Filtrer en fonction de l'onglet actif
    }
  });

  return (
    <div className="mt-[34px] flex gap-[36px]">
      <div className="navigation-tabs flex flex-col gap-[16px] ml-[45px]">
        <h3 className="text-[36px] leading-[44px] font-semibold text-[#344054]">
          Deals
        </h3>
        <Tabs
          onValueChange={(value) => handleTabClick(value)}
          defaultValue="all"
          className="w-[400px]"
        >
          <div className="flex gap-[3px]">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  quantity={tab.quantity}
                >
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <DealsTable deals={filteredDeals} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="options flex gap-[193px]">
        <div className="search"></div>
        <div className="actions"></div>
      </div>
    </div>
  );
};
