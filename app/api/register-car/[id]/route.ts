import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import cld from "cloudinary";

const cloudinary = cld.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRETE_KEY,
});

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params; // userId
  const body = await req.json();

  try {
    // upload zdjęć do Cloudinary
    const photoUploadPromises = body.imageFiles.map(async (base64: string) => {
      const { url } = await cloudinary.uploader.upload(base64);
      return url;
    });

    const photosUrl = await Promise.all(photoUploadPromises);

    // tworzymy nowy rekord w Prisma
    const newCar = await prisma.car.create({
      data: {
        lotNumber: body.lotNumber, // możesz dopasować pola
        vin: body.vin,
        year: body.year,
        make: body.manufacturer,
        model: body.model,
        trim: body.typeOfclass,
        cylinders: body.cylinders,
        fuelType: body.fuelType,
        transmission: body.transmission,
        drive: body.drive,
        imageFiles: photosUrl,
        creator: { connect: { id: parseInt(id, 10) } },
      },
    });

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create a car" }, { status: 500 });
  }
};
