import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaGithub } from "react-icons/fa";
export default function SocialLogin() {
  const router= useRouter()
  const session = useSession()
  const handelSocialLogin = (providerName: string) => {
    signIn(providerName);
    
  };
  useEffect(()=>{
    if(session?.status=='authenticated'){
      router.push("/")
      toast.success("log in successfully")
    }
  },[session?.status,router])
  return (
    <div className="flex justify-center gap-8">
      <p
        onClick={() => handelSocialLogin("github")}
        className="bg-slate-200 rounded-full p-3"
      >
        <FaGithub />
      </p>
      <p
        onClick={() => handelSocialLogin("google")}
        className="bg-slate-200 rounded-full p-3"
      >
        <FaGoogle />
      </p>
      <p
        onClick={() => handelSocialLogin("facebook")}
        className="bg-slate-200 rounded-full p-3"
      >
        <FaFacebookF />
      </p>
    </div>
  );
}
