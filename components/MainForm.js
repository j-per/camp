import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import DatePicker from "react-datepicker";

import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";
import Days from "./Days";
import CampgroundSelect from "./CampgroundSelect";
import HitComponent from "./HitComponent";
import styles from "../styles/InstantSearch.module.css";

const searchClient = algoliasearch(
  "QGKBTJL25P",
  "69b22d3524f610ffe4af9a82007ed784"
);

export default function MainForm() {
  const [campgrounds, setCampgrounds] = useState(false);
  const [selectedCampgrounds, setSelectedCampgrounds] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(null);
  const campgroundRef = useRef(null);

  // When component loads, smooth scroll to it
  useEffect(() => {
    if (campgrounds && campgroundRef.current) {
      campgroundRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [campgrounds, selectedCampgrounds, startDate]);

  const submitForm = async () => {
    const submit = sendForm(selectedCampgrounds, startDate, numberOfDays);
  };

  return (
    <div className="bg-stone-200 py-16 lg:px-40 px-5 flex flex-col gap-5">
      <div className="flex flex-col p-4 bg-white rounded-xl shadow border-stone-400 text-center items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-yellow-400 flex justify-center items-center">
          <RiNumber1 size={40} color="white" />
        </div>
        <h2 className="text-stone-800 font-bold text-3xl">Search for a park</h2>
        <p className="text-black">
          Start by entering the name of the park you would like to visit.
        </p>
        <div className={`${styles["instant-search"]}`}>
          <InstantSearch
            searchClient={searchClient}
            indexName="new-index-1645255435"
          >
            <SearchBox
              defaultRefinement="San Eljio"
              showLoadingIndicator
              submit={null}
              reset={null}
            />
            <Hits
              hitComponent={(hit) => (
                <HitComponent hit={hit} setCampgrounds={setCampgrounds} />
              )}
            />
          </InstantSearch>
        </div>
      </div>

      {campgrounds && (
        <div
          ref={campgroundRef}
          className="flex flex-col p-4 bg-white rounded-xl shadow border-stone-400 text-center items-center gap-2"
        >
          <div className="w-20 h-20 rounded-full bg-violet-400 flex justify-center items-center">
            <RiNumber2 size={40} color="white" />
          </div>
          <h2 className="text-stone-800 font-bold text-3xl">
            Pick a Campground
          </h2>
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
            <RiNumber3 size={40} color="white" />
          </div>
          <h2 className="text-stone-800 font-bold text-3xl">
            Select an arrival date
          </h2>
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
            <RiNumber4 size={40} color="white" />
          </div>
          <h2 className="text-stone-800 font-bold text-3xl">
            Set number of nights
          </h2>
          <Days setNumberOfDays={setNumberOfDays} />
        </div>
      )}
      <button onClick={submitForm} className="btn-primary rounded">
        Submit
      </button>
    </div>
  );
}

async function sendForm(selectedCampgrounds, startDate, numberOfDays) {
  const submit = axios("/api/submit", {
    method: "POST",
    data: {
      selectedCampgrounds,
      startDate,
      numberOfDays,
    },
  });
}
