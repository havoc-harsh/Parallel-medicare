import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password, licenseNumber } = await req.json();

    // ✅ Find hospital by license number
    const hospital = await prisma.hospital.findUnique({
      where: { licenseNumber },
    });

    // ✅ Check if hospital exists before accessing its properties
    if (!hospital) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Check password
    const isPasswordCorrect = await bcrypt.compare(password, hospital.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Generate JWT token only if hospital exists
    const token = jwt.sign(
      { id: hospital.id, email: hospital.email, licenseNumber: hospital.licenseNumber },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // ✅ Set token in HTTP-only cookie
    return NextResponse.json(
      { message: "Login successful", token },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      }
    );
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
