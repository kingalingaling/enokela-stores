import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import SizeClient from "./components/SizeClient";
import { SizeColumn } from "./components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "HH:mm - MMMM do, yyyy"),
    updatedAt: format(item.updatedAt, "HH:mm - MMMM do, yyyy"),
  }));

  return (
    <div className="flex=col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
