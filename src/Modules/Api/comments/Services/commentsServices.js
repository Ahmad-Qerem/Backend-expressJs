import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllUserComments = async (userID) => {
  return await prisma.comment.findMany({
    where: {
      authorId: Number(userID),
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
};

const getCommentByID = async (userID, commentId) => {
  return await prisma.comment.findMany({
    where: {
      authorId: Number(userID),
      id: Number(commentId),
    },
  });
};

const createComment = async (comment, userId) => {
  console.log("comment",comment);
  return await prisma.comment.create({
    data: {
      data: comment.data,
      author: {
        connect: { id: userId }
      },
      post: {
        connect: { id: comment.postId }
      }
    },
  });
};


const updateComment = async (updatedData, userId) => {
  const comment = await prisma.comment.findFirst({
    where: {
      AND: [{ id: updatedData.id }, { authorId: userId }],
    },
  });

  if (!comment) {
    throw new Error("Comment not found or you don't have permission to update it.");
  }

  return await prisma.comment.update({
    where: {
      id: updatedData.id,
    },
    data: updatedData,
  });
};


const deleteComment = async (ToDeleteId, userId, isAdmin) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: ToDeleteId,
    },
  });

  if (!comment) {
    return "عذرًا، هذا التعليق غير متوفر";
  }

  if (!isAdmin && comment.authorId !== userId) {
    return "عذرًا، ليس لديك صلاحية حذف هذا التعليق";
  }

  await prisma.comment.delete({
    where: {
      id: ToDeleteId,
    },
  });

  return "تم حذف التعليق بنجاح";
};

export {
  getAllUserComments,
  createComment,
  getCommentByID,
  updateComment,
  deleteComment,
};
