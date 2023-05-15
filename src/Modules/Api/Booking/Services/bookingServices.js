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

const getBookingByID = async (userID, bookingId) => {
  return await prisma.booking.findMany({
    where: {
      userId: Number(userID),
      id: Number(bookingId),
    },
  });
};
const createBooking = async (book, userId) => {
  return await prisma.booking.create({
    data: {
      startTime:new Date(book.startTime),
      endTime: new Date(book.endTime),
      description: book.description,
      lawyerId: Number(book.lawyerId),
      User: {
        connect: {
          id: userId,
        },
      },
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
  return await prisma.post.delete({
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
