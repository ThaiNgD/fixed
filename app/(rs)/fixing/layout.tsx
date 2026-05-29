export default async function RSFixingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full gap-6 p-12 ">{children}</div>;
}
