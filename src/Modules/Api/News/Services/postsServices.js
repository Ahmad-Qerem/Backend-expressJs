import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllNews = async () => {
  return await prisma.news.findMany({
    orderBy: [
      {
        created: "desc",
      },
    ],
  });
};

const getNew = async (userId, NewId) => {
  return await prisma.news.findMany({
    where: {
      authorId: Number(userId),
      id: Number(NewId),
    },
    include: {
      comments: true,
    },
  });
};
const createNew = async (New, userId) => {
  return await prisma.news.create({
    data: { ...New, authorId: userId },
  });
};

const updateNew = async (updatedData) => {
  return await prisma.news.update({
    where: {
      id: updatedData.id,
    },
    include: {
      comments: true,
    },
    data: updatedData,
  });
};

const deleteNew = async (ToDeleteId) => {
  return await prisma.news.delete({
    where: {
      id: ToDeleteId,
    },
  });
};
export { getAllNews, createNew, getNew, updateNew, deleteNew };
