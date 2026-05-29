import Header from "@/components/layout/Header";

export default async function RSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-rs-page bg-home-page bg-repeat-y bg-[length:100%_auto] w-full bg-center dark:bg-black">
      <main className="h-fit min-h-dvh">
        <Header />
        <div className="w-full gap-6 p-12 ">{children}</div>
      </main>
    </div>
  );
}
