import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();
    await connect();

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Email and password are required" }),
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Option 1: return as JSON
    return new NextResponse(
      JSON.stringify({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      }),
      { status: 200 }
    );

    // Option 2 (better for production): 
    // Set token as HTTP-only cookie instead of returning it in JSON.
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error while logging in", error: error.message }),
      { status: 500 }
    );
  }
};
