const otaDiv = document.getElementById("ota-div");
const cardContainer = document.querySelector(".card-container");

document.querySelector("#city-input").addEventListener("change", getWeather);

function getWeather() {
  const searchValue = document.querySelector("#city-input").value;
  axios
    .get(
      `https://api.weatherapi.com/v1/forecast.json?q=${
        searchValue ? searchValue : "Tashkent"
      }&days=1&key=5dcae00654f14f72942101244241612`
    )
    .then((response) => {
      const { location, current, forecast } = response.data;
      otaDiv.innerHTML = `
        <div class="card">
          <div class="d-flex justify-content-between">
            <h4 id="nameOfCity">${location.name}</h4>
            <h4 id="nameOfCountry">${location.country}</h4>
            <h4 id="localTime">${location.localtime.slice(-5)}</h4>
          </div>
          <div class="d-flex flex-column text-center mt-4">
            <img class="weather-icon" src="${current.condition.icon}" width="100px">
            <div class="d-flex justify-content-center align-items-center">
              <h1 class="temp">${current.temp_c}</h1><span>°C</span>
            </div>
            <span class="condition">${current.condition.text}</span>
          </div>
          <div class="container_of_infos">
            <div><b>Wind:</b> <i class="fas fa-wind"></i> ${current.wind_kph} km/h</div>
            <div><b>Humidity:</b> <i class="fas fa-tint"></i> ${current.humidity}%</div>
            <div><b>Precipitation:</b> <i class="fas fa-cloud-rain"></i> ${current.precip_mm}mm</div>
          </div>
        </div>
      `;
      getHourlyWeather(forecast.forecastday[0].hour);
    })
    .catch((error) => {
      otaDiv.innerHTML = `<p style="color: red;">${error.response.data.error.message}</p>`;
    });
}

function getHourlyWeather(hours) {
  const sarvar = hours.filter((_, i) => i % 3 === 0);
  cardContainer.innerHTML = '';
  sarvar.forEach(hour => {
    cardContainer.innerHTML += `
      <div class='hour-card'>
        <p>${hour.time.slice(-5)}</p>
        <img src="${hour.condition.icon}" alt="weather" width="40px">
        <p>${hour.temp_c}°C</p>
      </div>
    `;
  });
}

getWeather();