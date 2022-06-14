import { useState, useRef, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Campgrounds from "./Campgrounds";
import CampgroundSelect from "./CampgroundSelect";
import Alert from "./Alert";

import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
} from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import Days from "./Days";
import LoadingSpinner from "./LoadingSpinner";

export default function MainForm() {
  const [park, setPark] = useState({});
  const [campgrounds, setCampgrounds] = useState(false);
  const [selectedCampgrounds, setSelectedCampgrounds] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [numberOfNights, setNumberOfNights] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const campgroundRef = useRef(null);
  const [error, setError] = useState(null);

  const parkSelect = useRef(null);
  const phoneInput = useRef(null);

  // When component loads, smooth scroll to it
  useEffect(() => {
    if (campgrounds && campgroundRef.current) {
      campgroundRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [campgrounds, selectedCampgrounds, startDate, numberOfNights]);

  const submitForm = async (e) => {
    if (phoneInput.current.value === "") {
      alert("Please enter a phone number");
      return;
    }
    setLoading(true);
    const res = await sendForm(
      park,
      selectedCampgrounds,
      startDate,
      numberOfNights,
      phone
    );
    if (res === "Complete") {
      setCampgrounds(false);
      setSelectedCampgrounds([]);
      setStartDate(null);
      setNumberOfNights(null);
      setPhone("");
      setComplete(true);
    }
    setLoading(false);
  };

  const updateCampgrounds = async () => {
    setError(false);
    const name =
      parkSelect.current.options[parkSelect.current.selectedIndex].text;
    const id = parkSelect.current.value;
    setPark({ name, id });

    const res = await axios("/api/search", {
      method: "POST",
      data: {
        parkID: id,
      },
    });
    if (res.data.error) {
      setError(res.data.error);
      setCampgrounds(false);
      return;
    }
    setCampgrounds(res.data);
  };

  return (
    <div className="bg-stone-200 py-16 lg:px-40 px-5 flex flex-col gap-5">
      {!complete && (
        <div className="flex flex-col p-4 bg-white rounded-xl shadow border-stone-400 text-center items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-yellow-400 flex justify-center items-center">
            <RiNumber1 size={35} color="white" />
          </div>
          <h3 className="text-stone-800 font-bold text-3xl">Select a park</h3>
          <p className="text-black">
            Start by selecting the name of the park you would like to visit:
          </p>
          <select
            onChange={() => updateCampgrounds()}
            ref={parkSelect}
            className="select select-bordered w-full max-w-xs"
          >
            <Campgrounds />
          </select>
          {error && <Alert message={`${error}. Please select another park.`} />}
        </div>
      )}

      {campgrounds && (
        <div
          ref={campgroundRef}
          className="flex flex-col p-4 bg-white rounded-xl shadow border-stone-400 text-center items-center gap-2"
        >
          <div className="w-20 h-20 rounded-full bg-violet-400 flex justify-center items-center">
            <RiNumber2 size={35} color="white" />
          </div>
          <h3 className="text-stone-800 font-bold text-3xl">
            Pick a Campground
          </h3>
          <p className="text-black">
            Select which campgrounds you would like monitored.
          </p>
          {campgrounds.map((campground) => {
            return (
              <CampgroundSelect
                key={campground.facilityID}
                campground={campground}
                setSelectedCampgrounds={setSelectedCampgrounds}
                selectedCampgrounds={selectedCampgrounds}
              />
            );
          })}
        </div>
      )}

      {selectedCampgrounds.length > 0 && (
        <div
          ref={campgroundRef}
          className="flex flex-col p-4 bg-white rounded-xl shadow border-stone-400 text-center items-center gap-2"
        >
          <div className="w-20 h-20 rounded-full bg-blue-400 flex justify-center items-center">
            <RiNumber3 size={35} color="white" />
          </div>
          <h3 className="text-stone-800 font-bold text-3xl mb-3">
            Select an arrival date
          </h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
            minDate={new Date()}
          />
        </div>
      )}

      {startDate && (
        <div
          ref={campgroundRef}
          className="flex flex-col p-4 bg-white rounded-xl shadow border-stone-400 text-center items-center gap-2"
        >
          <div className="w-20 h-20 rounded-full bg-green-400 flex justify-center items-center">
            <RiNumber4 size={35} color="white" />
          </div>
          <h3 className="text-stone-800 font-bold text-3xl mb-3">
            Set number of nights
          </h3>
          <Days setNumberOfNights={setNumberOfNights} />
        </div>
      )}

      {numberOfNights && (
        <div className="flex flex-col p-4 bg-white rounded-xl shadow border-stone-400 text-center items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-red-400 flex justify-center items-center">
            <RiNumber5 size={35} color="white" />
          </div>
          <h3 className="text-stone-800 font-bold text-3xl mb-3">
            Phone number
          </h3>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="input input-bordered w-full max-w-xs mb-3"
            ref={phoneInput}
          />
          <button
            onClick={submitForm}
            type="button"
            className="btn btn-primary"
          >
            Submit
          </button>
          {loading && <LoadingSpinner />}
        </div>
      )}

      {complete && (
        <div className="flex flex-col p-4 bg-white rounded-xl shadow border-stone-400 text-center items-center gap-2">
          <AiFillCheckCircle color="green" size={50} />
          <p className="text-xl">Submission complete!</p>
          <button
            onClick={() => window.location.reload(false)}
            className="btn btn-primary"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

async function sendForm(
  park,
  selectedCampgrounds,
  startDate,
  numberOfNights,
  phone
) {
  const res = await axios("/api/submit", {
    method: "POST",
    data: {
      park,
      selectedCampgrounds,
      startDate,
      numberOfNights,
      phone,
    },
  });
  return res.data;
}
