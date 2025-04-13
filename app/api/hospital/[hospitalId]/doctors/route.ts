import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request, 
  { params }: { params: { hospitalId: string } }
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
  request: Request, 
  { params }: { params: { hospitalId: string } }
) {
  try {
    const hospitalId = parseInt(params.hospitalId);
    if (isNaN(hospitalId)) {
      return NextResponse.json({ error: 'Invalid hospitalId' }, { status: 400 });
    }

    const data = await request.json();
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
  request: Request, 
  { params }: { params: { hospitalId: string } }
) {
  try {
    const hospitalId = parseInt(params.hospitalId);
    if (isNaN(hospitalId)) {
      return NextResponse.json({ error: 'Invalid hospitalId' }, { status: 400 });
    }

    const data = await request.json();
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
  request: Request, 
  { params }: { params: { hospitalId: string } }
) {
  try {
    const hospitalId = parseInt(params.hospitalId);
    if (isNaN(hospitalId)) {
      return NextResponse.json({ error: 'Invalid hospitalId' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
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