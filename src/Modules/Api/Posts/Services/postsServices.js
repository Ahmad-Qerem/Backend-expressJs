import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllPosts = async (userId) => {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
};

const getPost = async (userId, postId) => {
  return await prisma.post.findMany({
    where: {
      authorId:Number(userId),
      id: Number(postId),
    },
  });
};
const createPost = async (post, userId) => {
  return await prisma.post.create({
    data: { ...post, authorId: userId },
  });
};

const updatePost = async (updatedData) => {
  return await prisma.post.update({
    where: {
      id: updatedData.id,
    },
    data: updatedData,
  });
};

const deletePost = async (ToDeleteId) => {
  return await prisma.post.delete({
    where: {
      id: ToDeleteId,
    },
  });
};
export { getAllPosts, createPost, getPost, updatePost, deletePost };
