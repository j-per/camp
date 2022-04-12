import axios from "axios";

export default function HitComponent({
  hit,
  setPark,
  setCampgrounds,
  setError,
}) {
  const getCampgrounds = async () => {
    setError(null);
    setCampgrounds(false);
    const campgrounds = await fetchCampgrounds(hit.hit.CityParkId);
    if (campgrounds.error) {
      setError(campgrounds.error);
      return;
    }
    setPark(hit.hit.Name);
    setCampgrounds(campgrounds);
  };
  return (
    <button
      className="bg-stone-100 w-full p-4 border-l-2 border-r-2 border-b-2  hover:bg-stone-300 cursor-pointer testing"
      style={{ borderColor: "#cccccc" }}
      onClick={() => getCampgrounds()}
    >
      {hit.hit.Name}
    </button>
  );
}

async function fetchCampgrounds(id) {
  const getCampgrounds = await axios("/api/search", {
    method: "POST",
    data: {
      parkID: id,
    },
  });
  return getCampgrounds.data;
}
