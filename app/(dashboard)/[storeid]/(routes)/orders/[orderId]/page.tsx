import prismadb from "@/lib/prismadb";
import { useParams } from "next/navigation";
import OrderForm from "./components/order-form";

const OrderPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  let existing = false;
  let order = null;
  if (params.orderId !== "new") {
    existing = true;
    try {
      order = await prismadb.customOrder.findUnique({
        where: { id: params.orderId },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm initialData={order} />
      </div>
    </div>
  );
};

export default OrderPage;
