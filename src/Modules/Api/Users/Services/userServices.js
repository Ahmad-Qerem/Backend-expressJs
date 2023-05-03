import { PrismaClient } from "@prisma/client";
import { generateAccessToken } from "../../../Middleware/Auth/JWT.js";
import ip from "ip";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
const selectedFields2 = {
  id: false,
  userId: false,
  userProfileImage: true,
  IDImage: true,
  gender: true,
  name: true,
  dateOfBirth: true,
  maritalStatus: true,
  city: true,
  address: true,
  phone: true,
  mobile: true,
  accountIsActivated: true,
  data: true,
};
const selectedFields1 = {
  id: true,
  email: true,
  id_number: true,
  role: true,
  password: false,
  profile: {
    select: selectedFields2,
  },
};
const createUser = async (userData, idImage, profileImage) => {
  let { profile } = userData;
  delete userData.profile;
  const user = await prisma.user.create({
    data: {
      ...userData,
      profile: {
        create: {
          ...profile,
          dateOfBirth: new Date(profile.dateOfBirth).toISOString(),
          IDImage: `http://${ip.address()}:${process.env.PORT}/images/idImage/${
            idImage?.filename
          }`,
          userProfileImage: `http://${ip.address()}:${
            process.env.PORT
          }/images/profile/${profileImage?.filename}`,
        },
      },
    },
  });
  let createdUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: selectedFields1,
  });
  let DOB = new Date(createdUser.profile.dateOfBirth);
  createdUser.profile.dateOfBirth = `${DOB.getFullYear()}-${
    DOB.getMonth() + 1
  }-${DOB.getDate()}`;
  return createdUser;
};

const updateUser = async (updatedData) => {
  let { profile } = userData;
  delete userData.profile;
  return await prisma.user.update({
    where: {
      id: updatedData.id,
    },
    data: {
      ...updatedData,
      profile: {
        connect: {
          ...profile,
        },
      },
    },
  });
};

const updateUserProfileImage = async (updateId, profileImage) => {
  await prisma.profile.update({
    where: {
      userId: updateId,
    },
    data: {
      userProfileImage: `http://${ip.address()}:${
        process.env.PORT
      }/images/profile/${profileImage?.filename}`,
    },
  });
  let updatedUser = await prisma.user.findUnique({
    where: {
      id: updateId,
    },
    select: selectedFields1,
  });
  let DOB = new Date(updatedUser.profile.dateOfBirth);
  updatedUser.profile.dateOfBirth = `${DOB.getFullYear()}-${
    DOB.getMonth() + 1
  }-${DOB.getDate()}`;
  return updatedUser;
};

const deleteUser = async (ToDeleteId) => {
  await prisma.user.delete({
    where: {
      id: ToDeleteId,
    },
  });
  return "تم حذف الحساب";
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
    select: selectedFields1,
  });
};
const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
    select: selectedFields1,
  });
  return user;
};

export {
  login,
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  updateUserProfileImage,
};
