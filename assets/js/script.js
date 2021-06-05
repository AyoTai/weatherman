// Variables //
const searchFormEl = document.querySelector('#search-form');
const searchCityEl = document.querySelector('#search-city');
const resultContentEl = document.querySelector('#result-content');
const searchBtn = document.querySelector('.btn');
const searchInput = document.querySelector('#search-input');
const fiveDayForcast = document.querySelector('#fivedayforecast');
var searchInputVal = document.querySelector('#search-input').value;
const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='
const apiKey = '&exclude=hourly,minutely,alerts&appid=c8659540ec6ffab5c1dacd3f595ebb2e&units=imperial';
const button = document.querySelector('.btn')
const weathers = [];
var forecastDay = [];
var currentDay = moment().format("MM-DD-YYYY");


// Functions //
// To fetch lattitude and longitude from user input
function geoCoords(){
    var coordUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInputVal + apiKey;

    fetch(coordUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            console.log(data[0].lat);
            console.log(data[0].lon);
            var lattitude = data[0].lat;
            var longitude = "&lon=" + data[0].lon;
            searchWeather(lattitude, longitude);
        })
}

// to fetch the weather forecast of the city that user inputs
function searchWeather(lattitude, longitude){
    
    url = baseUrl + lattitude + longitude + apiKey;

    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            // for (let i = 0; i < data.length; i++) {
            console.log(data.timezone);
            console.log(data.current.weather[0].icon);
            console.log(data.current.temp);
            console.log(data.current.wind_speed);
            console.log(data.current.humidity);
            console.log(data.current.uvi);
            var weather = {
                cityName: data.timezone,
                cityCastIcon: data.current.weather[0].icon,
                cityTemp: data.current.temp,
                cityWind: data.current.wind_speed,
                cityHum: data.current.humidity,
                cityUvi: data.current.uvi,
            }
            weathers.push(weather);
            displayWeather(data);
            displayForecast(data);
        })
        searchInputVal = '';
}

// to display the weather 
function displayWeather(data){
    var weathResultDiv = document.createElement('div');
    weathResultDiv.className = 'weather-result float-child';

    var weathCity = document.createElement('h4');
    weathCity.textContent = data.timezone + ' ' + currentDay;
    weathCity.className = 'weather';

    var weathIcon = document.createElement('img');
    weathIcon.src = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
    weathIcon.className = 'weather';

    var weathTemp = document.createElement('p');
    weathTemp.textContent = "Temp: " + data.current.temp + " °F";
    weathTemp.className = 'weather';

    var weathWind = document.createElement('p');
    weathWind.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
    weathWind.className = 'weather';

    var weathHum = document.createElement('p');
    weathHum.textContent = "Humidity: " + data.current.humidity + "%";
    weathHum.className = 'weather';

    var weathUvi = document.createElement('p');
    weathUvi.textContent = "UV Index: ";
    weathUvi.className = 'weather';
    var uviSpan = document.createElement('span');
    uviSpan.className = 'badge weather';
    uviSpan.textContent = data.current.uvi;
    if (data.current.uvi < 5){
        uviSpan.classList.add("badge1");
    } else if (data.current.uvi > 5 && data.current.uvi <= 7){
        uviSpan.classList.add("badge2");
     } else {
        uviSpan.classList.add("badge3");
    }

    weathResultDiv.appendChild(weathCity);
    weathResultDiv.appendChild(weathIcon);
    weathResultDiv.appendChild(weathTemp);
    weathResultDiv.appendChild(weathWind);
    weathResultDiv.appendChild(weathHum);
    weathResultDiv.appendChild(weathUvi);
    weathUvi.appendChild(uviSpan);

    document.querySelector('.result-content').appendChild(weathResultDiv);
}

// to display 5day forecast
function displayForecast(data){
    var forecastHeader = document.createElement('h3');
    forecastHeader.textContent = "5 Day Forecast";
    forecastHeader.className = "text-center forecast";
    fiveDayForcast.appendChild(forecastHeader);
    fiveDays();

    for (let i = 0; i < 5; i++){
        var weathCards = document.createElement('div');
        weathCards.className = "col-2 col-md-4 col-sm-6 float-child cards";
        weathCards.textContent = forecastDay[i];
        console.log(forecastDay[i]);
        fiveDayForcast.appendChild(weathCards);
        
        var cardIcon = document.createElement('img');
        cardIcon.className = 'weather';
        cardIcon.src = "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
        weathCards.appendChild(cardIcon);

        var cardTemp = document.createElement('p');
        cardTemp.className = 'weather';
        cardTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";
        weathCards.appendChild(cardTemp);

        var cardHum = document.createElement('p');
        cardHum.className = 'weather';
        cardHum.textContent = "Humidity: " + data.daily[i].humidity + "%";
        weathCards.appendChild(cardHum);

        var cardWind = document.createElement('p');
        cardWind.className = 'weather';
        cardWind.textContent = "Wind Speed: " + data.daily[i].wind_speed + " MPH";
        weathCards.appendChild(cardWind);
    }
}

// 5 day forcast
function fiveDays() {
    for (var i = 1; i < 6; i++) {
      var newDay = moment().add(i, "days").format("MM-DD-YYYY");
      forecastDay.push(newDay);
    }
  }


// to clear last result before appending more
function clearDiv(){
    document.querySelectorAll('.weather').remove();
}


// to search user input
function handleSearchFormSubmit(event){
    event.preventDefault();

    searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal){
        alert("You Need to Enter a Valid City!");
    }
    geoCoords();
    clearDiv();
    // searchWeather();
    // var timeout = setTimeout(displayWeather(),5000);
    
}

button.addEventListener('click', handleSearchFormSubmit);