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
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection);
    const query = {
      _id: new ObjectId(id),
    };
    const session = await getServerSession(authOptions);
    console.log("session.................",session)
    const email = session?.user?.email;
    const singleBooking = await bookingCollection.findOne(query);
    const isOwnerOk = email === singleBooking?.email;
     if (!isOwnerOk)
      return NextResponse.json({
        success: false,
        message: "forbidden access",
      });
    return NextResponse.json(singleBooking);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
export const PATCH = async (req: Request, { params }: Params) => {
  try {
    const { id } = await params;
    const bookingCollection = dbConnect(collectionNameObj.bookingCollection);
    const query = {
      _id: new ObjectId(id),
    };
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const currentBooking = await bookingCollection.findOne(query);
    const isOwnerOk = email === currentBooking?.email;
    if (!isOwnerOk)
      return NextResponse.json({
        success: false,
        message: "forbidden update action",
      });
    const body = await req.json();
    const filter = {
      $set: { ...body },
    };
    const option = {
      upsert: true,
    };

    const result = await bookingCollection.updateOne(query, filter, option);
    revalidatePath("my-booking");
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
