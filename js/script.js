var searchBtn = $("#searchBtn");
// var clearBtn = $("#clear");
var saved = $("#saved");
var empty = "";
var currentWeather = $("#current");
var forecast = $("#future");
var cityButton = $("#city-btn");

//display current weather (city, current temp, wind, humidity, UV index)
//display 5-day weather forecast (date, weather icon, high temp, low temp, wind, humidity)
var weatherInfo = function (weatherData, city) {
    currentWeather.empty();
    currentWeather.append("<li>The weather in " + city + " today: "
        + weatherData.daily[0].weather[0].description + ".<br> The high is "
        + weatherData.daily[0].temp.max + " degrees fahrenheit. <br> The low is "
        + weatherData.daily[0].temp.min + " degrees fahrenheit. <br> There will be an average of "
        + weatherData.current.humidity + "% humidity and the UV index will be at <span id='color-code'>" + weatherData.daily[0].uvi
        + "</span>.</li>");
    forecast.empty();
    forecast.append("<li>" + city + "</li><br>");
    for (var i = 1; i < 6; i++) {
        forecast.append("<li class='col-6 row'>On " + moment().add(i, 'days').format("MMM DD, YYYY") + ", there will be " + weatherData.daily[i].weather[0].description + "."
            + "<br> The high will be " + weatherData.daily[i].temp.max + " degrees fahrenheit. <br> The low will be "
            + weatherData.daily[i].temp.min + " degrees fahrenheit. <br> Humidity will be at "
            + weatherData.daily[i].humidity + "% and wind speed will be "
            + weatherData.daily[i].wind_speed + " mph.</li><hr>");
    }

    var colorCode = $("#color-code");
    if (weatherData.daily[0].uvi < 2.000001) {
        colorCode.addClass("favorable");
    } else if (weatherData.daily[0].uvi > 5.9999) {
        colorCode.addClass("severe");
    } else {
        colorCode.addClass("moderate");
    }

}

//set array for previously searched cities
var savedCitiesArr = [];
var temp = localStorage.getItem("savedCities");
if (temp !== null) {
    savedCitiesArr = JSON.parse(temp);
    for (var i = 0; i < savedCitiesArr.length; i++) {
        saved.append("<button class='btn' id='city-btn'>" + savedCitiesArr[i] + "</button><br>");
    }
}
var emptyArr = [];

function search() {
    var searchedCity = $("#searched-city").val();
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchedCity +
        "&appid=f24bd690f06d29af834e992daa589ebe" 
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
                        data.coord.lat +
                        "&lon=" +
                        data.coord.lon +
                        "&units=imperial&appid=f24bd690f06d29af834e992daa589ebe"
                    ).then(function (response) {
                        if (response.ok) {
                            response.json()
                                .then(function (weatherData) {
                                    weatherInfo(weatherData, searchedCity);
                                });

                        }
                    });
                });
        } else if (searchedCity === "") {
            alert("please enter a city");
            //create a modal
        }
        //push local storage data to array
        savedCitiesArr.push(searchedCity);
        localStorage.setItem("savedCities", JSON.stringify(savedCitiesArr));
    });
    //save data to local storage
    var savedCity = JSON.parse(localStorage.getItem("savedCities"));
    //empty search bar

    //display previously searched cities. user must be able to click on cities to search again.
    saved.append("<button class='btn' id='city-btn'>" + searchedCity + "</button><br>");

};

//fetch api for city search and weather info
searchBtn.on("click", function(){
    search($("#searchedCity").val());
})

cityButton.on("click", function(e){
    search(e.target.textContent)
} );



// cityButton.on("click", search());

//retrieve data from local storage




//future feature
//clear search history button
// clearBtn.on("click", function () {
//     localStorage.removeItem("savedCity");
// });

