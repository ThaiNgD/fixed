import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface NavButtonProps {
  href?: string;
  icon: LucideIcon;
  label: string;
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
  label,
  size,
}) => {
  return (
    <Button
      variant="ghost"
      size={size || "icon"}
      aria-label={label}
      title={label}
      className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
      asChild
    >
      {href ? (
        <Link
          href={href}
          className="flex flex-col items-center text-secondary justify-center gap-1 px-3 py-2 text-sm hover:text-gray-900"
        >
          <Icon className="h-8 w-8" />
        </Link>
      ) : (
        <div className="flex flex-col  text-secondary items-center justify-center gap-1 px-3 py-2 text-sm hover:text-gray-900">
          <Icon className="h-8 w-8" />
        </div>
      )}
    </Button>
  );
};

export default NavButton;
