import Navbar, {
  NavLinkItem,
} from "@/components/shadcn-space/blocks/hero-02/navbar";

const navData: NavLinkItem[] = [
  { name: "Home", href: "#", isActive: true },
  { name: "Properties", href: "#", isActive: false },
  { name: "Blog", href: "#", isActive: false },
  { name: "Contact", href: "#", isActive: false },
  { name: "Docs", href: "#", isActive: false },
];

export default async function RSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-rs-page bg-home-page bg-repeat-y bg-[length:100%_auto] w-full bg-center dark:bg-black">
      <main className="h-fit min-h-dvh">
        {/* <Header /> */}
        <Navbar navData={navData} />
        <div className="w-full gap-6 p-12 ">{children}</div>
      </main>
    </div>
  );
}
