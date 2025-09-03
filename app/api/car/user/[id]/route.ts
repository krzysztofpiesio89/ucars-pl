import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import cld from "cloudinary";

const cloudinary = cld.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRETE_KEY,
});

// GET – wszystkie samochody użytkownika
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const userId = parseInt(id, 10);

    const allCars = await prisma.car.findMany({
      where: { creatorId: userId },
    });

    return NextResponse.json(allCars, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to get cars" }, { status: 500 });
  }
};

// DELETE – usuń samochód użytkownika po ID
export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const carId = parseInt(id, 10);

    await prisma.car.delete({
      where: { id: carId },
    });

    return NextResponse.json({ message: "Car deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete car" }, { status: 500 });
  }
};

// PATCH – aktualizacja samochodu użytkownika
export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const carInfo = await req.json();

  try {
    const carId = parseInt(id, 10);

    // Upload obrazów do Cloudinary
    const photosUrl = await Promise.all(
      (carInfo.imageFiles || []).map(async (base64: string) => {
        const { url } = await cloudinary.uploader.upload(base64);
        return url;
      })
    );

    const updatedCar = await prisma.car.update({
      where: { id: carId },
      data: {
        ...carInfo,
        imageFiles: photosUrl,
      },
    });

    return NextResponse.json(updatedCar, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update car" }, { status: 500 });
  }
};

// POST – utwórz nowy samochód użytkownika
export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const carInfo = await req.json();

  try {
    const userId = parseInt(id, 10);

    const photosUrl = await Promise.all(
      (carInfo.imageFiles || []).map(async (base64: string) => {
        const { url } = await cloudinary.uploader.upload(base64);
        return url;
      })
    );

    const newCar = await prisma.car.create({
      data: {
        ...carInfo,
        imageFiles: photosUrl,
        creatorId: userId,
      },
    });

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create car" }, { status: 500 });
  }
};
