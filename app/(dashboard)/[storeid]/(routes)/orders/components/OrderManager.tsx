"use client"

import { useState } from "react";
import OrderClient from "./OrderClient";
import { OrderColumn } from "./columns";

interface OrderManagerProps {
  formattedOrders: OrderColumn[];
  formattedCustomOrders: OrderColumn[];
}

const OrderManager:React.FC<OrderManagerProps> = ({ formattedOrders, formattedCustomOrders }) => {
  const [custom, setCustom] = useState(false);

  const handleOrderType = (isCustom: boolean) => {
    setCustom(isCustom)
  }

  return (
    <div className="flex=col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {custom ? (
          <OrderClient data={formattedCustomOrders} handleOrdertype={handleOrderType} isCustom={custom}/>
        ) : (
          <OrderClient data={formattedOrders} handleOrdertype={handleOrderType} isCustom={custom}/>
        )}
      </div>
    </div>
  );
};

export default OrderManager;
