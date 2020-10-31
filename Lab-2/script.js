const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
var options = {day: 'numeric', month: 'long', weekday: 'long' };
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
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apikey}`;

getWeatherByLocation("London");

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);
    console.log(today.toDateString())
    
    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp0max = KtoC(data.list[0].temp.max).toFixed(0);
    const temp0min = KtoC(data.list[0].temp.min).toFixed(0);
    const temp1max = KtoC(data.list[1].temp.max).toFixed(0);
    const temp1min = KtoC(data.list[1].temp.min).toFixed(0);
    const temp2max = KtoC(data.list[2].temp.max).toFixed(0);
    const temp2min = KtoC(data.list[2].temp.min).toFixed(0);
    const temp3max = KtoC(data.list[3].temp.max).toFixed(0);
    const temp3min = KtoC(data.list[3].temp.min).toFixed(0);
    const temp4max = KtoC(data.list[4].temp.max).toFixed(0);
    const temp4min = KtoC(data.list[5].temp.min).toFixed(0);

    const icon0 = data.list[0].weather[0].icon;
    const icon1 = data.list[1].weather[0].icon;
    const icon2 = data.list[2].weather[0].icon;
    const icon3 = data.list[3].weather[0].icon;
    const icon4 = data.list[4].weather[0].icon;

    const description0 = data.list[0].weather[0].description;
    const description1 = data.list[1].weather[0].description;
    const description2 = data.list[2].weather[0].description;
    const description3 = data.list[3].weather[0].description;
    const description4 = data.list[4].weather[0].description;

    const wind0 = data.list[0].speed;
    const wind1 = data.list[1].speed;
    const wind2 = data.list[2].speed;
    const wind3 = data.list[3].speed;
    const wind4 = data.list[4].speed;

    var rain0;
    var rain1;
    var rain2;
    var rain3;
    var rain4;
    
    if ((typeof data.list[0].rain == "undefined") || (data.list[0].rain == "undefined")){
        rain0 = "No Rain Today"
    }
    else{
        rain0 = data.list[0].rain+" mm/h";

    }
    if ((typeof data.list[1].rain == "undefined") || (data.list[1].rain == "undefined")){
        rain1 = "No Rain Today"
    }
    else{
        rain1 = data.list[1].rain+" mm/h";

    }
    if ((typeof data.list[2].rain == "undefined") || (data.list[2].rain == "undefined")){
        rain2 = "No Rain Today"

    }
    else{
        rain2 = data.list[2].rain+" mm/h";

    }
    if ((typeof data.list[3].rain == "undefined") || (data.list[3].rain == "undefined")){
        rain3 = "No Rain Today"
    }
    else{
        rain3 = data.list[3].rain+" mm/h";

    }
    if ((typeof data.list[4].rain == "undefined") || (data.list[4].rain == "undefined")){
        rain4 = "No Rain Today"

    }
    else{
        rain4 = data.list[4].rain+" mm/h";

    }
    
if ((typeof data.list[4].rain == "undefined") || (data.list[4].rain == "undefined")){
    console.log("No Rain");
}
else{

}

    console.log(temp0min)
    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <p>${data.city.name}</p>
        <style>
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }
            th, td {
                text-align: center;
                padding: 10px;
            }
        </style>
        <table style="width:100%" >
            <tr>
                <th>   Day & Date   </th>
                <th>   Temperature(Max/Min)   </th> 
                <th>   Forecast   </th>
                <th>   Windspeed   </th>
                <th>   Rainfall   </th>
            </tr>

            <tr>
                <td>${today.toLocaleDateString("en-US", options)}</td>
                <td>${temp0max}/${temp0min}°C</td>
                <td><h4><img src="https://openweathermap.org/img/wn/${icon0}@2x.png" />${description0}
                <img src="https://openweathermap.org/img/wn/${icon0}@2x.png" /></h4></td>
                <td>${wind0} m/s</td>
                <td>${rain0}</td>
            </tr>
            <tr>
                <td>${nextDay1.toLocaleDateString("en-US", options)}</td>
                <td>${temp1max}/${temp1min}°C</td>
                <td><h4><img src="https://openweathermap.org/img/wn/${icon1}@2x.png" />${description1}
                <img src="https://openweathermap.org/img/wn/${icon1}@2x.png" /></h4></td>
                <td>${wind1} m/s</td>
                <td>${rain1}</td>
            </tr>
            <tr>
                <td>${nextDay2.toLocaleDateString("en-US", options)}</td>
                <td>${temp2max}/${temp2min}°C</td>
                <td><h4><img src="https://openweathermap.org/img/wn/${icon2}@2x.png" />${description2}
                <img src="https://openweathermap.org/img/wn/${icon2}@2x.png" /></h4></td>
                <td>${wind2} m/s</td>
                <td>${rain2}</td>
            </tr>
            <tr>
                <td>${nextDay3.toLocaleDateString("en-US", options)}</td>
                <td>${temp3max}/${temp3min}°C</td>
                <td><h4><img src="https://openweathermap.org/img/wn/${icon3}@2x.png" />${description3}
                <img src="https://openweathermap.org/img/wn/${icon3}@2x.png" /></h4></td>
                <td>${wind3} m/s</td>
                <td>${rain3}</td>
            </tr>
            <tr>
                <td>${nextDay4.toLocaleDateString("en-US", options)}</td>
                <td>${temp4max}/${temp4min}°C</td>
                <td><h4><img src="https://openweathermap.org/img/wn/${icon4}@2x.png" />${description4}
                <img src="https://openweathermap.org/img/wn/${icon4}@2x.png" /></h4></td>
                <td>${wind4} m/s</td>
                <td>${rain4}</td>
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