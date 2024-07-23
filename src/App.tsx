import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { MobileNav } from "./components/MobileNav";
import Loader from "./components/Loader";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1200);
  return (
    <main className="bg-[#f7f9fa] flex flex-col md:flex-row">
      <Sidebar />
      <MobileNav />
      {loading ? (
        <div className="h-[95vh] w-screen bg-[#FCFCFC]">
          <Loader />
        </div>
      ) : (
        <Dashboard />
      )}
      <Toaster />
    </main>
  );
}
