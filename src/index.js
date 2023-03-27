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

function displayTemp(response){
  console.log(response);
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let countryElement = document.querySelector("#country");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElemnent = document.querySelector("#date");
let iconElement = document.querySelector("#weatherIcon");

temperatureElement.innerHTML = Math.round(response.data.temperature.current);
cityElement.innerHTML = response.data.city;
countryElement.innerHTML = response.data.country;
descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML = response.data.temperature.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
dateElemnent.innerHTML = formatDate(response.data.time*1000);
iconElement.setAttribute("src", response.data.condition.icon_url);
iconElement.setAttribute("alt", response.data.condition.icon);
}

function search(city) {
let apiKey = "3c48a60cea5at02a4bc6bf4c51bo5096";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Auckland");