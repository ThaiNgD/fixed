import NavButton from "@/components/element/NavButton";
import { LogIn, UserRoundPlus } from "lucide-react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-dvw flex align-middle h-dvh bg-home-page">
      <div className="m-auto h-[800px] w-xl bg-white p-10 rounded-2xl">
        <div className="border-primary mb-4 rounded-2xl bg-amber-50 shadow-2xs flex gap-2 p-2 align-middle justify-center">
          <NavButton
            icon={LogIn}
            href="/sign-in"
            isShowText={true}
            label="Sign In"
          />
          <NavButton
            icon={UserRoundPlus}
            href="/sign-up"
            isShowText={true}
            label="Sign Up"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
