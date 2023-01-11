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

function setValue(selector, value) {
  document.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconURL(iconCode) {
  return `icons/${iconCode}.svg`;
}

function renderCurrentWeather(current) {
  setValue("current-temp", current.currentTemp);
  setValue("current-high", current.highTemp);
  setValue("current-low", current.lowTemp);
  setValue("current-fl-high", current.highFL);
  setValue("current-fl-low", current.lowFL);
  setValue("current-precip", current.windSpeed);
  setValue("current-precip", current.precip);
}
