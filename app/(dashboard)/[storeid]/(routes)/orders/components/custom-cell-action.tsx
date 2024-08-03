"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import { OrderColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, Check, MoreHorizontal, Trash, X } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: OrderColumn;
}

export const CustomCellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Order ID copied to the clipboard");
  };

  const setFulfilled = async (value: boolean) => {
    setLoading(true)
    const {id, ...restData} = data
    await axios.patch(`/api/${params.storeId}/customOrders/${data.id}`, {
      ...restData,
      isFulfilled: value,
    });
    router.refresh()
    setLoading(false)
    toast.success("Order Fulfillment Updated");
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderFulfilled, setOrderFulfilled] = useState(data.isFulfilled);

  useEffect(() => {
    setOrderFulfilled(data.isFulfilled);
  }, [orderFulfilled, data.isFulfilled]);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/customOrders/${data.id}`);
      router.refresh();
      toast.success("Order Deleted");
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if(loading) {
    return(
      <div className="flex justify-center items-center">
        <ReactLoading type="spin" color="black" height={30} width={30} />
      </div>
    )
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/${params.storeId}/orders/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          {!data.isFulfilled ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setFulfilled(true);
              }}
            >
              <Check className="mr-2 h-4 w-4" />
              Mark as Fulfilled
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setFulfilled(false);
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Mark as Unfulfilled
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
