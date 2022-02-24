import axios from "axios";

export default function HitComponent({ hit, setPark, setCampgrounds }) {
  const getCampgrounds = async () => {
    const campgrounds = await fetchCampgrounds(hit.hit.CityParkId);
    setPark(hit.hit.Name);
    setCampgrounds(campgrounds);
  };
  return (
    <button
      className="bg-stone-300 w-full p-4 border-l-2 border-r-2 border-b-2 border-stone-500 hover:bg-stone-400 cursor-pointer"
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
