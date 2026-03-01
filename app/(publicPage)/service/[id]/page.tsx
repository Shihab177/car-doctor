import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
     const {id} = await params;
    
    const res = await fetch(`http://localhost:3000/api/service/${id}`)
    const data =await res.json()

  return (
    <div className="max-w-[1536px] mx-auto pt-12">
      <div className="h-[400px] w-full relative">
        <div className=" h-full">
          <Image
            src={"/assets/images/checkout/checkout.png"}
            alt={"banner"}
            fill
           
            className="object-cover"
          />
        </div>
        <div className="overlay-div  h-full absolute top-0 w-full flex items-center ">
          <h1 className="ml-25 text-white font-bold text-4xl">{data?.title}</h1>
        </div>
      </div>
      <div className="mt-8 w-full flex gap-x-8">
        <div className="relative w-3/4 h-[400px]">
          <Image
            src={data?.img}
            alt={data?.title}
            fill
            
            className="object-cover rounded-md"
          />
        </div>
        <div className="w-1/4">
       <Link href={`/checkout/${id}`}> <button  className="bg-[#FA3025] w-full py-2 text-white font-medium rounded-sm">Checkout</button></Link>
        <p className="text-xl font-semibold text-center mt-4">Price : ${data?.price}</p>
        </div>
      </div>
      <div className="mt-8 pb-8">
         <h1 className=" text-black font-bold text-4xl">{data?.title}</h1>
         <p>{data?.description}</p>
      </div>
    </div>
  );
}
