"use client";
import { File, UsersRound } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const NavButton = dynamic(() => import("@/components/element/NavButton"), {
  ssr: false,
});

const ModeToggle = dynamic(() => import("../element/ModeToggle"), {
  ssr: false,
});

const AccountDropdown = dynamic(() => import("../element/AccountDropdown"), {
  ssr: false,
});

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []);
  return (
    <header className="bg-primary border-secondary h-16 p-4 border-b sticky top-0 z-20 ">
      <div className="flex h-8 my-auto item-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/home" className="text-lg font-bold">
            <h1 className="sm:block text-secondary font-bold m-0 text-xl">
              Fixed
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-2 ">
          <NavButton
            href="/tickets"
            icon={File}
            label="Docs"
            variant={"outline"}
          />
          <NavButton
            href="/customer"
            icon={UsersRound}
            label="Community"
            variant={"outline"}
          />
          <ModeToggle />
          <AccountDropdown user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
