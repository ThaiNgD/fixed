"use client";

import { ChevronLeft } from "lucide-react"; // or ArrowLeft
import { useRouter } from "next/navigation";

export function BackButton({
  title,
  url,
  className,
}: {
  title: string;
  url: string;
  className?: string;
}) {
  const router = useRouter();

  return (
    <div
      className={`flex items-center gap-1 p-6 text-2xl font-bold ${className}`}
    >
      <a
        onClick={() => router.push(url)}
        className="text-muted-foreground hover:text-foreground hover:cursor-pointer h-6 w-6 mt-1 font-bold"
      >
        <ChevronLeft />
      </a>
      <span>{title}</span>
    </div>
  );
}
