const btn = document.getElementById('get-weather-btn');
const select = document.getElementById('city-select');
const weatherInfo = document.getElementById('weather-info');
const weatherIcon = document.getElementById('weather-icon');
const mainTemp = document.getElementById('main-temperature');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const windGust = document.getElementById('wind-gust');
const weatherMain = document.getElementById('weather-main');
const locationEl = document.getElementById('location');

async function getWeather(city) {
  try {
    const response = await fetch(https://weather-proxy.freecodecamp.rocks/api/city/${city});
    if (!response.ok) {
      throw new Error(`API response not ok: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return undefined;
  }
}

async function showWeather(city) {
  if (!city) return;
  const data = await getWeather(city);

  if (!data) {
    alert('Something went wrong, please try again later');
    return;
  }

  weatherInfo.style.display = 'block';

  weatherIcon.src = data.weather && data.weather[0] && data.weather[0].icon ? data.weather[0].icon : '';
  weatherIcon.alt = data.weather && data.weather[0] && data.weather[0].description ? data.weather[0].description : 'Weather icon';

  locationEl.textContent = data.name || 'N/A';
  weatherMain.textContent = (data.weather && data.weather[0] && data.weather[0].main) || 'N/A';
  mainTemp.textContent = data.main && data.main.temp !== undefined ? data.main.temp.toFixed(1) : 'N/A';
  feelsLike.textContent = data.main && data.main.feels_like !== undefined ? data.main.feels_like.toFixed(1) : 'N/A';
  humidity.textContent = data.main && data.main.humidity !== undefined ? data.main.humidity : 'N/A';
  wind.textContent = data.wind && data.wind.speed !== undefined ? data.wind.speed.toFixed(1) : 'N/A';
  windGust.textContent = data.wind && data.wind.gust !== undefined ? data.wind.gust.toFixed(1) : 'N/A';
}

btn.addEventListener('click', () => {
  const selectedCity = select.value.trim().toLowerCase();
  if (selectedCity) {
    showWeather(selectedCity);
  }
});
