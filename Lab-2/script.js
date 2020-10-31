const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
var options = { /*, year: 'numeric'*/ day: 'numeric', month: 'long', weekday: 'long' };
var today = new Date();
var nextDay1 = new Date(today);
nextDay1.setDate(today.getDate() + 1);
var nextDay2 = new Date(today);
nextDay2.setDate(today.getDate() + 2);
var nextDay3 = new Date(today);
nextDay3.setDate(today.getDate() + 3);
var nextDay4 = new Date(today);
nextDay4.setDate(today.getDate() + 4);


const url = (city) =>
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

getWeatherByLocation("London");

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);
    console.log(today.toLocaleDateString())

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp0 = KtoC(data.list[0].main.temp).toFixed(1);
    const temp1 = KtoC(data.list[8].main.temp).toFixed(1);
    const temp2 = KtoC(data.list[16].main.temp).toFixed(1);
    const temp3 = KtoC(data.list[24].main.temp).toFixed(1);
    const temp4 = KtoC(data.list[32].main.temp).toFixed(1);

    const icon0 = data.list[0].weather[0].icon;
    const icon1 = data.list[8].weather[0].icon;
    const icon2 = data.list[16].weather[0].icon;
    const icon3 = data.list[24].weather[0].icon;
    const icon4 = data.list[32].weather[0].icon;

    const description0 = data.list[0].weather[0].description;
    const description1 = data.list[8].weather[0].description;
    const description2 = data.list[16].weather[0].description;
    const description3 = data.list[24].weather[0].description;
    const description4 = data.list[32].weather[0].description;

    const wind0 = data.list[0].wind.speed
    const wind1 = data.list[8].wind.speed
    const wind2 = data.list[16].wind.speed
    const wind3 = data.list[24].wind.speed
    const wind4 = data.list[32].wind.speed

    const rain0 = data.list[0].rain
    const rain1 = data.list[8].wind.speed
    const rain2 = data.list[16].wind.speed
    const rain3 = data.list[24].wind.speed
    const rain4 = data.list[32].wind.speed



    console.log(temp0)
    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <p>${data.city.name}</p>
        <table style="width:100%" >
            <tr>
                <th>   Day & Date   </th>
                <th>   Temperature   </th> 
                <th>   Forecast   </th>
                <th>   Windspeed   </th>
                <th>   Rainfall   </th>
            </tr>

            <tr>
                <td>${today.toLocaleDateString("en-US", options)}</td>
                <td>${temp0}°C</td>
                <td><h4><img src="https://openweathermap.org/img/wn/${icon0}@2x.png" />${description0}
                <img src="https://openweathermap.org/img/wn/${icon0}@2x.png" /></h4></td>
                <td>${wind0} m/s</td>
                <td>${rain0}</td>
            </tr>
            <tr>
                <td>${nextDay1.toLocaleDateString("en-US", options)}</td>
                <td>${temp1}°C</td>
                <td><h4><img src="https://openweathermap.org/img/wn/${icon1}@2x.png" />${description1}
                <img src="https://openweathermap.org/img/wn/${icon1}@2x.png" /></h4></td>
                <td>${wind1} m/s</td>
                <td>50</td>
            </tr>
            <tr>
                <td>${nextDay2.toLocaleDateString("en-US", options)}</td>
                <td>${temp2}°C</td>
                <td><h4><img src="https://openweathermap.org/img/wn/${icon2}@2x.png" />${description2}
                <img src="https://openweathermap.org/img/wn/${icon2}@2x.png" /></h4></td>
                <td>${wind2} m/s</td>
                <td>50</td>
            </tr>
            <tr>
                <td>${nextDay3.toLocaleDateString("en-US", options)}</td>
                <td>${temp3}°C</td>
                <td><h4><img src="https://openweathermap.org/img/wn/${icon3}@2x.png" />${description3}
                <img src="https://openweathermap.org/img/wn/${icon3}@2x.png" /></h4></td>
                <td>${wind3} m/s</td>
                <td>50</td>
            </tr>
            <tr>
                <td>${nextDay4.toLocaleDateString("en-US", options)}</td>
                <td>${temp4}°C</td>
                <td><h4><img src="https://openweathermap.org/img/wn/${icon4}@2x.png" />${description4}
                <img src="https://openweathermap.org/img/wn/${icon4}@2x.png" /></h4></td>
                <td>${wind4} m/s</td>
                <td>50</td>
            </tr>                        
            </table>

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