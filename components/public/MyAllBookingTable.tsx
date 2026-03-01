import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

import React from "react";
import DeleteBookingButton from "@/app/(publicPage)/my-booking/components/DeleteBookingButton";
interface Booking {
  _id: string;
  service_name: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  service_id: string;
  service_img: string;
  service_price: string;
}

interface Props {
  data: Booking[];
}
export default function MyAllBookingTable({ data }: Props) {
  return (
    <div className="w-full">
      <h1 className="text-center font-bold text-3xl my-4">My All Bookings</h1>
      <div className="=w-full overflow-x-auto">
        <table className="w-full table table-zebra">
          <thead className="border">
            <tr>
              <th>Service Image</th>
              <th>Service Name</th>
              <th>Service Date</th>
              <th>Service Price</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          {data && data.length > 0 ? (
            <tbody>
              {data?.map((item) => {
                return (
                  <tr key={item._id} className="border">
                    <td>
                      <Image
                        src={item.service_img}
                        alt={item.service_name}
                        width={50}
                        height={50}
                      />
                    </td>
                    <td>{item.service_name}</td>
                    <td>{item.date}</td>
                    <td>{item.service_price}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>
                      <Link href={`/my-booking/${item._id}`}>
                        <FaRegEdit size={20} className=" font-bold" />
                      </Link>
                    </td>

                    <td>
                      <DeleteBookingButton id={item._id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-2xl text-black py-4"
                >
                  No Booking Data Found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
