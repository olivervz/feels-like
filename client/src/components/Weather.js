import React from 'react'
import WeatherDisplay from './WeatherDisplay'
import { useState, useEffect } from 'react'

const Weather = ({ fahrenheit, weatherData, name, address }) => {
  const [newWeatherState, setNewWeatherState] = useState(weatherData)
  const [weatherState, setWeatherState] = useState({
    loaded: false,
    weatherData: null,
    city: null,
    address: null,
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
    const city = name
    const cityaddress = address
    const temperatureK = Math.trunc(weatherData.current.temp)
    const temperatureF = Math.trunc(kelvinToFahrenheit(temperatureK))
    const temperatureC = Math.trunc(kelvinToCelsius(temperatureK))
    const feelsLikeK = Math.trunc(weatherData.current.feels_like)
    const feelsLikeF = Math.trunc(kelvinToFahrenheit(feelsLikeK))
    const feelsLikeC = Math.trunc(kelvinToCelsius(feelsLikeK))
    const humidity = weatherData.current.humidity
    const windSpeed = weatherData.current.wind_speed
    const cloudiness = weatherData.current.clouds
    const uvi = weatherData.current.uvi
    const weather = weatherData.current.weather[0].description

    setWeatherState({...weatherState, 
      loaded: true,
      weatherData: weatherData,
      city: city,
      address: cityaddress,
      temperatureK: temperatureK,
      temperatureF: temperatureF,
      temperatureC: temperatureC,
      feelsLikeK: feelsLikeK,
      feelsLikeF: feelsLikeF,
      feelsLikeC: feelsLikeC,
      humidity: humidity,
      windSpeed: windSpeed,
      cloudiness: cloudiness,
      uvi: uvi,
      weather: weather
    })
  }

  useEffect(() => {
    parseWeatherData()
  }, [newWeatherState])

  if (weatherData.lat !== newWeatherState.lat || weatherData.lon !== newWeatherState.lon) {
    setNewWeatherState(weatherData)
  }

  return (
    <div>
      <WeatherDisplay fahrenheit={fahrenheit} data={weatherState}/>
    </div>
  )
}

export default Weather
