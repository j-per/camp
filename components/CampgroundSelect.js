export default function CampgroundSelect({
  campground,
  setSelectedCampgrounds,
  selectedCampgrounds,
}) {
  const campgroundSelection = (e) => {
    if (e.target.checked) {
      setSelectedCampgrounds((prev) => [...prev, e.target.name]);
    } else {
      const indexOfCampground = selectedCampgrounds.indexOf(e.target.name);
      setSelectedCampgrounds(
        selectedCampgrounds.filter((i) => i !== e.target.name)
      );
    }
  };

  return (
    <div>
      <label onChange={campgroundSelection} className="cursor-pointer label">
        <input
          name={campground.facilityID}
          type="checkbox"
          className="checkbox checkbox-primary mr-2"
        />
        <span className="label-text">{campground.name}</span>
      </label>
    </div>
  );
}
