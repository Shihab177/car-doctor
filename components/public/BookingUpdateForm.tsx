"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export interface Service {
  address: string;
  date: string;
  email: string;
  name: string;
  phone: string;
  service_id: string;
  service_img: string;
  service_name: string;
  service_price: string;
  _id: string;
}

type CheckoutFormProps = { data: Service };

export default function BookingUpdateForm({ data }: CheckoutFormProps) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    date: data.date || "",
    phone: data.phone || "",
    address: data.address || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookService = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formValues.date || !formValues.phone || !formValues.address) {
      toast.error("All fields are required!");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Updating booking...", { id: "update" });

    const UpdateBookingPayload = {
      date: formValues.date,
      phone: formValues.phone,
      address: formValues.address,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-bookings/${data._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
            
          body: JSON.stringify(UpdateBookingPayload),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Booking Updated Successfully", { id: "update" });
        router.push("/my-booking");
      } else {
        toast.error(result?.message || "Update Failed", { id: "update" });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "update" });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleBookService}
      className="max-w-[1536px] mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Book Service: {data.service_name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Name</span>
          </label>
          <input
            type="text"
            value={data.name}
            readOnly
            className="border px-4 py-2 rounded-sm w-full bg-gray-100"
          />
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Email</span>
          </label>
          <input
            type="email"
            value={data.email}
            readOnly
            className="border px-4 py-2 rounded-sm w-full bg-gray-100"
          />
        </div>

        {/* Price */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Due Amount</span>
          </label>
          <input
            type="text"
            value={data.service_price}
            readOnly
            className="border px-4 py-2 rounded-sm w-full bg-gray-100"
          />
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Date</span>
          </label>
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
            className="border px-4 py-2 rounded-sm w-full"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Phone */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Phone</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            className="border px-4 py-2 rounded-sm w-full"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Address */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Address</span>
          </label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            placeholder="Your Address"
            className="border px-4 py-2 rounded-sm w-full"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full mt-4 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Update Booking"}
      </button>
    </form>
  );
}