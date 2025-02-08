import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const registerSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(10),
  contactPerson: z.string().min(3),
  phone: z.string().min(10),
  email: z.string().email(),
  licenseNumber: z.string().min(5),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, confirmPassword, ...rest } = registerSchema.parse(body);

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords don't match" },
        { status: 400 }
      );
    }

    const existingHospital = await prisma.hospital.findFirst({
      where: { OR: [{ email: rest.email }, { licenseNumber: rest.licenseNumber }] }
    });

    if (existingHospital) {
      return NextResponse.json(
        { error: "Hospital already exists with this email or license number" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const hospital = await prisma.hospital.create({
      data: { ...rest, password: hashedPassword }
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: hospital.id, email: hospital.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const serializedCookie = serialize('token', token, { // ✅ Corrected
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return new NextResponse(
      JSON.stringify({ hospital: { ...hospital, password: undefined } }),
      {
        status: 201,
        headers: { 'Set-Cookie': serializedCookie }
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
