import AuthToggle from "@/components/element/AuthToggle";
import { redirect } from "next/navigation";
import { getUserSession } from "./actions";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getUserSession();
  const user = session?.user;
  if (user) {
    redirect("/home");
  }

  return (
    <div className="w-dvw flex align-middle h-dvh bg-home-page">
      <div className="m-auto h-fit w-xl bg-[#81B1DE] p-10 rounded-2xl">
        <div className="border-primary mb-4 rounded-2xl bg-amber-50 shadow-2xs flex gap-2 p-2 align-middle justify-center">
          <AuthToggle />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
