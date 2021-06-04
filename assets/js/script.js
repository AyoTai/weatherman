// Variables //
const searchFormEl = document.querySelector('#search-form');
const searchCityEl = document.querySelector('#search-city');
const resultContentEl = document.querySelector('#result-content');
const searchBtn = document.querySelector('.btn');
const searchInput = document.querySelector('#search-input');
// const fiveDayForcast = document.querySelector('#5dayforcast');
const searchInputVal = document.querySelector('#search-input').value;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const apiKey = '&appid=5d050cc05f2e639349f41af0545c2086';

// const currentDay = moment().format("MM-DD-YYYY");


// Functions //
function handleSearchFormSubmit(event){
    event.preventDefault();

    if (!searchInputVal){
        alert("You Need to Enter a Valid Name");
    }
}

class Fetch{
    async getCurrent() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=california&appid=5d050cc05f2e639349f41af0545c2086`);

        const data = await response.json();

        console.log(data);

        return data;
    }
}
