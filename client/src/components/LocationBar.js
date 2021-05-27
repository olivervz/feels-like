import React from 'react'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input';
import Location from './Location'
import Weather from './Weather'
import { useState } from 'react'
import { responsiveFontSizes } from '@material-ui/core';

const LocationBar = ({fahrenheit}) => {
  const [locationsState, setLocationsState] = useState([])
  const [keyState, setKeyState] = useState(0)
  const [searchState , setSearchState] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)

  const fetchLatitudeLongitude = async (city) => {
    const API_KEY = process.env.REACT_APP_HERE_KEY
    const HERE_ADDRESS = `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${API_KEY}&searchtext=${city}`
    const response = await fetch(HERE_ADDRESS)
    const locationData = await response.json()
    if (response.status !== 200) {
      throw 'invalid location'
    }
    return locationData
  }

  const fetchWeather = async (input) => {

    // Fetch lat/long from city name
    const API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_KEY

    var locationData
    var bestResult 
    try {
      locationData = await fetchLatitudeLongitude(input)
      bestResult = locationData.Response.View[0].Result[0].Location
    }
    catch (error) {
      setSearchState(true)
      return
    }

    const address = bestResult.Address
    var city = address.City
    const label = address.Label
    const latitude = bestResult.DisplayPosition.Latitude
    const longitude = bestResult.DisplayPosition.Longitude
    if (city === undefined) {
      city = label
    }

    console.log(bestResult)

    const OPEN_WEATHER_ADDRESS = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_KEY}`

    const response = await fetch(OPEN_WEATHER_ADDRESS)
    const weatherData = await response.json()
    if (weatherData.cod === "404") {
      setSearchState(true)
      return
    }
    setSearchState(false)
    const weatherDataa = {weatherData: weatherData, name: city, address: label, key: keyState}
    setKeyState(keyState + 1)
    setLocationsState([...locationsState, weatherDataa])
  }

  // Select the specified Location
  const onClick = (id) => {
    locationsState.forEach((location) => {
      if (location.key === id) {
        setSelectedLocation(location)
        return
      }
    })
  }

  // Delete the Location
  const onDelete = (id) => {
    setLocationsState(locationsState.filter((location) => location.key !== id))
    if (selectedLocation !== null && selectedLocation.key === id) {
      setSelectedLocation(null)
    }
  }

  // Create a new Location
  const keyPress = (event) => {
    if(event.keyCode === 13){
      fetchWeather(event.target.value)
      event.target.value = ''
    }
  }
  
  return (
    <div>
      <Grid spacing={3}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={0}>
            <>
              {locationsState.map((location) => (
                <Location selected={selectedLocation !== null && location.name === selectedLocation.name ? true : false} data={location.weatherData} name={location.name} address={location.address} key={location.key} id={location.key} onSelect={onClick} onDelete={onDelete}/>
              ))}
            </>
            <Input autoComplete="off" placeholder="Enter a Location" id="filled-basic" label="Filled" variant="filled" onKeyDown={keyPress} error={searchState}/>
          </Grid>
        </Grid>
      </Grid>
      <>
      {selectedLocation === null ? null : <Weather fahrenheit={fahrenheit} weatherData={selectedLocation.weatherData} name={selectedLocation.name} address={selectedLocation.address}/>}
      </>
    </div>
  )
}

export default LocationBar
