"use client";
import { registerUser } from "@/app/actions/auth/registerUser";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import SocialLogin from "../../login/components/SocialLogin";
export default function RegisterForm() {
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const result =await registerUser({ name, email, password });
      console.log(result);
  };
  return (
    <form onSubmit={handelSubmit} className="w-full max-w-lg space-y-8">
      <div className="">
        <label className="form-control w-full">
          <div className="label w-full">
            <span className="label-text  font-bold">Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full border outline-0"
            name="name"
          />
        </label>
      </div>
      <div className="">
        <label className="form-control w-full">
          <div className="label w-full">
            <span className="label-text  font-bold">Email</span>
          </div>
          <input
            type="text"
            name="email"
            placeholder="Type here"
            className="input input-bordered w-full border outline-0"
          />
        </label>
      </div>
      <div className="">
        <label className="form-control w-full ">
          <div className="label w-full">
            <span className="label-text font-bold">Password</span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Type here"
            className="input input-bordered w-full border outline-0 "
          />
        </label>
      </div>
      <button className=" w-full h-12 bg-orange-500 text-white font-bold">
        Sign Up
      </button>
      <p className="text-center">Or Sign In with</p>
      <SocialLogin/>
      <p className="text-center ">
        Don t Have an account?{" "}
        <Link href="/login" className="text-orange-500 font-bold">
          Login
        </Link>
      </p>
    </form>
  );
}
