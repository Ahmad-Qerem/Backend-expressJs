import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getImage = async (userID) => {
  return await prisma.profile.findUnique({
    where:{
      userId:+userID,
    },
    select:{
      profileImage:true,
    },

  });
  
};

export { getImage };
