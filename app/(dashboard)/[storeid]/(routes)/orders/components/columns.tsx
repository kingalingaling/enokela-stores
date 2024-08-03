"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CustomCellAction } from "./custom-cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  name:string;
  phone: string;
  address: string;
  isPaid: boolean;
  isFulfilled: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "name",
    header: "Customer Name",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "isFulfilled",
    header: "Fulfilled",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Modified",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
  },
];

export type customOrderColumns = {
  id: string;
  name: string;
  phone: string;
  address: string;
  isPaid: boolean;
  isFulfilled: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
  updatedAt: string;
};

export const customOrdercolumns: ColumnDef<customOrderColumns>[] = [
  {
    accessorKey: "name",
    header: "Customer Name",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "isFulfilled",
    header: "Fulfilled",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Modified",
  },
  {
    id: "actions",
    cell: ({row}) => <CustomCellAction data={row.original} />,
  },
];
