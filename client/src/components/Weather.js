import React from 'react'
import WeatherDisplay from './WeatherDisplay'
import { useState, useEffect } from 'react'

const Weather = ({ fahrenheit, weatherData }) => {
  const [newWeatherState, setNewWeatherState] = useState(weatherData)
  const [weatherState, setWeatherState] = useState({
    loaded: false,
    weatherData: null,
    city: null,
    country: null,
    temperatureK: null,
    temperatureF: null,
    temperatureC: null,
    feelsLikeK: null,
    feelsLikeF: null,
    feelsLikeC: null,
    humidity: null,
    windSpeed: null,
    cloudiness: null,
    rainVolume: null,
    weather: null
  })

  const kelvinToFahrenheit = (temp) => {
    return (temp - 273.15) * (9/5) + 32
  }

  const kelvinToCelsius = (temp) => {
    return (temp - 273.15)
  }

  const parseWeatherData = () => {
    const city = weatherData.name
    const country = weatherData.sys.country
    const temperatureK = Math.trunc(weatherData.main.temp)
    const temperatureF = Math.trunc(kelvinToFahrenheit(temperatureK))
    const temperatureC = Math.trunc(kelvinToCelsius(temperatureK))
    const feelsLikeK = Math.trunc(weatherData.main.feels_like)
    const feelsLikeF = Math.trunc(kelvinToFahrenheit(feelsLikeK))
    const feelsLikeC = Math.trunc(kelvinToCelsius(feelsLikeK))
    const humidity = weatherData.main.humidity
    const windSpeed = weatherData.wind.speed
    const cloudiness = weatherData.clouds.all
    // const rainVolume = weatherData.rain
    const weather = weatherData.weather[0].description

    setWeatherState({...weatherState, 
      loaded: true,
      weatherData: weatherData,
      city: city,
      country: country,
      temperatureK: temperatureK,
      temperatureF: temperatureF,
      temperatureC: temperatureC,
      feelsLikeK: feelsLikeK,
      feelsLikeF: feelsLikeF,
      feelsLikeC: feelsLikeC,
      humidity: humidity,
      windSpeed: windSpeed,
      cloudiness: cloudiness,
      // rainVolume: rainVolume,
      weather: weather
    })
  }

  useEffect(() => {
    parseWeatherData()
  }, [newWeatherState])

  if (weatherData.name != newWeatherState.name) {
    setNewWeatherState(weatherData)
  }

  return (
    <div>
      <WeatherDisplay fahrenheit={fahrenheit} data={weatherState}/>
    </div>
  )
}

export default Weather
