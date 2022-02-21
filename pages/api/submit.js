import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    selectedCampgrounds: campgrounds,
    startDate,
    numberOfDays: days,
    phone,
  } = req.body;
  const d = new Date(startDate);
  await prisma.users.create({
    data: {
      phone,
      campgrounds: campgrounds[0],
      days: days.toString(),
      start_date: d,
    },
  });
  res.status(200).send("Complete");
}
