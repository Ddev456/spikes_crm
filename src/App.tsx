import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { MobileNav } from "./components/MobileNav";

export default function Home() {
  return (
    <main className="bg-[#f7f9fa] flex flex-col lg:flex-row">
      <Sidebar />
      <MobileNav />
      <Dashboard />
      <Toaster />
    </main>
  );
}
