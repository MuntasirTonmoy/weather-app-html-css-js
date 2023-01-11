import { getWeather } from "./weather";

getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone)
  .then(renderWeather)
  .catch(error => {
    console.error(error);
    alert("Error getting weather");
  });
