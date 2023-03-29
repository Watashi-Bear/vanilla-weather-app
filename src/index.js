function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes <10) {
  minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];

return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
let forecastDate = new Date(timestamp * 1000);
let forecastDay = forecastDate.getDay();
let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return forecastDays[forecastDay];
}

function displayForecast(response){
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
  if (index < 6) {
forecastHTML = forecastHTML + 
`
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width="45px">              
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>|
      <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
    </div>
  </div>
`;
}
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
let apiKey = "3c48a60cea5at02a4bc6bf4c51bo5096";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
  console.log(response.data);
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let countryElement = document.querySelector("#country");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElemnent = document.querySelector("#date");
let iconElement = document.querySelector("#weatherIcon");

celsiusTemperature = response.data.temperature.current;

temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.city;
countryElement.innerHTML = response.data.country;
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = response.data.temperature.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed * 2.2369362912);
dateElemnent.innerHTML = formatDate(response.data.time * 1000);
iconElement.setAttribute("src", response.data.condition.icon_url);
iconElement.setAttribute("alt", response.data.condition.icon);

getForecast(response.data.coordinates);
}

function search(city) {
let apiKey = "3c48a60cea5at02a4bc6bf4c51bo5096";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}

function searchLocation(position) {
console.log(position);
let lon = position.coords.longitude;
let lat = position.coords.latitude;
let apiKey = "3c48a60cea5at02a4bc6bf4c51bo5096";
let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event){
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFarenheitTemperature(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
  
celsiusLink.classList.remove("active");
farenheitLink.classList.add("active");
let farenheitTemperature = (celsiusTemperature*9)/5+32;
temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsiusTemperature(event) {
event.preventDefault();
celsiusLink.classList.add("active");
farenheitLink.classList.remove("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentLocation = document.querySelector("#current-btn");
currentLocation.addEventListener("click", getCurrentLocation);

search("Auckland");