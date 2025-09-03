import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// DELETE a favorite by its id
export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const favId = parseInt(id, 10);

    await prisma.favorite.delete({
      where: { id: favId },
    });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: `Failed to delete with id: ${id}` }, { status: 500 });
  }
};
