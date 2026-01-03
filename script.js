const apiKey = "21d0eb12bc6191b6e33b90ad8daef01d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");

const weatherIcon = document.querySelector(".weather-icon");
const tempEl = document.querySelector(".temp");
const cityEl = document.querySelector(".city");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const weatherContainer = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const response = await fetch(
            `${apiUrl}&q=${city}&appid=${apiKey}`
        );

        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

       
        if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow.png";
        } else {
            weatherIcon.src = "images/clouds.png";
        }

   
        tempEl.innerHTML = `${Math.round(data.main.temp)}°C`;
        cityEl.innerHTML = data.name;
        humidityEl.innerHTML = `${data.main.humidity}%`;
        windEl.innerHTML = `${Math.round(data.wind.speed)} km/h`;

        searchBox.value = "";

    } catch (error) {
        weatherContainer.innerHTML = "<h2>City not found. Try again!</h2>";

        setTimeout(() => {
            window.location.reload();
        }, 5000);
    }
}


searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();

    if (city === "") {
        weatherContainer.innerHTML = "<h2>Please enter a city name</h2>";

        setTimeout(() => {
            window.location.reload();
        }, 3000);
        return;
    }

    checkWeather(city);
});


