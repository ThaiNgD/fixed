import Header from "@/components/layout/Header";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default async function RSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="bg-rs-page bg-home-page bg-cover bg-center dark:bg-black">
      <main className="h-dvh">
        <Header />
        <div className="flex gap-6 p-12 ">{children}</div>
      </main>
    </div>
  );
}
