import createError from "http-errors";
import { getImage } from "../Services/imageServices.js";
import express  from "express";
import { profileImagesPath } from "../../../../Utils/Constants/constant.js";
import fs from 'fs'
const getImageController = async (req, res, next) => {
  try {
    // const userId = req.user.id;
    const image = await getImage(1);
    const { name, format } = image.profileImage;
    res.setHeader("Content-Type", format);
    
    const data =  fs.readFile('./data/images/userProfileImages'+name, { encoding: 'utf-8' });
    console.log(data);
    res.sendfile(data);
  } catch (error) {
    next(createError(error));
  }
};

export { getImageController };
