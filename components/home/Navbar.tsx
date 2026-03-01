"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const navMenu = () => {
    return (
      <>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/services"}>Services</Link>
        </li>
        <li>
          <Link href={"/blog"}>Blog</Link>
        </li>
        <li>
          <Link href={"/my-booking"}>My booking</Link>
        </li>
      </>
    );
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navMenu()}
          </ul>
        </div>
        <Link href={"/"} className=" text-xl">
          <div className="w-28 h-20 relative">
            <Image
              src={"/assets/logo.svg"}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">{navMenu()}</ul>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 font-semibold">
          {status == "authenticated" ? (
            <>
              <li>
                {session?.user?.image && (
                  <Image
                    src={session.user.image}
                    height={50}
                    width={50}
                    alt="profile"
                  />
                )}
              </li>
              <li>
                <button onClick={() => signOut({ callbackUrl: "/login" })}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <Link href={"/register"}>Register</Link>
              </li>
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
            </>
          )}
        </ul>
        <a className="btn">Appointment</a>
      </div>
    </div>
  );
}
