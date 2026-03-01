"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Facility {
  name: string;
  details: string;
}
export interface Service {
  _id: string;
  service_id: string;
  title: string;
  img: string;
  price: string;
  description: string;
  facility: Facility[];
}
type CheckoutFormProps = { data: Service };

export default function CheckoutForm({ data }: CheckoutFormProps) {
  const { data: session } = useSession();
  const [formValues, setFormValues] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    date: "",
    phone: "",
    address: "",
  });
  React.useEffect(() => {
  if (session?.user) {
    setFormValues((prev) => ({
      ...prev,
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    }));
  }
}, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookService = async (e: React.FormEvent) => {
    e.preventDefault();
    toast("Submitting Booking...");

    const bookingPayload = {
      ...formValues,
      service_name: data.title,
      service_id: data._id,
      service_img: data.img,
      service_price: data.price,
    };
     const res = await fetch('http://localhost:3000/api/service',{
        method:"POST",
        body:JSON.stringify(bookingPayload)
     })
     const postedResponse =await res.json()
     console.log(postedResponse)
    console.log("Booking payload:", bookingPayload);
  };

  return (
    <form
      onSubmit={handleBookService}
      className="max-w-[1536px] mx-auto  space-y-6"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Book Service: {data.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="text-gray-800 text-md font-semibold">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            readOnly
            onChange={handleChange}
            placeholder="Your Name"
            className="border px-4 py-2 rounded-sm w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-gray-800 text-md font-semibold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            readOnly
            onChange={handleChange}
            placeholder="Your Email"
            className="border px-4 py-2 rounded-sm w-full"
            required
          />
        </div>
        <div className="form-control ">
          <label className="label">
            <span className="text-gray-800 text-md font-semibold">
              Due Amount
            </span>
          </label>
          <input
            type="text"
            name="price"
            value={data.price}
            readOnly
            className="border px-4 py-2 rounded-sm w-full bg-gray-100"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-gray-800 text-md font-semibold">Date</span>
          </label>
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
            className="border px-4 py-2 rounded-sm w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-gray-800 text-md font-semibold">Phone</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            className="border px-4 py-2 rounded-sm w-full"
            required
          />
        </div>

        <div className="form-control ">
          <label className="label">
            <span className="text-gray-800 text-md font-semibold">Address</span>
          </label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            placeholder="Your Address"
            className="border px-4 py-2 rounded-sm w-full"
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full mt-4 text-white">
        Confirm Booking
      </button>
    </form>
  );
}
