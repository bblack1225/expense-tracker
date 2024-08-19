"use client";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import clsx from "clsx";
import { Menu, Receipt, X } from "lucide-react";

export default function Navbar() {
  const [isNavShow, setIsNavLinkShow] = useState(false);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="md:mb-2 flex h-15 items-center justify-between rounded-md bg-primary p-2 md:h-20">
        <div className="flex justify-center items-center md:hidden">
          <Button size="icon" onClick={() => setIsNavLinkShow((prev) => !prev)}>
            {isNavShow ? (
              <X className="w-10 h-10" />
            ) : (
              <Menu className="w-10 h-10" />
            )}
          </Button>
        </div>
        <div>
          <Link href="/" className="text-white flex items-center leading-none">
            <Receipt className="w-10 h-10 rotate-[15deg]" />
            <p className="text-[24px] hidden md:block">家庭記帳本</p>
          </Link>
        </div>
      </div>
      <div
        className={clsx(
          "flex grow justify-between flex-col md:space-x-0  transition-all ease-in-out duration-300 overflow-hidden",
          { "h-0": !isNavShow, "h-auto": isNavShow }
        )}
      >
        <NavLinks onNavChange={setIsNavLinkShow} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
