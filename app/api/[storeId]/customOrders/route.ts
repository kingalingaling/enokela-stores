import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, phone, address, isPaid, isFulfilled, totalPrice, products } =
      body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Customer Name is Required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone Number is Required", { status: 400 });
    }

    if (!address) {
      return new NextResponse("Customer Address is Required", { status: 400 });
    }

    if (!totalPrice) {
      return new NextResponse("Total Price is Required", { status: 400 });
    }

    if (!products) {
      return new NextResponse("Product Array is Required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const customOrder = await prismadb.customOrder.create({
      data: {
        name,
        phone,
        address,
        isPaid,
        isFulfilled,
        totalPrice,
        products,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(customOrder);
  } catch (error) {
    console.log("[CUSTOM_ORDERS_POST]");
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }

    const customOrders = await prismadb.customOrder.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(customOrders);
  } catch (error) {
    console.log("[CUSTOM_ORDERS_GET]");
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
