import { ICON_MAP } from "./iconMap";
import { getWeather } from "./weather";

getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone)
  .then(renderWeather)
  .catch(error => {
    console.error(error);
    alert("Error getting weather");
  });

function renderWeather({ current, daily, hourly }) {
  renderCurrentWeather(current);
  renderDailyWeather(daily);
  renderHourlyWeather(hourly);
  document.body.classList.remove("blurred");
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

function getIconURL(iconCode) {
  return `icons/${ICON_MAP.get(iconCode)}.svg`;
}

const currentIcon = document.querySelector("[data-current-icon]");
function renderCurrentWeather(current) {
  currentIcon.src = getIconURL(current.icon);
  setValue("current-temp", current.currentTemp);
  setValue("current-high", current.highTemp);
  setValue("current-low", current.lowTemp);
  setValue("current-fl-high", current.highFL);
  setValue("current-fl-low", current.lowFL);
  setValue("current-precip", current.windSpeed);
  setValue("current-precip", current.precip);
}

const daySection = document.querySelector("[data-day-section]");
const dayCardTemplate = document.querySelector(".day-card-template");
const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" }); //todo
function renderDailyWeather(daily) {
  daySection.innerHTML = "";
  daily.forEach(day => {
    const elm = dayCardTemplate.content.cloneNode(true); //todo
    setValue("temp", day.maxTemp, { parent: elm });
    setValue("date", DAY_FORMATTER.format(day.timestamp), { parent: elm });
    elm.querySelector("[data-icon]").src = getIconURL(day.iconCode);
    daySection.append(elm);
  });
}

const hourTableSection = document.querySelector("[data-hour-section]");
const hourTableRowTemplate = document.querySelector(".hour-table-row-template");
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" });
function renderHourlyWeather(hourly) {
  hourTableSection.innerHTML = "";
  hourly.forEach(hour => {
    const elm = hourTableRowTemplate.content.cloneNode(true); //todo
    setValue("temp", hour.temp, { parent: elm });
    setValue("fl-temp", hour.feelsLike, { parent: elm });
    setValue("wind", hour.windSpeed, { parent: elm });
    setValue("precip", hour.precip, { parent: elm });
    setValue("day", DAY_FORMATTER.format(hour.timestamp), { parent: elm });
    setValue("time", HOUR_FORMATTER.format(hour.timestamp), { parent: elm });
    elm.querySelector("[data-icon]").src = getIconURL(hour.iconCode);
    hourTableSection.append(elm);
  });
}
