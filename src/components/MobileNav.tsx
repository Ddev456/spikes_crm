import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { MenuIcon } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";

export const MobileNav = () => {
  return (
    <div className="flex lg:hidden p-3 gap-4">
      <img src="/logo.png" alt="logo" width={32} height={32} />
      <Drawer direction="left">
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>

        <DrawerContent className="h-full max-w-[400px]">
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>
              <MobileSidebar />
            </DrawerDescription>
          </DrawerHeader>
          <Sidebar />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
