//set variables for searched city and call api
var searchedCity = ;
var lat = ;
var lon = ;
//
var savedCities = [];
var weatherInfo = function() {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,alerts&appid=cf435fe1ad8c50ef7b1fe99bc009900c");
}