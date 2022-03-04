import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const activeUsers = await prisma.users.findMany({
    where: {
      active: 1,
    },
    include: {
      campgrounds: {
        where: {
          start_date: {
            gte: format(new Date(), "yyyy-MM-dd"),
          },
        },
      },
    },
  });
  activeUsers.forEach((u) => console.log(u.phone));
  res.status(200).send(activeUsers);
}
