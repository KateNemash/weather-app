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

  document.querySelector("h2").innerHTML = `${day}, ${currentDate.getDate()}.${month}.${currentDate.getFullYear()}`;
}

function updateTime() {
  let hours = currentDate.getHours();
  if (hours < 10){
    hours = `0${hours}`
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10){
    minutes = `0${minutes}`
  }
  document.querySelector("h3").innerHTML = `${hours}:${minutes}`;
}

function updateForecast (response) {
  console.log (response);
  let weatherForecast = document.querySelector("#forecast");
  let days = ["Wed", "Thur", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function(day){
    forecastHTML = forecastHTML + `
    
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <div class="forecast-days">
                      ${day}
                    </div>
                    <img src="https://openweathermap.org/img/wn/01n@2x.png"
                    alt=""
                    width="50"
                    />
                    <div class="forecast-temperatures">
                      <span class="forecast-temperature-max">30°</span>
                      <span class="forecast-temperature-min">23°</span>
                    </div>
                 </div>
                </div>
              </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateForecast);
}

function updateWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;

  document.querySelector(".changing-temp").innerHTML = Math.round(
    celsiusTemperature);
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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
  tempCelsius.classList.remove("active");
  tempFahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature*9/5)+32;
  mainTemp.innerHTML = Math.round(fahrenheitTemp);
}

function changeScaleCelsius(event) {
  event.preventDefault();
  tempCelsius.classList.add("active");
  tempFahrenheit.classList.remove("active");
  let mainTemp = document.querySelector(".changing-temp");
  mainTemp.innerHTML = Math.round(celsiusTemperature);
}

let currentDate = new Date();

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", currentLocation);

let celsiusTemperature = null;

let tempFahrenheit = document.querySelector("#fahrenheit");
tempFahrenheit.addEventListener("click", changeScaleFahrenheit);

let tempCelsius = document.querySelector("#celsius");
tempCelsius.addEventListener("click", changeScaleCelsius);

updateDate();
updateTime();
search("Barcelona");
updateForecast();