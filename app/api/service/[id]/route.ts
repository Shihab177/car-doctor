import { authOptions } from "@/lib/authOption";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export const GET = async (req: Request, { params }: Params) => {
  try {
    const { id } = await params;

    const serviceCollection = await dbConnect(
      collectionNameObj.serviceCollection,
    );

    const data = await serviceCollection.findOne({ _id: new ObjectId(id) });

    if (!data) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("GET /service/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: Request, { params }: Params) => {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const bookingCollection = await dbConnect(
      collectionNameObj.bookingCollection
    );

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const email = session.user?.email;

    const query = { _id: new ObjectId(id) };

    const currentBooking = await bookingCollection.findOne(query);

    if (!currentBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    if (currentBooking.email !== email) {
      return NextResponse.json(
        { success: false, message: "Forbidden access" },
        { status: 403 }
      );
    }

    const result = await bookingCollection.deleteOne(query);
    revalidatePath("/my-booking")

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};