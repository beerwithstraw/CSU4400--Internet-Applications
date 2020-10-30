
const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const today = new Date();



const url = (city) =>
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

getWeatherByLocation("London");

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);
    console.log(today)

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.list[0].main.temp);
    console.log(temp)
    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <p>${data.city.name}</p>
        <h2><img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}@2x.png" /></h2>
        <small>${data.list[0].weather[0].main}</small>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }

});