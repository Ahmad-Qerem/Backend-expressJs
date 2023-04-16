import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllTransactions = async () => {
  return await prisma.transaction.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
};
const getTransaction = async (id) => {
  return await prisma.transaction.findUnique({
    where: {
      id: +id,
    },
  });
};
const createTransaction = async (updatedData, user) => {
  return await prisma.transaction.create({
    data: { ...updatedData, authorId: user.id },
  });
};

const updateTransaction = async (updatedData) => {
  return await prisma.transaction.update({
    where: {
      id: updatedData.id,
    },
    data: updatedData,
  });
};

const deleteTransaction = async (ToDeleteId) => {
  return await prisma.transaction.delete({
    where: {
      id: ToDeleteId,
    },
  });
};
export {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
};
