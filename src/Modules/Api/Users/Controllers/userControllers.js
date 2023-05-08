import createError from "http-errors";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserProfileImage,
  login,
  getClosestLawyers,
} from "../Services/userServices.js";
import { logout } from "../../../Middleware/Auth/JWT.js";
import { body } from "express-validator";
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    if (user) {
      res.send(user);
    }
  } catch (error) {
    next(createError(error));
  }
};
const logoutController = async (req, res, next) => {
  try {
    logout(req, res);
  } catch (error) {
    next(createError(error));
  }
};
const getAllUsersController = async (req, res, next) => {
  try {
    const filters = req.query;
    const userId = req.user.id;
    const users = await getAllUsers(filters, userId);
    res.send(users);
  } catch (error) {
    next(createError(error));
  }
};

const createUserController = async (req, res, next) => {
  try {
    const user = JSON.parse(req.body.data);
    const profileImage = req.files.find(
      (file) => file.fieldname == "profileImage"
    );
    const idImage = req.files.find((file) => file.fieldname == "idImage");

    if (!idImage) {
      throw "u must upload id image";
    }

    let newUser = await createUser(user, idImage, profileImage);
    res.send(newUser);
  } catch (error) {
    next(createError(error));
  }
};

const getUserController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUser(id);
    res.send(user);
  } catch (error) {
    next(createError(error));
  }
};
const updateUserController = async (req, res, next) => {
  try {
    const updatedData = req.body;
    const userId = req.params.id;

    console.log("updatedData:",updatedData);
    console.log("userId:",userId);

    let newUser = await updateUser(updatedData,userId);
    res.send(newUser);
  } catch (error) {
    next(createError(error));
  }
};

const updateUserProfileImageController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const profileImage = req.files?.find(
      (file) => file.fieldname == "profileImage"
    );
    if (!profileImage) {
      throw "no image !";
    }
    let updatedImage = await updateUserProfileImage(id, profileImage);
    res.send({ updatedImage });
  } catch (error) {
    next(createError(error));
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedUser = await deleteUser(id);
    res.send({
      success: true,
      message: deletedUser,
    });
  } catch (error) {
    next(createError(error));
  }
};

const getClosestLawyersController = async (req, res, next) => {
  const userId = req.user.id;
  const currentLocation = req.body.location;
  console.log("currentLocation:",currentLocation);
  const data = await getClosestLawyers(currentLocation, userId);
  res.send(data);
};
export {
  getAllUsersController,
  createUserController,
  getUserController,
  updateUserController,
  updateUserProfileImageController,
  deleteUserController,
  loginController,
  logoutController,
  getClosestLawyersController,
};
