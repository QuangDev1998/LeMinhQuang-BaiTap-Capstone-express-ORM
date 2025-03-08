import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true, email: true },
  });
  if (!user) throw new Error("User not found");
  return user;
};

export const getSavedImages = async (userId) => {
  const parsedUserId = parseInt(userId);
  const savedImages = await prisma.savedImage.findMany({
    where: { userId: parsedUserId },
    include: { image: { include: { user: true } } },
  });
  return savedImages.map((saved) => saved.image);
};

export const getCreatedImages = async (userId) => {
  const parsedUserId = parseInt(userId);
  return prisma.image.findMany({
    where: { userId: parsedUserId },
    include: { user: true },
  });
};

export const deleteImage = async (imageId, userId) => {
  const image = await prisma.image.findUnique({
    where: { id: Number(imageId) },
  });
  if (!image || image.userId !== userId) {
    throw new Error("Image not found or not authorized");
  }
  await prisma.image.delete({ where: { id: Number(imageId) } });
};
