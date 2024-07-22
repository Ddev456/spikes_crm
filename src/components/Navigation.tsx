import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealsTable } from "./deals/DealsTable";

import { useState } from "react";
import { Statue, useDealStore } from "@/store/store";

export const Navigation = () => {
  const { deals } = useDealStore();

  const tabs = [
    {
      name: "All deals",
      value: "all",
    },
    {
      name: "Completed",
      value: Statue.completed,
      quantity: deals.filter((deal) => deal.statue === Statue.completed).length,
    },
    {
      name: "Pending",
      value: Statue.pending,
      quantity: deals.filter((deal) => deal.statue === Statue.pending).length,
    },
    {
      name: "Ongoing",
      value: Statue.ongoing,
      quantity: deals.filter((deal) => deal.statue === Statue.ongoing).length,
    },
    {
      name: "Waiting for confirmation",
      value: Statue.waiting,
      quantity: deals.filter((deal) => deal.statue === Statue.waiting).length,
    },
  ];

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
      <div className="w-full navigation-tabs flex flex-col gap-[16px] pl-[12px] lg:pl-[45px]">
        <h3 className="text-[36px] leading-[44px] font-semibold text-[#344054]">
          Deals
        </h3>
        <Tabs
          onValueChange={(value) => handleTabClick(value)}
          defaultValue="all"
          className="w-full"
        >
          <div className="flexgap-[3px]">
            <TabsList className="mb-[2rem] lg:mb-0 flex-wrap max-w-[450px] lg:max-w-full lg:flex-nowrap">
              {tabs.map((tab) => (
                <TabsTrigger
                  aria-describedby={`${tab.value}-tab`}
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
    </div>
  );
};
