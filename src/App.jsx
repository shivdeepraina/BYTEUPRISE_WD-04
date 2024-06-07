import React, { useEffect, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";

import getFormattedWeatherData from "./Weather/Weather";

const App = () => {
  const [query, setQuery] = useState({ q: "ajmer" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      setWeather(data);
      console.log(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 30 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br from bg-cyan-600 to-blue-700 shadow-xl shadow-gray-400 rounded-xl
          ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} setUnits={setUnits} />

        {weather && (
          <>
            <TimeAndLocation weather={weather} />
            <TempAndDetails weather={weather} units={units} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
