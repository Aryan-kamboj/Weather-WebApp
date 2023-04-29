var x = document.getElementById("location");
var coordinates;

function activate_search(){
    var your_weather = document.getElementById("your");
    your_weather.classList.remove("active");
    var search_weather = document.getElementById("search");
    var search_weather_div = document.getElementById("search_weather_div");
    search_weather.classList.add("active");
    search_weather_div.classList.add("search_div_active")
}

async function cords(){
        navigator.geolocation.getCurrentPosition(showPosition);
        // console.log("flag");
        async function showPosition(position){
        coordinates=position;
        // console.log("location returned");
        // console.log(coordinates);
        weather_data = await weather_api_call_coordinates(coordinates.coords.longitude , coordinates.coords.latitude);
    }
}
async function weather_api_call_coordinates(long,lat){
    // console.log("weather api called");
    const weather_data = await fetch("http://api.weatherapi.com/v1/current.json?key=<API_KEY>&q="+lat+","+long);
    const weather_data_json = await weather_data.json();
    // console.log(weather_data_json);
    return weather_data_json;
    } 

let weather_data;
let current_location = document.getElementById("location");
let skies_text = document.getElementById("skies_text");
let skies_icon = document.getElementById("skies_icon");
let temp = document.getElementById("temp");
let speed = document.getElementById("speed");
let humidity = document.getElementById("humid");
let clouds = document.getElementById("cloud_cover");
async function get_weather_data_coordinates(){
   //activating the required css 
    var your_weather = document.getElementById("your");
    your_weather.classList.add("active");
    var search_weather = document.getElementById("search");
    search_weather.classList.remove("active");
    var search_weather_div = document.getElementById("search_weather_div");
    search_weather_div.classList.remove("search_div_active")
    //

    await cords();//getting the coordinates and weather data
    // console.log(weather_data);
    setTimeout(function renderItems(){
        current_location.innerHTML = weather_data.location.name;
        skies_text.innerHTML = weather_data.current.condition.text;
        skies_icon.src = "https:"+weather_data.current.condition.icon;
        temp.innerHTML = weather_data.current.temp_c+ "&#176;C";
        speed.innerHTML = weather_data.current.wind_kph+" KpH"
        humid.innerHTML = weather_data.current.humidity+" %"
        clouds.innerHTML = weather_data.current.cloud+" %"
    },3000)
    
}
get_weather_data_coordinates();

async function get_weather_data_location(){
    var search_bar = document.getElementById("search_bar");
        var weather_data = await fetch("http://api.weatherapi.com/v1/current.json?key=<API_KEY>&q="+search_bar.value);
        weather_data=await weather_data.json();
    if(weather_data.error)
    {
        current_location.innerHTML = weather_data.error.message;
        skies_text.innerHTML ="";
        skies_icon.src = "";
        temp.innerHTML = "&#176;C";
        speed.innerHTML = " KpH"
        humid.innerHTML = " %"
        clouds.innerHTML = " %"
    }
    // console.log(weather_data);
    else{
        current_location.innerHTML = weather_data.location.name;
        skies_text.innerHTML = weather_data.current.condition.text;
        skies_icon.src = "https:"+weather_data.current.condition.icon;
        temp.innerHTML = weather_data.current.temp_c+ "&#176;C";
        speed.innerHTML = weather_data.current.wind_kph+" KpH"
        humid.innerHTML = weather_data.current.humidity+" %"
        clouds.innerHTML = weather_data.current.cloud+" %"
    }
}

//await keyword takes a function that returns a promise 

// {
//     "location": {
//         "name": "Bagru",
//         "region": "Rajasthan",
//         "country": "India",
//         "lat": 26.84,
//         "lon": 75.56,
//         "tz_id": "Asia/Kolkata",
//         "localtime_epoch": 1680113801,
//         "localtime": "2023-03-29 23:46"
//     },
//     "current": {
//         "last_updated_epoch": 1680113700,
//         "last_updated": "2023-03-29 23:45",
//         "temp_c": 26,
//         "temp_f": 78.8,
//         "is_day": 0,
//         "condition": {
//             "text": "Mist",
//             "icon": "//cdn.weatherapi.com/weather/64x64/night/143.png",
//             "code": 1030
//         },
//         "wind_mph": 2.2,
//         "wind_kph": 3.6,
//         "wind_degree": 10,
//         "wind_dir": "N",
//         "pressure_mb": 1011,
//         "pressure_in": 29.85,
//         "precip_mm": 0,
//         "precip_in": 0,
//         "humidity": 37,
//         "cloud": 50,
//         "feelslike_c": 24.7,
//         "feelslike_f": 76.4,
//         "vis_km": 4,
//         "vis_miles": 2,
//         "uv": 1,
//         "gust_mph": 13,
//         "gust_kph": 20.9
//     }
// }
