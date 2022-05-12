var searchBtn = $("#searchBtn");

//set array for previously searched cities
var savedCities = [];

//fetch api for city search and weather info
searchBtn.on("click", function () {
  var searchedCity = $("#searched-city").val();
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      searchedCity +
      "&limit=5&appid=cf435fe1ad8c50ef7b1fe99bc009900c"
  ).then(function (response) {
    if (response.ok) {
      response
        .json()
        .then(function (data) {
          return data;
        })
        .then(function (data) {
          fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
              data[0].lat +
              "&lon=" +
              data[0].lon +
              "&units=imperial&appid=cf435fe1ad8c50ef7b1fe99bc009900c"
          ).then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
                console.log(data);
              });
            }
          });
        });
    } else if (searchedCity === "") {
      alert("please enter a city");
    }
  });
});

//save data to local storage

//display previously searched cities. user must be able to click on cities to search again. 
//list must not have repeats

//display current weather (city, date, current temp, [hourly temp optional,] wind, humidity, UV index)

//display 5-day weather forecast (date, weather icon, high temp, low temp, wind, humidity)
