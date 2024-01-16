import { useEffect, useState } from 'react';
import './App.css';
import FormLocation from './components/FormLocation/FormLocation';
import useLocalStorage from './custom hook/useLocalStorage';
import axios from 'axios';

function App() {

  const [localData, setLocalData] = useLocalStorage("weatherData", {})
  const [weatherData, setWeatherData] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")

  const fetchWeatherDetails = async () => {
    setLoading("Loading...")
    setWeatherData({})
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {
        q: `${localData.latitude},${localData.longitude}`
      },
      headers: {
        'X-RapidAPI-Key': '0ce517782bmshd06c680405f6a3ep129eddjsn8e0f8ead28bb',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      if (Object.keys(localData).length) {
        const response = await axios.request(options);
        setLoading("")
        setWeatherData(response.data)
      }
    } catch (error) {

      console.error(error);
    }
  }

  // Show details such as location name, region, country, 
  // temperature (Celsius and Fahrenheit), humidity, wind speed, and "feels like" temperature.


  return (
    <div className="App">
      <h1>Weather App</h1>
      <FormLocation setLocalData={setLocalData} localData={localData} setError={setError} />
      <button disabled={error || !localData.latitude || !localData.longitude} className='btn' onClick={() => fetchWeatherDetails()}>Get Current Weather</button>
      {error && <span style={{ color: "red", fontSize: "13px" }}>{error}</span>}
      {
        Object.keys(weatherData).length > 0 ?
         <div className='flex_box'>
          <div className="flex_items">
            <label htmlFor="name">Location Name : </label>
            <span>{weatherData.location.name}</span>
          </div>
          <div className="flex_items">
            <label htmlFor="region">Region : </label>
            <span>{weatherData.location.region}</span>
          </div>
          <div className='flex_items'>
            <label htmlFor="country">Country :</label>
            <span>{weatherData.location.country}</span>
          </div>
          <div className='flex_items'>
            <label htmlFor="tempC">Temperature  : </label>
            <span>{weatherData.current.temp_c}&deg;C</span>
          </div>
          <div className='flex_items'>
            <label htmlFor="tempF">Temperature  :</label>
            <span> {`${weatherData.current.temp_f} `}&deg;F </span>
          </div>
          <div className='flex_items'>
            <label htmlFor="humidity">Humidity :</label>
            <span>{weatherData.current.humidity}%</span>
          </div>
          <div className='flex_items'>
            <label htmlFor="windSpeed">Wind Speed : </label>
            <span>{weatherData.current.wind_kph} kph</span>
          </div>
          <div className='flex_items'>
            <label htmlFor="feelLike">Feels Like :</label>
            <span>{weatherData.current.feelslike_c}&deg;C </span>
          </div>
        </div> : <div style={{fontSize:"18px", fontWeight: "600"}}>{loading}</div>}
    </div>
  );
}

export default App;
