const apiKey = 'ce0979b1d8f89f47cc4ce17e39a920e0';  // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('input').value; // Accessing the correct input
    const loadingText = document.getElementById('loading'); // For showing loading text
    const weatherDetails = document.getElementById('weather-details'); // For displaying weather info

    // Show loading text
    loadingText.style.display = 'block';
    weatherDetails.style.display = 'none';

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        // Fetch weather data
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        // Handle errors (e.g., city not found)
        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        // Hide loading text and show weather details
        loadingText.style.display = 'none';
        weatherDetails.style.display = 'block';

        // Display weather details
        weatherDetails.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        loadingText.style.display = 'none';
        alert('Error fetching weather data: ' + error.message);
    }
}
