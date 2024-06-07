import React from "react";

const TopButtons = ({ setQuery }) => {
  const cities = [
    {
      id: 1,
      name: "London",
    },
    {
      id: 2,
      name: "New Delhi",
    },
    {
      id: 3,
      name: "Tokyo",
    },
    {
      id: 4,
      name: "Sydney",
    },
  ];
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map(({ id, name }) => (
        <button
          key={id}
          onClick={() => setQuery({ q: name })}
          className="text-lg font-medium hover:bg-gray-700/80 px-3 py-2 rounded-md transition ease-in"
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
