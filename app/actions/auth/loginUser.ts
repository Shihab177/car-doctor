"use server";
import bcrypt from "bcrypt";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
type loginPayload = {
  email: string;
  password: string;
};
export const loginUser = async (payload: loginPayload) => {
  const { email, password } = payload;

  try {
    const userCollection = dbConnect(collectionNameObj.userCollection);
    const user = await userCollection.findOne({ email });
    if (!user) {
      return null;
    }

    const isPasswordOk = await bcrypt.compare( password ,user?.password);
    if (!isPasswordOk) return null;
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
