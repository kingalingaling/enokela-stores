import prismadb from "@/lib/prismadb";
import SizeForm from "./components/size-form";

const SizePage = async ({
  params,
}: {
  params: { sizeId: string };
}) => {
  let existing = false;
  let size = null;
  if (params.sizeId !== "new") {
    existing = true;
    try {
      size = await prismadb.size.findUnique({
        where: { id: params.sizeId },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
