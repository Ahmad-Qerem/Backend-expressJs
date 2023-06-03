import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllPosts = async (searchFilter) => {
  let whereFilters = {};
  if (searchFilter) {
    whereFilters = {
      OR: [
        { title: { contains: searchFilter, mode: "insensitive" } },
        { description: { contains: searchFilter, mode: "insensitive" } },
      ],
    };
  }

  return await prisma.post.findMany({
    where: whereFilters,
    include: {
      comments: true,
    },
    orderBy: [
      {
        created: "desc",
      },
    ],
  });
};

const getPost = async (userId, postId) => {
  return await prisma.post.findMany({
    where: {
      authorId: Number(userId),
      id: Number(postId),
    },
    include: {
      comments: true,
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
    include: {
      comments: true,
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
