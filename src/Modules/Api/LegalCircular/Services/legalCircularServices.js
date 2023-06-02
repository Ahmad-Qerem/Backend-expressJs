import { PrismaClient } from "@prisma/client";
import ip from "ip";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const getAllLegalCirculars = async () => {
  return await prisma.legalCircular.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
};

const getLegalCircular = async (NewId) => {
  return await prisma.legalCircular.findMany({
    where: {
      id: Number(NewId),
    },
  });
};

const createLegalCircular = async (legalCircular) => {
  console.log("legalCircular:",legalCircular);
  return await prisma.legalCircular.create({
    data: legalCircular,
  });
};

const updateLegalCircular = async (updatedData) => {
  return await prisma.legalCircular.update({
    where: {
      id: updatedData.id,
    },
    data: updatedData,
  });
};

const deleteLegalCircular = async (ToDeleteId) => {
  const deletedLegalCircular = await prisma.legalCircular.delete({
    where: {
      id: ToDeleteId,
    },
  });
  if (deletedLegalCircular) return "تم الحذف بنجاح";
  return "عذرا العنصر غير متوفر";
};
export {
  getAllLegalCirculars,
  createLegalCircular,
  getLegalCircular,
  updateLegalCircular,
  deleteLegalCircular,
};
