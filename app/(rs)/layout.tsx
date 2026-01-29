import Header from "@/components/layout/Header";

export default async function RSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-rs-page bg-home-page bg-cover bg-center dark:bg-black">
      <main className="h-dvh">
        <Header />
        <div className="flex gap-6 p-12 ">{children}</div>
      </main>
    </div>
  );
}
