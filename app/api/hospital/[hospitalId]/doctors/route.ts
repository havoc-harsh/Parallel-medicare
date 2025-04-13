import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  hospitalId: string;
}

export async function GET(
  req: Request, 
  { params }: { params: Params }
) {
  try {
    const hospitalId = parseInt(params.hospitalId);
    if (isNaN(hospitalId)) {
      return NextResponse.json({ error: 'Invalid hospitalId' }, { status: 400 });
    }

    const doctors = await prisma.doctor.findMany({
      where: { hospitalId },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  req: Request, 
  { params }: { params: Params }
) {
  try {
    const hospitalId = parseInt(params.hospitalId);
    if (isNaN(hospitalId)) {
      return NextResponse.json({ error: 'Invalid hospitalId' }, { status: 400 });
    }

    const data = await req.json();
    if (!data.name || !data.specialization) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const doctor = await prisma.doctor.create({
      data: {
        name: data.name,
        specialization: data.specialization,
        shift: data.shift || 'Not Assigned',
        hospitalId: hospitalId,
      },
    });

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    if ((error as any).code === 'P2003') {
      return NextResponse.json({ error: 'Hospital not found' }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT (Update Doctor)
export async function PUT(
  req: Request, 
  { params }: { params: Params }
) {
  try {
    const hospitalId = parseInt(params.hospitalId);
    if (isNaN(hospitalId)) {
      return NextResponse.json({ error: 'Invalid hospitalId' }, { status: 400 });
    }

    const data = await req.json();
    const id = parseInt(data.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid doctor id' }, { status: 400 });
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: {
        name: data.name,
        specialization: data.specialization,
        shift: data.shift
      }
    });

    return NextResponse.json(updatedDoctor);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request, 
  { params }: { params: Params }
) {
  try {
    const hospitalId = parseInt(params.hospitalId);
    if (isNaN(hospitalId)) {
      return NextResponse.json({ error: 'Invalid hospitalId' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id') || '');
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid doctor id' }, { status: 400 });
    }

    await prisma.doctor.delete({
      where: { id }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}