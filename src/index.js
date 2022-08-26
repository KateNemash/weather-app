function updateDate() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[currentDate.getDay()];

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[currentDate.getMonth()];

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day}, ${currentDate.getDate()}.${month}.${currentDate.getFullYear()}`;
}

function updateTime() {
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

function updateWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector(".changing-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function search(city) {
  let units = "metric";
  let apiKey = "611ef8bba21afa45018dc308c456cb60";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "611ef8bba21afa45018dc308c456cb60";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function changeScaleFahrenheit(event) {
  event.preventDefault();
  let mainTemp = document.querySelector(".changing-temp");
  mainTemp.innerHTML = "81";
}

function changeScaleCelsius(event) {
  event.preventDefault();
  let mainTemp = document.querySelector(".changing-temp");
  mainTemp.innerHTML = "27";
}

let currentDate = new Date();

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", currentLocation);

let tempFahrenheit = document.querySelector("#fahrenheit");
tempFahrenheit.addEventListener("click", changeScaleFahrenheit);

let tempCelsius = document.querySelector("#celsius");
tempCelsius.addEventListener("click", changeScaleCelsius);

updateDate();
updateTime();
search("Barcelona");
