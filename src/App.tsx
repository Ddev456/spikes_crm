import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export default function Home() {
  return (
    <main className="bg-[#f7f9fa] flex">
      <Sidebar />
      <Dashboard />
      <Toaster />
    </main>
  );
}
