import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const activeScans = await getActiveDates();
  console.log(activeScans);
  res.status(200).send(activeScans);
}

async function getActiveDates() {
  return prisma.campgrounds.findMany({
    where: {
      start_date: {
        gte: new Date(),
      },
    },
  });
}
