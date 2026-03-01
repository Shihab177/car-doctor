"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};
export const registerUser = async (payload: RegisterPayload) => {
  try {
    const userCollection = dbConnect(collectionNameObj.userCollection);
    const { name, email, password } = payload;
     
    if (!email || !password || password.length < 8) {
      return { success: false, message: "Invalid input" };
    }

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userCollection.insertOne({
      name,
      email,
      password: hashedPassword,
    });
    
    return {
      success: true,
      userId: result.insertedId.toString(),
    };
    
  } catch (error) {
    console.error("Register Error:", error);
    return { success: false };
  }
};