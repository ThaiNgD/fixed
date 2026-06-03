"use client";
import { LogIn, UserRoundPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import NavButton from "./NavButton";

const AuthToggle = () => {
  const currentParams = usePathname();
  console.log("currentParams", currentParams);
  return (
    <>
      <NavButton
        icon={LogIn}
        variant={"outline"}
        href="/sign-in"
        isShowText={true}
        label="Sign In"
        disabled={currentParams === "/sign-in"}
        style={
          currentParams === "/sign-in"
            ? {
                cursor: "unset",
                backgroundColor: "#d2691e",
                color: "#111827",
              }
            : undefined
        }
      />
      <NavButton
        icon={UserRoundPlus}
        variant={"outline"}
        href="/sign-up"
        disabled={currentParams === "/sign-up"}
        isShowText={true}
        label="Sign Up"
        style={
          currentParams === "/sign-up"
            ? {
                cursor: "unset",
                backgroundColor: "#d2691e",
                color: "#111827",
              }
            : undefined
        }
      />
    </>
  );
};

export default AuthToggle;
