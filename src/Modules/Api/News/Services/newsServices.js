import { PrismaClient } from "@prisma/client";
import ip from "ip";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const getAllNews = async () => {
  const allNews = await prisma.news.findMany({
    orderBy: [
      {
        created: "desc",
      },
    ],
  });
  return allNews.map((newsItem) => {
    newsItem.image = `http://${ip.address()}:${process.env.PORT}/images/news/${
      newsItem.image
    }`;
    return newsItem;
  });
};

const getNew = async (NewId) => {
  return await prisma.news.findMany({
    where: {
      id: Number(NewId),
    },
  });
};
const createNew = async (News, image, userId) => {
  News.image = image.filename;
  News.authorId = userId;
  console.log("News:", News);
  console.log("image:", image);
  const news = await prisma.news.create({
    data: News,
  });

  news.image = `http://${ip.address()}:${process.env.PORT}/images/news/${
    image?.filename
  }`;

  return news;
};

const updateNew = async (updatedData) => {
  return await prisma.news.update({
    where: {
      id: updatedData.id,
    },
    data: updatedData,
  });
};

const deleteNew = async (ToDeleteId) => {
  const deletedNews = await prisma.news.delete({
    where: {
      id: ToDeleteId,
    },
  });
  if (deletedNews) return "تم الحذف بنجاح";
  return "عذرا العنصر غير متوفر";
};
export { getAllNews, createNew, getNew, updateNew, deleteNew };
