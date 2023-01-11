import { getWeather } from "./weather";

getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone)
  .then(renderWeather)
  .catch(error => {
    console.error(error);
    alert("Error getting weather");
  });

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current);
  document.body.classList.remove("blurred");
}

function renderCurrentWeather(current) {
  document.querySelector("[data-current-temp]").textContent =
    current.currentTemp;
}
