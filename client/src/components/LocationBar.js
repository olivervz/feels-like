import React from 'react'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input';
import Location from './Location'
import { useState, useEffect } from 'react'

const LocationBar = () => {
  const [locationsState, setLocationsState] = useState([])
  const [searchState , setSearchState] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('')


  const fetchWeather = async (city) => {

    const API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_KEY
    const address = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

    const response = await fetch(address)
    const weatherData = await response.json()
    if (weatherData.cod === "404") {
      setSearchState(true)
      return
    }
    setSearchState(false)
    // setWeatherState({...weatherState, weatherData: weatherData})
    setLocationsState([...locationsState, weatherData])
  }

  // Select the specified Location
  const onClick = (loc) => {
    setSelectedLocation(loc)
  }

  // Delete the Location
  const onDelete = (loc) => {
    setLocationsState(locationsState.filter((location) => location.name != loc))
  }

  // Create a new Location
  const keyPress = (event) => {
    if(event.keyCode == 13){
      fetchWeather(event.target.value)
    }
  }

  console.log(locationsState)
  return (
    <div>
      <Grid spacing={3}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={0}>
            <>
              {locationsState.map((location) => (
                <Location selected={location.name === selectedLocation ? true : false}data={location} onSelect={onClick} onDelete={onDelete}/>
              ))}
            </>
            <Input id="filled-basic" label="Filled" variant="filled" onKeyDown={keyPress} error={searchState}/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default LocationBar
