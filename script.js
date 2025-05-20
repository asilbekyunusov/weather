// Elementlarni olib olish
const otaDiv = document.getElementById("ota-div");

document.querySelector("#city-input").addEventListener("change", getWeather);

function getWeather() {
  const searchValue = document.querySelector("#city-input").value;
  axios
    .get(
      `https://api.weatherapi.com/v1/forecast.json?q=${
        searchValue ? searchValue : "Tashkent"
      }&days=7&key=5dcae00654f14f72942101244241612`
    )
    .then((response) => {
      const { location, current, forecast } = response.data;
      otaDiv.innerHTML = `
        <div style="margin: 0px" class="row d-flex justify-content-center py-5">
          <div class="col-md-8 col-lg-6 col-xl-5">

            <div class="card text-body" style=" border-radius: 35px;">
              <div class="card-body p-4">

                <div class="d-flex">
                  <h4 id="nameOfCity" class="flex-grow-1">${location.name}</h4>
                  <h4 id="nameOfCountry" class="flex-grow-1">${
                    location.country
                  }</h4>
                  <h4 id="localTime">${location.localtime.slice(-5)}</h4>
                </div>

                <div class="d-flex flex-column text-center mt-5 mb-4">
                  <div class="mb-4">
                    <img id="weather_icon" src="${
                      current.condition.icon
                    }" width="100px">
                  </div>
                  <div class="d-flex justify-content-center  align-items-center">
                    <h1 id="temperature" class="display mb-0 font-weight-bold">${
                      current.temp_c
                    }</h1>
                    <button class="btn btn-light">C</button>
                    <button class="btn btn-light">F</button>
                  </div>
                  <span id="condition_type" class="small" style="color: black"><b>${
                    current.condition.text
                  }</b></span>
                </div>

                <div class="d-flex align-items-center">
                  <div class="container_of_infos">
                    <div> <b>Shamol:</b><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1"
                        id="wind"> 
                        
                      </span> <span>${current.wind_kph} km/h</span>
                    </div>
                    <div><b>Namlik:</b><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1"
                        id="humidity"> 
                      </span> <span>${current.humidity}%</span></div>
                    <div> <b> Yog'ingarchilik:</b> <i class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span
                        class="ms-1" id="precipitation"> 
                      </span> <span>${current.precip_mm}mm</span></div>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      `;

      getHourlyWeather(forecast.forecastday[0].hour);
    })
    .catch((error) => {
      console.log(error);

      otaDiv.innerHTML = `<p id="error">${error.response.data.error.message}</p>`;
    });
}

getWeather();

const cardContainer = document.querySelector(".card-container");
function getHourlyWeather(hours) {

  const sarvar = [];
  for (let i = 0; i < hours.length; i += 3) {
    sarvar.push(hours[i]);
  }
  console.log(sarvar)
  cardContainer.innerHTML = ``
  sarvar.map((hour) => {
    cardContainer.innerHTML += `
      <div class='hour-card'>
  			<p>${hour.time.slice(-5)}</p>
  			<img src="${hour.condition.icon}" alt="404">
  			<p>${hour.temp_c}C</p>
  		</div>
    `
  })
}
