"use client";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";
export default function LoginForm() {
    const router = useRouter()
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    toast("signIn.....")
   try{
     const response = await signIn("credentials", { email, password ,redirect:false});
     if(response?.ok){
       router.push("/")
       form.reset()
       toast.success("signIn successfully")
     }else{
         toast.error("authentication failed")
     }
   }catch(error){
    toast.error("authentication failed")
        console.log(error)
   }
  };
  return (
    <form onSubmit={handelSubmit} className="w-full max-w-lg space-y-8">
      <div>
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
      <div>
        <label className="form-control w-full">
          <div className="label w-full">
            <span className="label-text font-bold">Password</span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Type here"
            className="input input-bordered w-full border outline-0"
          />
        </label>
      </div>
      <button className="w-full h-12 bg-orange-500 text-white font-bold">
        Sign In
      </button>
      <p className="text-center">Or Sign In with</p>
      <SocialLogin/>
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/register" className="text-orange-500 font-bold">
          Register
        </Link>
      </p>
    </form>
  );
}
