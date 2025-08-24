
const api_key = '1f4b3cb25abc4f72af190427252408'

const BASE_URL = 'https://api.weatherapi.com/v1/current.json'

const https = 'https:'

const locationElement = document.getElementById('location');
const tempCElement = document.getElementById('temp_c');
const conditionElement = document.getElementById('condition');
const windKphElement = document.getElementById('wind_kph'); 
const humidityElement = document.getElementById('humidity');
const conditionImg = document.getElementById('condition_img');
const imgurl = '';

const cityInput = document.getElementById('search_area');
const searchButton = document.getElementById('search-btn');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    fetchWeatherData(city);
}); 

async function fetchWeatherData(city) {
    const url = `${BASE_URL}?key=${api_key}&q=${city}&aqi=no`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Could not retrieve weather data. Please check the city name and try again.');
    }
}

function updateWeatherInfo(data) {
    console.log(data);
    
    locationElement.textContent = `${data.location.name}, ${data.location.country}`;
    tempCElement.textContent = `${data.current.temp_c}°C`;
    conditionElement.textContent = `${data.current.condition.text}`;
    conditionImg.src = https + data.current.condition.icon;
    windKphElement.textContent = `${data.current.wind_kph} kph`;
    humidityElement.textContent = `${data.current.humidity}%`;
}