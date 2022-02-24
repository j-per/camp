import { useState } from "react";

export default function Days({ setNumberOfDays }) {
  const [activeButton, setActiveButton] = useState(null);
  const updateSelect = (e) => {
    setActiveButton(e.target.name);
    setNumberOfDays(parseInt(e.target.name));
  };

  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 gap-2">
      <button
        name="1"
        className={`${
          activeButton === "1" ? `bg-gray-300` : ""
        }  px-12 py-2 rounded hover:bg-gray-300 border-2 border-gray-300`}
        onClick={updateSelect}
      >
        1
      </button>
      <button
        name="2"
        className={`${
          activeButton === "2" ? `bg-gray-300` : ""
        }  px-12 py-2 rounded hover:bg-gray-300 border-2 border-gray-300`}
        onClick={updateSelect}
      >
        2
      </button>
      <button
        name="3"
        className={`${
          activeButton === "3" ? `bg-gray-300` : ""
        }  px-12 py-2 rounded hover:bg-gray-300 border-2 border-gray-300`}
        onClick={updateSelect}
      >
        3
      </button>
      <button
        name="4"
        className={`${
          activeButton === "4" ? `bg-gray-300` : ""
        }  px-12 py-2 rounded hover:bg-gray-300 border-2 border-gray-300`}
        onClick={updateSelect}
      >
        4
      </button>
      <button
        name="5"
        className={`${
          activeButton === "5" ? `bg-gray-300` : ""
        }  px-12 py-2 rounded hover:bg-gray-300 border-2 border-gray-300`}
        onClick={updateSelect}
      >
        5
      </button>
      <button
        name="6"
        className={`${
          activeButton === "6" ? `bg-gray-300` : ""
        }  px-12 py-2 rounded hover:bg-gray-300 border-2 border-gray-300`}
        onClick={updateSelect}
      >
        6
      </button>
      <button
        name="7"
        className={`${
          activeButton === "7" ? `bg-gray-300` : ""
        }  px-12 py-2 rounded hover:bg-gray-300 border-2 border-gray-300`}
        onClick={updateSelect}
      >
        7
      </button>
      <button
        name="8"
        className={`${
          activeButton === "8" ? `bg-gray-300` : ""
        }  px-12 py-2 rounded hover:bg-gray-300 border-2 border-gray-300`}
        onClick={updateSelect}
      >
        8
      </button>
    </div>
  );
}
