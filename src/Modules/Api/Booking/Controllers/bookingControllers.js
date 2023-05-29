import createError from "http-errors";
import {
  getAllUserBookings,
  createBooking,
  getBookingByID,
  updateBooking,
  deleteBooking,
} from "../Services/bookingServices.js";

const getAllUserBookingsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookings = await getAllUserBookings(userId);
    res.send(bookings);
  } catch (error) {
    next(createError(error));
  }
};

const createBookingController = async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.user.id;
    
    const newBook = await createBooking(data,userId);
    res.send(newBook);
  } catch (error) {
    next(createError(error));
  }
};

const getBookingByIDController = async (req, res, next) => {
  try {
    const id = req.params.id;
    // const userId = req.user.id;
    const book = await getBookingByID( id);
    res.send(book);
  } catch (error) {
    next(createError(error));
  }
};
const updateBookingController = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      id: parseInt(req.params.id),
    };
    const transaction = await updateBooking(data);
    res.send(transaction);
  } catch (error) {
    next(createError(error));
  }
};

const deleteBookingController = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTransaction = await deleteBooking(id);
    res.send({
      success: true,
      message: deletedTransaction,
    });
  } catch (error) {
    next(createError(error));
  }
};

export {
  getAllUserBookingsController,
  createBookingController,
  getBookingByIDController,
  updateBookingController,
  deleteBookingController,
};
