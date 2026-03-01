import { authOptions } from "@/lib/authOption";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export const GET = async (req : Request)=>{
    const session = await getServerSession(authOptions)
    if(session){
        console.log(session)
        const email = session?.user?.email
        const bookingCollection = dbConnect(collectionNameObj.bookingCollection)
        const result =await bookingCollection.find({email}).toArray()
        return NextResponse.json(result)
    }
    
}
export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const bookingCollection = await dbConnect(
      collectionNameObj.bookingCollection,
    );
    const result = await bookingCollection.insertOne(body);

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};