import { DateTime } from "luxon";

const API_KEY = "230813307efb2444f5bcd57400eacfd2";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType.toLowerCase());
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
    .then((res) => res.json());
};

const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local Time:' hh:mm a") => {
  return DateTime.fromSeconds(secs).setZone(offset).toFormat(format);
};

const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone/60);

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise: formatToLocalTime(sunrise, timezone/60, 'hh:mm a'),
    sunset: formatToLocalTime(sunset, timezone/60, 'hh:mm a'),
    details,
    icon: iconUrlFromCode(icon),
    speed,
    timezone,
    formattedLocalTime,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrent);
  
  return { ...formattedCurrentWeather };
};

export default getFormattedWeatherData;
