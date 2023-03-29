import createError from "http-errors";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  login
} from "../Services/userServices.js";
const loginController = async (req, res, next) => {
  try {
    const {email, password } = req.body;
    const user = await login(email,password);
    if (user){
      res.send(user);
    }
  } catch (error) {
    next(createError(error));
  }
};

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(createError(error));
  }
};

const createUserController = async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = await createUser(data);
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
    const data = req.body;
    const user = await updateUser(data);
    res.send(user);
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

export {
  getAllUsersController,
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
  loginController,
};
