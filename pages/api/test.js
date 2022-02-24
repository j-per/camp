import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await prisma.users.create({
    data: {
      phone: "9516233209",
      campgrounds: {
        create: {
          code: 708,
          days: "2",
          start_date: "05-10-2022",
        },
      },
    },
  });
  //const allUsers = await prisma.users.findMany();
  res.status(200).send("done");
}
