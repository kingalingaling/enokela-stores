import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new NextResponse("Order ID is required", { status: 400 });
    }

    const customOrder = await prismadb.customOrder.findUnique({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(customOrder);
  } catch (error) {
    console.log("[CUSTOM_ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
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

    const customOrder = await prismadb.customOrder.updateMany({
      where: {
        id: params.orderId,
      },
      data: {
        name,
        phone,
        address,
        isPaid,
        isFulfilled,
        totalPrice,
        products,
      },
    });

    return NextResponse.json(customOrder);
  } catch (error) {
    console.log("[CUSTOM ORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.orderId) {
      return new NextResponse("ORder ID is required", { status: 400 });
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

    const customOrder = await prismadb.customOrder.deleteMany({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(customOrder);
  } catch (error) {
    console.log("[CUSTOM_ORDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
