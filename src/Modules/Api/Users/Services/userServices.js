import { PrismaClient } from "@prisma/client";
import { generateAccessToken } from "../../../Middleware/Auth/JWT.js";
import ip from "ip";
import dotenv from "dotenv";
import haversine from "haversine-distance";
dotenv.config();
const prisma = new PrismaClient();
const profileSelectedFields = {
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
const privateUserSelectedFields = {
  id: true,
  email: true,
  id_number: true,
  role: true,
  password: false,
  latitude: true,
  longitude: true,
  profile: {
    select: profileSelectedFields,
  },
};
const publicSelectedFields = {
  id: true,
  email: true,
  id_number: true,
  role: true,
  password: false,
  latitude: true,
  longitude: true,
  profile: {
    select: profileSelectedFields ,
  },
  Booking:{
    select:{
      id:true,
      lawyerId: true,
      userId: true,
      date:true,
      startTime:true,
      endTime:true,
      description:true,
      createdAt:true
    }
  }
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
          dateOfBirth: new Date(profile.dateOfBirth),
          IDImage: idImage?.filename,
          userProfileImage: profileImage?.filename,
        },
      },
    },
    include: {
      profile: {
        select: profileSelectedFields,
      },
    },
  });

  user.profile.userProfileImage = `http://${ip.address()}:${
    process.env.PORT
  }/images/profile/${profileImage?.filename}`;

  user.profile.IDImage = `http://${ip.address()}:${
    process.env.PORT
  }/images/idImage/${idImage?.filename}`;

  let DOB = new Date(user.profile.dateOfBirth);
  user.profile.dateOfBirth = `${DOB.getFullYear()}-${
    DOB.getMonth() + 1
  }-${DOB.getDate()}`;

  return user;
};

const updateUser = async (data, userId) => {
  let { profile } = data;
  if (profile?.dateOfBirth) {
    profile.dateOfBirth = new Date(profile.dateOfBirth);
  }
  delete data.profile;
  return await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      ...data,
      profile: {
        update: {
          ...profile,
        },
      },
    },
    include: {
      profile: {
        select: profileSelectedFields,
      },
    },
  });
};

const updateUserProfileImage = async (updateId, profileImage) => {
  const user = await prisma.profile.update({
    where: {
      userId: updateId,
    },
    data: {
      userProfileImage: profileImage?.filename,
    },
  });
  return (user.userProfileImage = `http://${ip.address()}:${
    process.env.PORT
  }/images/profile/${profileImage?.filename}`);
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

const getAllUsers = async (searchFilter = null, userId, role = null) => {
  let whereFilters = {
    id: { not: userId },
  };
  if (searchFilter && role) {
    whereFilters.AND = [{ role: { equals: role } }];
    whereFilters.profile = {
      OR: [
        { name: { contains: searchFilter, mode: "insensitive" } },
        { city: { contains: searchFilter, mode: "insensitive" } },
      ],
    };
  } else if (searchFilter) {
    whereFilters.profile = {
      OR: [
        { name: { contains: searchFilter, mode: "insensitive" } },
        { city: { contains: searchFilter, mode: "insensitive" } },
      ],
    };
  } else if (role) {
    whereFilters.AND = [{ role: { equals: role } }];
  }

  return await prisma.user.findMany({
    orderBy: [{ id: "asc" }],
    where: whereFilters,
    select: publicSelectedFields,
  });
};

const getClosestLawyers = async (userLocation, userId) => {
  // await prisma.user.update({
  //   where: {
  //     id: Number(userId),
  //   },
  //   data: {
  //     latitude: userLocation.latitude,
  //     longitude: userLocation.longitude,
  //   },
  // });
  const allLawyers = await prisma.user.findMany({
    select: publicSelectedFields,
    where: { role: "LAWYER", NOT: { id: userId } },
  });

  allLawyers.sort((user1, user2) => {

    const distance1 = haversine(userLocation, {
      latitude: user1.latitude,
      longitude: user1.longitude,
    });
    const distance2 = haversine(userLocation, {
      latitude: user2.latitude,
      longitude: user2.longitude,
    });

    if (isNaN(distance1) && !isNaN(distance2)) {
      return 1; // distance1 comes distance1fter distance2
    } else if (!isNaN(distance1) && isNaN(distance2)) {
      return -1; // distance1 comes distance2efore distance2
    } else {
      return distance1 - distance2; // compare numeric values
    }
  });
  return allLawyers;
};

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },

    select: publicSelectedFields,
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
  getClosestLawyers,
};
