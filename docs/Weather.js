
function updateLocationInputs() {
    let lat= document.getElementById("lat");
    let lon=document.getElementById("lon");
      const center = map.getCenter();
      const lat_txt = center.lat().toFixed(2);
      const lng_txt = center.lng().toFixed(2);
    
      console.log("Current Center Latitude:", lat_txt);
      console.log("Current Center Longitude:", lng_txt);
    
      lat.value= lat_txt;
      lon.value= lng_txt;
    }
async function fetchWeatherForecast(latitude, longitude) {
    try {
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&past_days=1&forecast_days=4`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('No fue posible obtener una respuesta');
      }
      const data = await response.json();
      processResults(data);
      return data;
      // Process the weather forecast data here
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    }
  }
function processResults(data){
    const dailyForecast = data.daily;
    let jsonElement = document.getElementById("json");
    let htmlOutput = '';  // Create an empty HTML string

    for (let i = 0; i < dailyForecast.time.length; i++) {
      const date = dailyForecast.time[i];
      const weatherCode = dailyForecast.weathercode[i];
      const maxTemperature = dailyForecast.temperature_2m_max[i];
      const minTemperature = dailyForecast.temperature_2m_min[i];

      // Append weather information to the HTML string
      htmlOutput += `
  <div class="col-md d-flex flex-column justify-content-between">
      <div class="card mb-4 dias">
          <div class="card-body">
              <p class="card-text">${getWeatherDescription(weatherCode)}</p>
              <p class="card-text">Max Temperature: ${maxTemperature}°C</p>
              <p class="card-text">Min Temperature: ${minTemperature}°C</p>
              <h5 class="card-title">${date}</h5>
          </div>
      </div>
  </div>`;
  }

  document.getElementById("weatherContent").innerHTML = htmlOutput;
}
function getWeatherDescription(weatherCode) {
    const weatherDescriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Drizzle: Light intensity',
      53: 'Drizzle: Moderate intensity',
      55: 'Drizzle: Dense intensity',
      56: 'Freezing Drizzle: Light intensity',
      57: 'Freezing Drizzle: Dense intensity',
      61: 'Rain: Slight intensity',
      63: 'Rain: Moderate intensity',
      65: 'Rain: Heavy intensity',
      66: 'Freezing Rain: Light intensity',
      67: 'Freezing Rain: Heavy intensity',
      71: 'Snow fall: Slight intensity',
      73: 'Snow fall: Moderate intensity',
      75: 'Snow fall: Heavy intensity',
      77: 'Snow grains',
      80: 'Rain showers: Slight intensity',
      81: 'Rain showers: Moderate intensity',
      82: 'Rain showers: Violent intensity',
      85: 'Snow showers: Slight intensity',
      86: 'Snow showers: Heavy intensity',
      95: 'Thunderstorm: Slight or moderate',
      96: 'Thunderstorm: Slight hail',
      99: 'Thunderstorm: Heavy hail'
    };
  
    return weatherDescriptions[weatherCode] || 'Unknown weather code';
  }