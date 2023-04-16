import { PrismaClient } from "@prisma/client";
import { generateAccessToken } from "../../../Middleware/Auth/JWT.js";
const prisma = new PrismaClient();

const createUser = async (userData, userProfile, image) => {
  const user = await prisma.user.create({
    data: {
      ...userData,
      profile: {
        create: {
          ...userProfile,
          dateOfBirth: new Date(userProfile.dateOfBirth),
          profileImage: {
            create: {
              name: image.name,
              format:image.mimetype
            },
          },
        },
      },
    },
  });
  return await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      profile: true,
    },
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

  if (user && user.password == password) {
    delete user.password;
    return { ...user, token: generateAccessToken(user) };
  }
  throw "user not found";
};

const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: [{ id: "asc" }],
    include: {
      profile: {
        include: {
          profileImage: {
            select: {
              id: true,
              path: true,
            },
          },
        },
      },
    },
  });
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
