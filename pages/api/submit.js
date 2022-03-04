import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { park, selectedCampgrounds, startDate, numberOfDays, phone } =
    req.body;
  const userId = await checkIfUserExists(phone);
  const setCampgrounds = await updateCampgrounds(
    park,
    userId,
    selectedCampgrounds,
    startDate,
    numberOfDays
  );
  res.status(200).send("Complete");
}

async function checkIfUserExists(phone) {
  const user = await prisma.users.findUnique({
    where: {
      phone,
    },
  });
  if (user) {
    return user.id;
  }
  const createUser = await prisma.users.create({
    data: {
      phone,
      active: 1,
    },
  });
  return createUser.id;
}

async function updateCampgrounds(
  park,
  id,
  selectedCampgrounds,
  startDate,
  numberOfDays
) {
  const d = format(new Date(), "yyyy-MM-dd");
  for (const i of selectedCampgrounds) {
    const upsertCampgrounds = await prisma.campgrounds.create({
      data: {
        user_id: id,
        park_name: park,
        facility_id: parseInt(i),
        days: numberOfDays,
        start_date: d.toString(),
      },
    });
  }
}
