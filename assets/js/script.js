// Variables //
const searchFormEl = document.querySelector('#search-form');
const searchCityEl = document.querySelector('#search-city');
const resultContentEl = document.querySelector('#result-content');
const searchBtn = document.querySelector('.btn');
const searchInput = document.querySelector('#search-input');
// const fiveDayForcast = document.querySelector('#5dayforcast');
var searchInputVal = document.querySelector('#search-input').value;
const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='
const apiKey = '&appid=c8659540ec6ffab5c1dacd3f595ebb2e';
const button = document.querySelector('.btn')

// const currentDay = moment().format("MM-DD-YYYY");


// Functions //

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

function searchWeather(lattitude, longitude){
    
    url = baseUrl + lattitude + longitude + apiKey;

    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            // for (let i = 0; i < data.length; i++) {
            // console.log(data.name)
            // console.log(data.weather[0].icon)
            // console.log(data.main.temp)
            // console.log(data.wind.speed)
            // console.log(data.main.humidity)
            // console.log(data.main.uvi)    
        })
}

function handleSearchFormSubmit(event){
    event.preventDefault();

    searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal){
        alert("You Need to Enter a Valid Name!");
    }
    geoCoords();
    searchWeather();
}

button.addEventListener('click', handleSearchFormSubmit);