function displayTemp(response){
  console.log(response);
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");

temperatureElement.innerHTML = Math.round(response.data.temperature.current);
cityElement.innerHTML = response.data.city;
//figure out how to return country as well
descriptionElement.innerHTML = response.data.condition.description;
}

let apiKey = "3c48a60cea5at02a4bc6bf4c51bo5096";
let city = "London";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
