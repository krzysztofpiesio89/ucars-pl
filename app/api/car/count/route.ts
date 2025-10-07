import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET() {
  try {
    const carCount = await prisma.car.count();
    return NextResponse.json({ count: carCount });
  } catch (error) {
    console.error('Error fetching car count:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
