import { BackButton } from "@/components/element/BackwardArrow";
import { PartTable } from "@/components/element/table/PartTable";
import data from "./data.json";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <>
      <BackButton
        isBack={false}
        className="mb-4 !p-0"
        title="Parts Information"
        url="/parts"
      />
      <div className="@container/main p-0 flex flex-1 flex-col gap-2">
        <PartTable data={data} />
      </div>
    </>
  );
};

export default page;
