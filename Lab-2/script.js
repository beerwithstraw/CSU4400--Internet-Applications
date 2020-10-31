var apikey = "3265874a2c77ae4a04bb96236a642d2f";
var main = document.getElementById("main");var form = document.getElementById("form");var search = document.getElementById("search");
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

var url = (city) =>
    `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apikey}`;

getWeatherByLocation("London");

async function getWeatherByLocation(city) {
var resp = await fetch(url(city), { origin: "cors" });
var respData = await resp.json();

    console.log(respData);
    console.log(today.toDateString())
    
    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
var temp0max = KtoC(data.list[0].temp.max).toFixed(0);
var temp0min = KtoC(data.list[0].temp.min).toFixed(0);
var temp1max = KtoC(data.list[1].temp.max).toFixed(0);
var temp1min = KtoC(data.list[1].temp.min).toFixed(0);
var temp2max = KtoC(data.list[2].temp.max).toFixed(0);
var temp2min = KtoC(data.list[2].temp.min).toFixed(0);
var temp3max = KtoC(data.list[3].temp.max).toFixed(0);
var temp3min = KtoC(data.list[3].temp.min).toFixed(0);
var temp4max = KtoC(data.list[4].temp.max).toFixed(0);
var temp4min = KtoC(data.list[5].temp.min).toFixed(0);

var avgtemp0 = ((KtoC(data.list[0].temp.max) + KtoC(data.list[0].temp.min))/2);
//console.log(avgtemp0);
var avgtemp1 = ((KtoC(data.list[1].temp.max) + KtoC(data.list[1].temp.min))/2);
//console.log(avgtemp1);
var avgtemp2 = ((KtoC(data.list[2].temp.max) + KtoC(data.list[2].temp.min))/2);
//console.log(avgtemp2);
var avgtemp3 = ((KtoC(data.list[3].temp.max) + KtoC(data.list[3].temp.min))/2);
//console.log(avgtemp3);
var avgtemp4 = ((KtoC(data.list[4].temp.max) + KtoC(data.list[4].temp.min))/2);
//console.log(avgtemp4);
var avgtemptotal = (avgtemp0+avgtemp1+avgtemp2+avgtemp3+avgtemp4)/5;
//console.log(avgtemptotal);


var icon0 = data.list[0].weather[0].icon;
var icon1 = data.list[1].weather[0].icon;
var icon2 = data.list[2].weather[0].icon;
var icon3 = data.list[3].weather[0].icon;
var icon4 = data.list[4].weather[0].icon;

var description0 = data.list[0].weather[0].description;
var description1 = data.list[1].weather[0].description;
var description2 = data.list[2].weather[0].description;
var description3 = data.list[3].weather[0].description;
var description4 = data.list[4].weather[0].description;

var wind0 = data.list[0].speed;
var wind1 = data.list[1].speed;
var wind2 = data.list[2].speed;
var wind3 = data.list[3].speed;
var wind4 = data.list[4].speed;

    var rain0;
    var rain1;
    var rain2;
    var rain3;
    var rain4;
    
    if ((typeof data.list[0].rain == "undefined") || (data.list[0].rain == "undefined")){
        rain0 = "No Rain Forecast"
    }
    else{
        rain0 = data.list[0].rain+" mm/h";

    }
    if ((typeof data.list[1].rain == "undefined") || (data.list[1].rain == "undefined")){
        rain1 = "No Rain Forecast"
    }
    else{
        rain1 = data.list[1].rain+" mm/h";

    }
    if ((typeof data.list[2].rain == "undefined") || (data.list[2].rain == "undefined")){
        rain2 = "No Rain Forecast"

    }
    else{
        rain2 = data.list[2].rain+" mm/h";

    }
    if ((typeof data.list[3].rain == "undefined") || (data.list[3].rain == "undefined")){
        rain3 = "No Rain Forecast"
    }
    else{
        rain3 = data.list[3].rain+" mm/h";

    }
    if ((typeof data.list[4].rain == "undefined") || (data.list[4].rain == "undefined")){
        rain4 = "No Rain Forecast"

    }
    else{
        rain4 = data.list[4].rain+" mm/h";

    }

    var textToDisplay1;
    var textToDisplay2;

    if ((rain0 == "No Rain Forecast") && (rain1 == "No Rain Forecast") && (rain2 == "No Rain Forecast") && (rain3 == "No Rain Forecast") && (rain4 == "No Rain Forecast")){
        textToDisplay1 = "You don't need to pack an Umbrella as there is no forecast for rain over the next 5-days."
    }
    else{
        textToDisplay1 = "You should pack an Umbrella as it might rain sometime in the next 5-days."

    }

    if ( avgtemptotal > 20 ){
        textToDisplay2 = "Pack for a Hot Weather as the average temperature will be greater than 20°C for the next 5-days. "

    }
    else if(avgtemptotal >10 && avgtemptotal <=20){
        textToDisplay2 = "Pack for a Warm Weather as the average temperature will be vary from 10°C to 20°C for the next 5-days. "

    }
    else if(avgtemptotal >-10 && avgtemptotal <=10){
        textToDisplay2 = "Pack for a Cold Weather as the average temperature will be vary from -10°C to 10°C for the next 5-days. "

        
    }


var weather = document.createElement("div");
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

            <ul>
                <p>Points to consider before travelling:</p>
                <li>${textToDisplay1}</li>
                <li>${textToDisplay2}</li>
            </ul>

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
var city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }

});