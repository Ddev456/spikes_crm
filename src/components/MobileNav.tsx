import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { MenuIcon } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";

export const MobileNav = () => {
  return (
    <div className="flex md:hidden p-3 gap-4">
      <img src="/logo.png" alt="logo" width={32} height={32} />
      <Drawer direction="left">
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>

        <DrawerContent className="h-full max-w-[85%]">
          <DrawerHeader className="px-2 py-0">
            <DrawerTitle className="flex justify-center gap-4 items-center">
              <img src="/logo.png" alt="logo" width={32} height={32} />
              <span className="text-[#344054]">Menu</span>
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <MobileSidebar />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
