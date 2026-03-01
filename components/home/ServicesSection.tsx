import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default async function ServicesSection() {
  const serviceCollection = dbConnect(collectionNameObj.serviceCollection);
  const data = await serviceCollection.find({}).toArray();
   if (!data) {
    return (
      <div className="p-10 text-center text-red-500">
        Service not found
      </div>
    );
  }
  return (
    <section className="px-4 py-12 max-w-[1536px]  mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">Our Service Area</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        The Majority Have Suffered Alteration In Some Form, By Injected Humour,
        Or Randomised Words Which Dont Look Even Slightly Believable.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id.toString()}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-[208px]">
              <Image
              src={item.img}
              fill
              alt={item.title}
              
              className="object-cover"
            />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-[#FF3811] font-bold text-lg">
                  Price: ${item.price}
                </p>
                <Link href={`/service/${item._id.toString()}`}><FaArrowRight className="text-[#FF3811] cursor-pointer" /></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
