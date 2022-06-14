import { sites } from "../sites";

export default function campgrounds() {
  return (
    <>
      <option disabled selected>
        Select...
      </option>
      {sites
        .sort((a, b) => a.Name.localeCompare(b.Name))
        .filter((site) => site.EntityType === "Park")
        .map((site) => {
          return (
            <option key={site.CityParkId} value={site.CityParkId}>
              {site.Name}
            </option>
          );
        })}
    </>
  );
}
