import { PrismaClient } from "@prisma/client";
import { generateAccessToken } from "../../../Middleware/Auth/JWT.js";
const prisma = new PrismaClient();

const createUser = async (updatedData) => {
  return await prisma.user.create({
    data: { ...updatedData, dateOfBirth: new Date(updatedData.dateOfBirth) },
  });
};

const updateUser = async (updatedData) => {
  return await prisma.user.update({
    where: {
      id: updatedData.id,
    },
    data: updatedData,
  });
};

const deleteUser = async (ToDeleteId) => {
  return await prisma.user.delete({
    where: {
      id: ToDeleteId,
    },
  });
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user.password == password) {
    delete user.password;
    return { ...user, token: generateAccessToken(user.name) };
  }
  return null;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
    include: {
      Transactions: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });
  return user;
};

export { login, createUser, getUser, getAllUsers, deleteUser, updateUser };
