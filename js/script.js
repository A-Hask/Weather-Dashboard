//set variables and api URLs
var searchedCity = document.querySelector("#searched-city");
var searchBtn = document.querySelector("#searchBtn");
var latLon = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&limit=5&appid=cf435fe1ad8c50ef7b1fe99bc009900c";
var weatherInfo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,alerts&appid=cf435fe1ad8c50ef7b1fe99bc009900";

//set array for previously searched cities
var savedCities = [];

//fetch api for weather info
searchBtn.on("click", function latLon() {
    fetch(latLon).then(function(response){
    if (response.ok) {
            response.json().then(function() {
            console.log(searchedCity);
            });
        } else if (searchedCity.value === "") {
            alert("please enter a city");
        }

    })
});

