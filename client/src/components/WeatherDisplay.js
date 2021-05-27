import React from 'react'
import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

const WeatherDisplay = ({fahrenheit, data}) => {

  const temperature = fahrenheit ? 
    <h1> {data.temperatureF} °F </h1> : 
    <h1> {data.temperatureC} °C </h1>

  const feelsLike = fahrenheit ? 
    <h2> Feels Like {data.feelsLikeF} °F </h2> : 
    <h2> Feels Like {data.feelsLikeC} °C </h2>

  const weatherDisplay = 
  <Container maxWidth = 'md'i>
    <Typography component="div" style={{ backgroundColor: '#dde3f0', textAlign: 'center'}}>
      <h1>{fahrenheit}</h1>
      <h1>Weather for {data.address}</h1>
      {temperature}
      <h1>{data.weather}</h1>
      {feelsLike}
      <h2>UV Index: {data.uvi}</h2>
      <h2>{data.humidity}% Humidity</h2>
      <h2>{data.windSpeed}m/s Winds</h2>
      <h2>{data.cloudiness}% Cloud Coverage</h2>
    </Typography>
  </Container>

  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl' disableGutters={true}>
        <Typography component="div" style={{ backgroundColor: '#f2f7ff', height: '100vh' }}>
          {weatherDisplay}
        </Typography>
      </Container>
    </>
  )
}

export default WeatherDisplay
