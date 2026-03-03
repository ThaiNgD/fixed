import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface NavButtonProps {
  href?: string;
  icon: LucideIcon;
  variant?:
    | "link"
    | "default"
    | "ghost"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;
  label: string;
  isShowText?: boolean;
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
}

const NavButton: React.FC<NavButtonProps> = ({
  href,
  icon: Icon,
  variant = "ghost",
  label,
  isShowText = false,
  size,
}) => {
  return (
    <Button
      variant={variant}
      size={size || "icon"}
      color="#8d9b6a"
      aria-label={label}
      title={label}
      className="flex flex-row w-fit items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
      asChild
    >
      {href ? (
        <Link
          href={href}
          className="flex flex-row items-center text-secondary justify-center gap-1 px-3 py-2 text-sm hover:text-gray-900"
        >
          <Icon className="h-8 w-8" />
          <span>{isShowText ? label : ""}</span>
        </Link>
      ) : (
        <div className="flex flex-row text-secondary items-center justify-center gap-1 px-3 py-2 text-sm hover:text-gray-900">
          <Icon className="h-8 w-8" />
          <span>{isShowText ? label : ""}</span>
        </div>
      )}
    </Button>
  );
};

export default NavButton;
