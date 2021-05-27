import React from 'react'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input';
import Location from './Location'
import Weather from './Weather'
import { useState } from 'react'

const LocationBar = () => {
  const [locationsState, setLocationsState] = useState([])
  const [searchState , setSearchState] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)


  const fetchWeather = async (city) => {

    const API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_KEY
    const address = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    // const address2 = `http://api.openweathermap.org/data/2.5/onecall?q=${city}&appid=${API_KEY}`
    // const address2 = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${API_KEY}`

    const response = await fetch(address)
    const weatherData = await response.json()
    if (weatherData.cod === "404") {
      setSearchState(true)
      return
    }
    setSearchState(false)
    setLocationsState([...locationsState, weatherData])
  }

  // Select the specified Location
  const onClick = (loc) => {
    locationsState.forEach((location) => {
      if (location.name === loc) {
        setSelectedLocation(location)
        return
      }
    })
  }

  // Delete the Location
  const onDelete = (loc) => {
    setLocationsState(locationsState.filter((location) => location.name !== loc))
    if (selectedLocation !== null && selectedLocation.name === loc) {
      setSelectedLocation(null)
    }
  }

  // Create a new Location
  const keyPress = (event) => {
    if(event.keyCode === 13){
      fetchWeather(event.target.value)
    }
  }
  
  return (
    <div>
      <Grid spacing={3}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={0}>
            <>
              {locationsState.map((location) => (
                <Location selected={selectedLocation !== null && location.name === selectedLocation.name ? true : false}data={location} onSelect={onClick} onDelete={onDelete}/>
              ))}
            </>
            <Input id="filled-basic" label="Filled" variant="filled" onKeyDown={keyPress} error={searchState}/>
          </Grid>
        </Grid>
      </Grid>
      <>
      {selectedLocation === null ? null : <Weather weatherData={selectedLocation}/>}
      </>
    </div>
  )
}

export default LocationBar
