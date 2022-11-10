import React, { useState, useEffect } from 'react';
import { Loader, Error, WeatherDashboard } from '../components';
import { CForm, CFormInput } from '@coreui/react';
import DateToday from '../utils/time';
import { CiSearch } from "react-icons/ci";
// import { HiOutlineLocationMarker } from "react-icons/hi";

const Weather = (props) => {
    const [weather, setWeather] = useState({ready: false});
    const [city, setCity] = useState(props.defaultCity);
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    let [unit, setUnit] = useState('metric');

    
    const baseUrl = "https://api.openweathermap.org/data/2.5/";
    const apiKey = process.env.REACT_APP_API_KEY;


    const handleResponse = (data) =>{
        setWeather({
            ready: true,
            city: data.name,
            id: data.id,
            coordinates: data.coord,
            country: data.sys.country,
            temperature: data.main.temp,
            maxTemp: data.main.temp_max,
            minTemp: data.main.temp_min,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            weatherMain: data.weather[0].main,
            windSpeed: data.wind.speed,
            windDeg: data.wind.deg,
            windGust: data.wind.gust,
            icon: data.weather[0].icon,
            date: data.dt,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            rain: data.rain?.['1h'],
            snow: data.snow?.['1h'],
        })
    }

    const getWeatherData = async() => {
        setIsLoading(true)
        try{
            const res = await fetch(baseUrl + `weather?q=${city}&appid=${apiKey}&units=metric`)
            if(res.ok){
                const data = await res.json();
                handleResponse(data)
                setIsError(null)
            }
            if(res.status === 404){
              setIsError("Location not found")
            }
        } catch(error){
            setIsError(error.message)
        } finally{
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getWeatherData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeatherData();
    }


  return (
    <div>
        <nav className='nav'>
          <div className="nav__wrapper">
            <div className='nav__logo-wrap'>
                <span className='nav__logo-bold'>Weather</span><span className='nav__logo-thin'>Report.</span>
            </div>

            <div className="date">
              <DateToday/>
            </div>

            <div className="nav__searchbar">
              <CForm onSubmit={handleSubmit}>
                <CFormInput 
                type="text" 
                id="floatingInput" 
                floatingLabel="Search location..." 
                placeholder="E.g Oslo" 
                onChange={(e) => setCity(e.target.value)}
                autoComplete="off"
                />
                <span className='icon-input' onClick={handleSubmit}>
                  <CiSearch title='search' className='icon search-icon'/>
                </span>
              </CForm>
            </div>
          </div>
        </nav>

        <main className='weather container'>
            <div className="weather__error-wrap">
                {isError && <Error message={isError}/>}
            </div>

            <div className="weather-wrap">
                {isLoading ? (
                    <Loader/>
                ): (
                    <>
                      <WeatherDashboard weatherData={weather}/>
                    </>
                )}
            </div>
        </main>



    </div>
  )
}

export default Weather