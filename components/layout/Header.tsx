import { File, HomeIcon, UsersRound } from "lucide-react";
import Link from "next/link";

import NavButton from "@/components/element/NavButton";
const Header = () => {
  return (
    <header className="animate-slide bg-amber-700 h-12 p-2 border-b sticky top-0 z-20 ">
      <div className="flex h-8 item-center justify-between">
        <div className="flex items-center gap-2">
          <NavButton href="/home" icon={HomeIcon} label="Home" />
          <Link href="/home" className="text-lg font-bold">
            <h1 className="sm:block font-bold m-0 mt-1 text-xl">Fixed</h1>
          </Link>
          <NavButton href="/docs" icon={File} label="Docs" />
          <NavButton href="/community" icon={UsersRound} label="Community" />
        </div>
        <div className="flex items-center"></div>
      </div>
    </header>
  );
};

export default Header;
