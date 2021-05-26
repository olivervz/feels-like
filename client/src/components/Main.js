import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Input from '@material-ui/core/Input';
import { useState, useEffect } from 'react'

const Main = () => {

  const [backgroundState, setBackgroundState] = useState({
    color: 'white',
    userInput: '',
    userInputInvalid: false,
  }) 

  const [weatherState, setWeatherState] = useState({
    loaded: false,
    city: null,
    weatherData: null,
    temperature: null,
    feelsLike: null,
    humidity: null,
    windSpeed: null,
    cloudiness: null,
    rainVolume: null,
    snowVolume: null,
  })

  const kelvinToFahrenheit = (temp) => {
    return (temp - 273.15) * (9/5) + 32
  }

  const kelvinToCelsius = (temp) => {
    return (temp - 273.15)
  }

  const parseWeatherData = () => {
    console.log(weatherState.weatherData)
    const city = weatherState.weatherData.name
    const temperatureK = weatherState.weatherData.main.temp
    const temperatureF = kelvinToFahrenheit(temperatureK)
    const temperatureC = kelvinToCelsius(temperatureK)
    const feelsLikeK = weatherState.weatherData.main.feels_like
    const feelsLikeF = kelvinToFahrenheit(feelsLikeK)
    const feelsLikeC = kelvinToCelsius(feelsLikeK)
    const humidity = weatherState.weatherData.main.humidity
    const windSpeed = weatherState.weatherData.wind.speed
    const cloudiness = weatherState.weatherData.clouds.all
    // const rainVolume = weatherState.weatherData.rain.1h
    // const snowVolume = weatherState.weatherData.rain.1h

    setWeatherState({...weatherState, 
      loaded: true,
      city: city,
      temperatureK: temperatureK,
      temperatureF: temperatureF,
      temperatureC: temperatureC,
      feelsLikeK: feelsLikeK,
      feelsLikeF: feelsLikeF,
      feelsLikeC: feelsLikeC,
      humidity: humidity,
      windSpeed: windSpeed,
      cloudiness: cloudiness,
      rainVolume: null,
      snowVolume: null,
    })
  }

  useEffect(() => {
    console.log('useEffect')
    if (weatherState.weatherData !== null) {
      parseWeatherData()
    }
  }, [weatherState.weatherData])

  const fetchWeather = async (city) => {

    const API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_KEY
    const address = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

    const response = await fetch(address)
    const weatherData = await response.json()
    setWeatherState({...weatherState, weatherData: weatherData})
  }

  const weatherDisplay = <div>
    <h1>Weather for {weatherState.city}</h1>
    <h1>{weatherState.temperatureF}°F</h1>
    <h2>Feels Like {weatherState.feelsLikeF}°F</h2>
    <h2>{weatherState.humidity}% Humidity</h2>
    <h2>{weatherState.windSpeed}m/s Winds</h2>
    <h2>{weatherState.cloudiness}% Cloud Coverage</h2>
  </div>

  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl' disableGutters={true}>
        <Typography component="div" style={{ backgroundColor: backgroundState.color, height: '100vh' }}>
          <Button variant='outlined' onClick={() => fetchWeather('boston')}>Display Weather Boston</Button>
          <Button variant='outlined' onClick={() => fetchWeather('winnipeg')}>Display Weather Boston</Button>
          <Button variant='outlined' onClick={() => fetchWeather('manhattan')}>Display Weather Boston</Button>
        {weatherState.loaded &&
          weatherDisplay
        }
        </Typography>
      </Container>
    </>
  )
}

export default Main
