import dotenv from "dotenv";
dotenv.config();
const rootPath = process.env.IMAGES_DIRECTORY
export const profileImagesPath = `${rootPath}/userProfileImages/`