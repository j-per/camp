import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // await prisma.Users.create({
  //   data: {
  //     phone: "9516233209",
  //     campgrounds: "708",
  //     days: "2",
  //     start_date: "2022-05-10",
  //   },
  // });
  const allUsers = await prisma.users.findMany();
  res.status(200).send(allUsers);
}
