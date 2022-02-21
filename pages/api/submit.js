import axios from "axios";

export default async function handler(req, res) {
  const { selectedCampgrounds, startDate, numberOfDays } = req.body;
  console.log({
    selectedCampgrounds,
    startDate,
    numberOfDays,
  });
  //res.status(200).send(campgrounds);
}
