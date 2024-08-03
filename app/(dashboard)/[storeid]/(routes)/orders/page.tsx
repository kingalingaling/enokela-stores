import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { customOrderColumns, OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import OrderManager from "./components/OrderManager";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const customOrders = await prismadb.customOrder.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isFulfilled: item.isFulfilled,
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "HH:mm - MMMM do, yyyy"),
    updatedAt: format(item.updatedAt, "HH:mm - MMMM do, yyyy"),
  }));

  const formattedCustomOrders: customOrderColumns[] = customOrders.map(
    (item) => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      address: item.address,
      products: item.products,
      totalPrice: item.totalPrice,
      isFulfilled: item.isFulfilled,
      isPaid: item.isPaid,
      createdAt: format(item.createdAt, "HH:mm - MMMM do, yyyy"),
      updatedAt: format(item.updatedAt, "HH:mm - MMMM do, yyyy"),
    })
  );

  return (
    <OrderManager formattedOrders={formattedOrders} formattedCustomOrders={formattedCustomOrders}/>
  );
};

export default OrdersPage;
