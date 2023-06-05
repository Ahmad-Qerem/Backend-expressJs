import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllUserBookings = async (userID) => {
  return await prisma.booking.findMany({
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

const getBookingByID = async (userID) => {
  return await prisma.booking.findMany({
    where: {
      lawyerId: Number(userID),
    },
  });
};
const createBooking = async (book, userId) => {
  book.userId =userId;
  const user = await prisma.user.findUnique({
    where: {
      id: book.lawyerId,
    },
    select: {
      role: true,
    },
  });

  if (user.role !== 'LAWYER') {
    throw new Error('User is not a lawyer');
  }

  return await prisma.booking.create({

    data: {
      ...book,
    },
  });
};

const updateBooking = async (updatedData) => {
  return await prisma.booking.update({
    where: {
      id: updatedData.id,
    },
    data: updatedData,
  });
};

const deleteBooking = async (ToDeleteId) => {
  return await prisma.booking.delete({
    where: {
      id: ToDeleteId,
    },
  });
};
export {
  getAllUserBookings,
  createBooking,
  getBookingByID,
  updateBooking,
  deleteBooking,
};
 