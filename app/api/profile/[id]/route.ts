import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import cld from "cloudinary";

const cloudinary = cld.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRETE_KEY,
});

// GET - pobranie profilu użytkownika
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const userId = parseInt(id, 10);

    const profile = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!profile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to get user" }, { status: 500 });
  }
};

// PATCH - aktualizacja profilu użytkownika (coverImage)
export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { coverImage } = await req.json();

  try {
    const userId = parseInt(id, 10);

    // upload obrazu do Cloudinary
    const { url } = await cloudinary.uploader.upload(coverImage);

    const updatedProfile = await prisma.user.update({
      where: { id: userId },
      data: { coverImage: url },
    });

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
};
