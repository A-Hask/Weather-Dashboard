var searchBtn = $("#searchBtn");

//set array for previously searched cities
var savedCities = [];

//fetch api for weather info
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