//set variables and api URLs
var searchedCity = $("#searched-city").val();
console.log(searchedCity);
var searchBtn = $("#searchBtn");
var latLonApi = "http://api.openweathermap.org/geo/1.0/direct?q=miami&limit=5&appid=cf435fe1ad8c50ef7b1fe99bc009900c";
// var weatherInfoApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,alerts&appid=cf435fe1ad8c50ef7b1fe99bc009900";

//set array for previously searched cities
var savedCities = [];

//fetch api for weather info
searchBtn.on("click", function (e) {
    e.preventDefault();
    fetch(latLonApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        } else if (searchedCity === "") {
            alert("please enter a city");
        }

    })
});

