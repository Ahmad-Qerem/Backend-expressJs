import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createCourt = async (updatedData) => {
  return await prisma.Court.create({
    data: { ...updatedData },
  });
};

const updateCourt = async (updatedData) => {
  return await prisma.Court.update({
    where: {
      id: updatedData.id,
    },
    data: updatedData,
  });
};

const deleteCourt = async (ToDeleteId) => {
  return await prisma.Court.delete({
    where: {
      id: ToDeleteId,
    },
  });
};

const getAllCourts = async () => {
  return await prisma.Court.findMany({
    orderBy: [{ id: "asc" }],
  });
};

const getCourt = async (id) => {
  return await prisma.Court.findUnique({
    where: {
      id: +id,
    },
  });
};

export { createCourt, deleteCourt, getAllCourts, getCourt, updateCourt };
