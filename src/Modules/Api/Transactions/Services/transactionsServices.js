import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllTransactions = async (userId) => {
  return await prisma.transaction.findMany({
    orderBy: [
      {
        created: "desc",
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
const getTransactionByUserId = async (id) => {
  return await prisma.transaction.findMany({
    where: {
      authorId:+id
    },
  });
};

const createTransaction = async (updatedData, userID) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });

  if (!existingUser) {
    throw new Error("User does not exist");
  }

  updatedData.authorId = userID;

  return await prisma.transaction.create({
    data: updatedData,
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
  await prisma.transaction.delete({
    where: {
      id: ToDeleteId,
    },
  });

  return "تم حذف المعاملة";
};
export {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
  getTransactionByUserId
};
