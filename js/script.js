//set variables and api URLs
var searchedCity = $("#searched-city").val();
var searchBtn = $("#searchBtn");
var lat;
var lon;
var weatherInfoApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=cf435fe1ad8c50ef7b1fe99bc009900c";

//set array for previously searched cities
var savedCities = [];

//fetch api for weather info
searchBtn.on("click", function () {
    console.log($("#searched-city").val);
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" +
        $("#searched-city").val() +
        "&limit=5&appid=cf435fe1ad8c50ef7b1fe99bc009900c")
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    lat = data[0].lat;
                    lon = data[0].lon;
                });
            } else if (searchedCity === "") {
                alert("please enter a city");
            }
        }).then(function () {
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=cf435fe1ad8c50ef7b1fe99bc009900c")
                .then(function (response) {
                    if (reponse.ok) {
                        response.json().then(function (data) {
                            console.log(data);
                        })
                    }

                })
        });
    })
