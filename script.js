// script.js

//get city name from users
document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

// handling to API 
async function getWeatherData(city) {
    const apiKey = '1b0d77ce255219473b9194e69b8a25fd'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateUI(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;

    //add the weather icon
    const weatherIcon = document.getElementById('weather-icon');
    const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // get excat url
    weatherIcon.src = iconURL;

}
