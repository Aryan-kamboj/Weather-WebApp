var x = document.getElementById("location");
var coordinates;
var key = "97c4d30a565cd70b78335fdff34c32c1";
var weather_data;
function activate_search(){
    var your_weather = document.getElementById("your");
    your_weather.classList.remove("active");
    var search_weather = document.getElementById("search");
    var search_weather_div = document.getElementById("search_weather_div");
    search_weather.classList.add("active");
    search_weather_div.classList.add("search_div_active")
}

async function weather_api_call_coordinates(long,lat){
    weather_data = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude={minutely,hourly,daily,alerts}&APPID=97c4d30a565cd70b78335fdff34c32c1`);
    weather_data.then((response)=>{weather_data=response.json()
        .then((weather_data)=>{setWeather(weather_data);});
    });
} 

async function get_current_loc(){
        navigator.geolocation.getCurrentPosition(showPosition);
        async function showPosition(position){
            coordinates=position;
            weather_api_call_coordinates(coordinates.coords.longitude , coordinates.coords.latitude);
        }
}
async function get_current_weather(){
   //activating the required css 
    var your_weather = document.getElementById("your");
    your_weather.classList.add("active");
    var search_weather = document.getElementById("search");
    search_weather.classList.remove("active");
    var search_weather_div = document.getElementById("search_weather_div");
    search_weather_div.classList.remove("search_div_active")
    //
    get_current_loc();
}
get_current_weather();
let current_location = document.getElementById("location");
let skies_text = document.getElementById("skies_text");
let skies_icon = document.getElementById("skies_icon");
let temp = document.getElementById("temp");
let speed = document.getElementById("speed");
let humidity = document.getElementById("humid");
let clouds = document.getElementById("cloud_cover");

function setWeather(weather_data){
    current_location.innerHTML = weather_data.name;
    skies_text.innerHTML = weather_data.weather[0].main;
    skies_icon.src = `https://openweathermap.org/img/wn/${weather_data.weather[0].icon}@2x.png`;
    temp.innerHTML = (weather_data.main.temp-273).toPrecision(3)+ "&#176;C";
    speed.innerHTML = weather_data.wind.speed+" M/S"
    humid.innerHTML = weather_data.main.humidity+" %"
    clouds.innerHTML = weather_data.clouds.all+" %"
}


async function get_weather_data_location(){
    var search_bar = document.getElementById("search_bar");
        var location = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search_bar.value}&limit=1&appid=${key}`);
        location = await location.json();
        location = location[0];//the response of this api is in the form of an array so we take the first element
        weather_data = await weather_api_call_coordinates(location.lon,location.lat);
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
    else{
        setWeather(weather_data);
    }
}

//await keyword takes a function that returns a promise 

//{
//     "coord": {
//         "lon": 75.5612,
//         "lat": 26.8421
//     },
//     "weather": [
//         {
//             "id": 804,
//             "main": "Clouds",
//             "description": "overcast clouds",
//             "icon": "04d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 295.17,
//         "feels_like": 294.18,
//         "temp_min": 295.17,
//         "temp_max": 295.17,
//         "pressure": 1003,
//         "humidity": 29,
//         "sea_level": 1003,
//         "grnd_level": 962
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 0.92,
//         "deg": 119,
//         "gust": 3.61
//     },
//     "clouds": {
//         "all": 92
//     },
//     "dt": 1682849339,
//     "sys": {
//         "type": 1,
//         "id": 9170,
//         "country": "IN",
//         "sunrise": 1682814044,
//         "sunset": 1682861349
//     },
//     "timezone": 19800,
//     "id": 1273690,
//     "name": "Dahmi Kalān",
//     "cod": 200
// }

// [
//     {
//         "name": "Saharanpur",
//         "local_names": {
//             "ru": "Сахаранпур",
//             "ur": "سهارنپر",
//             "fr": "Saharanpur",
//             "ja": "サハーランプル",
//             "pa": "ਸਹਾਰਨਪੁਰ",
//             "hi": "सहारनपुर",
//             "de": "Saharanpur",
//             "es": "Saharanpur",
//             "kn": "ಸಹರನ್‌ಪುರ್",
//             "en": "Saharanpur",
//             "ar": "سهارنبر",
//             "uk": "Сахаранпур"
//         },
//         "lat": 29.9637438,
//         "lon": 77.5427464,
//         "country": "IN",
//         "state": "Uttar Pradesh"
//     }
// ]