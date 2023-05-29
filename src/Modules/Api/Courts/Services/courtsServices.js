import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { AllLocations } from "../../../../../data/staticData/CourtsLocations.js";

const getAllCourts = async () => {
  return AllLocations;
};

const getCourt = async (id) => {
  return AllLocations.find((court) => court.id == id);
};

export { getAllCourts, getCourt };
