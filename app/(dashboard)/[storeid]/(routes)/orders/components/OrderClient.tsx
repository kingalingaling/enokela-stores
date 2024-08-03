"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { OrderColumn, columns, customOrdercolumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface OrderClientProps {
  data: OrderColumn[];
  handleOrdertype: (isCustom: boolean) => void;
  isCustom: boolean;
}

const OrderClient: React.FC<OrderClientProps> = ({
  data,
  handleOrdertype,
  isCustom,
}) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between w-[40%]">
          <Heading
            title={`Orders (${data.length})`}
            description="Manage orders for your store"
          />
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => handleOrdertype(false)}
              variant={isCustom ? "ghost" : "default"}
            >
              {isCustom ? "View Store Orders" : "Store Orders"}
            </Button>
            <Button
              onClick={() => handleOrdertype(true)}
              variant={isCustom ? "default" : "ghost"}
            >
              {isCustom ? "Custom Orders" : "View Custom Orders"}
            </Button>
          </div>
        </div>
        {isCustom && (
          <Button onClick={() => router.push(`/${params.storeId}/orders/new`)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Custom Order
          </Button>
        )}
      </div>
      <Separator />
      <DataTable columns={isCustom?customOrdercolumns:columns} data={data} searchKey="name"/>
      {isCustom && (
        <div>
          <Heading title="API" description="API Calls for Orders" />
          <Separator />
          <ApiList entityName="customOrders" entityIdName="orderId" />
        </div>
      )}
    </>
  );
};

export default OrderClient;
