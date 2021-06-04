// Variables //
const searchFormEl = document.querySelector('#search-form');
const searchCityEl = document.querySelector('#search-city');
const resultContentEl = document.querySelector('#result-content');
const searchBtn = document.querySelector('.btn');
const searchInput = document.querySelector('#search-input');
// const fiveDayForcast = document.querySelector('#5dayforcast');
var searchInputVal = document.querySelector('#search-input').value;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=5d050cc05f2e639349f41af0545c2086';
const button = document.querySelector('.btn')

// const currentDay = moment().format("MM-DD-YYYY");


// Functions //
function searchWeather(input){
    
    url = baseUrl + searchInputVal + apiKey;

    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            // console.log(data);
            // for (let i = 0; i < data.length; i++) {
            console.log(data.name)
            console.log(data.weather[0].icon)
            console.log(data.main.temp)
            console.log(data.wind.speed)
            console.log(data.main.humidity)
            console.log(data.main.uvi)    
            
        })
}

function handleSearchFormSubmit(event){
    event.preventDefault();

    searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal){
        alert("You Need to Enter a Valid Name!");
    }
    searchWeather(searchInputVal);
}

button.addEventListener('click', handleSearchFormSubmit);