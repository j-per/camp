import axios from "axios";

export default async function handler(req, res) {
  const parkID = req.body.parkID;
  const campgrounds = await reteiveCampgrounds(parkID);
  res.status(200).send(campgrounds);
}

async function reteiveCampgrounds(id) {
  const request = await axios(
    "https://calirdr.usedirect.com/rdr/rdr/search/place",
    {
      method: "POST",
      data: {
        PlaceId: id,
        Latitude: 0,
        Longitude: 0,
        HighlightedPlaceId: 0,
        CountNearby: false,
        NearbyLimit: 0,
        Nights: 1,
        UnitCategoryId: 0,
        SleepingUnitId: 0,
        MinVehicleLength: 0,
        UnitTypesGroupIds: [],
      },
    }
  );
  // Get facility information from RC
  const response = request.data.SelectedPlace?.Facilities;
  if (!response) {
    return { error: "No campgrounds found" };
  }
  const campgrounds = [];
  for (const property in response) {
    campgrounds.push({
      facilityID: response[property].FacilityId,
      name: response[property].Name,
    });
  }
  return campgrounds;
}
