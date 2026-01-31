import { File, HomeIcon, UsersRound } from "lucide-react";
import Link from "next/link";

import NavButton from "@/components/element/NavButton";
const Header = () => {
  return (
    <header className="bg-primary animate-slide border-secondary h-16 p-4 border-b sticky top-0 z-20 ">
      <div className="flex h-8 my-auto item-center justify-between">
        <div className="flex items-center gap-2">
          <NavButton href="/home" icon={HomeIcon} label="Home" />
          <Link href="/home" className="text-lg font-bold">
            <h1 className="sm:block text-secondary font-bold m-0 text-xl">
              Fixed
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <NavButton href="/tickets" icon={File} label="Docs" />
          <NavButton href="/customer" icon={UsersRound} label="Community" />
        </div>
      </div>
    </header>
  );
};

export default Header;
