import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllUserComments = async (userID) => {
  return await prisma.comment.findMany({
    where: {
      userId: Number(userID),
    },
    orderBy: [
      {
        startTime: "asc",
      },
    ],
  });
};

const getCommentByID = async (userID, bookingId) => {
  return await prisma.booking.findMany({
    where: {
      userId: Number(userID),
      id: Number(bookingId),
    },
  });
};
const createComment = async (book, userId) => {
  
  return await prisma.booking.create({
    data: {
      ...book,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

const updateComment = async (updatedData) => {
  return await prisma.booking.update({
    where: {
      id: updatedData.id,
    },
    data: updatedData,
  });
};

const deleteComment = async (ToDeleteId) => {
  return await prisma.post.delete({
    where: {
      id: ToDeleteId,
    },
  });
};
export {
  getAllUserComments,
  createComment,
  getCommentByID,
  updateComment,
  deleteComment,
};
