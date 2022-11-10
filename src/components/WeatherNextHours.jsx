import React, { useState, useEffect } from 'react';
import { CRow, CCol } from '@coreui/react';
import { WeatherIcon } from '../utils/weatherIcon';
import { Loader, Error } from './index';
import { tempMathRound, convertTimeStamp} from '../utils/functions';

const WeatherNextHours = (props) => {

  let [loaded, setLoaded] = useState(false);
  const [weatherNextHours, setWeatherNextHours] = useState([]);
  const [isError, setIsError] = useState(null);

  const baseUrl = "https://api.openweathermap.org/data/2.5/"
  const apiKey = process.env.REACT_APP_API_KEY;

  
  useEffect(() => {
    setLoaded(false)
  },[props.coordinates])


  const getHourlyWeather = async() => {
    let lat = props.coordinates.lat;
    let lon = props.coordinates.lon;

    try{
      const res = await fetch(baseUrl+`onecall?lat=${lat}&lon=${lon}&exclude=minutely,current,daily&appid=${apiKey}&units=metric`)
  
      if(res.ok){
        const data = await res.json(); 
        setWeatherNextHours(data.hourly)
        // console.log("hourly",data.hourly)
      }
      if(res.status === 404){
        setIsError("Location not found.")
      }
      if(res.status === 401){
        setIsError("An error occured.")
      }
    }catch(error){
      setIsError(error)

      
    }finally{
      setLoaded(false)
    }
  }

  useEffect(() => {
    getHourlyWeather()
  },[]) 

    
    return (
      <>
        <div>
          <h3>The Upcoming Hours</h3>
        </div>
            {isError ? (
              <div className="error-weather">
                <Error message={isError}/>
              </div>
            ): ("")}

          {loaded ? (
            <Loader/>
          ) : (
            
            <CRow xs={{ cols: 2 }} md={{cols: 3}} lg={{cols: 6}} className='next-hours-list' >
              {weatherNextHours.slice(1).map(function(hourlyForecast, index) {
                if(index < 6){
                  return(
                    <CCol className="card-background" key={index}>
                      <div className='card card-wrap'>
                        <div className="card__body">
                          <span className='card__time'>{convertTimeStamp(hourlyForecast.dt)}</span>
                          <span className='card__icon'><WeatherIcon size={40} code={hourlyForecast.weather[0].icon} /></span>
                          <span>
                            <h3>{tempMathRound(hourlyForecast.temp)}</h3>
                          </span>
                        </div>
                      </div>
                    </CCol>
                  );
                } else{ return null}
              })}
             
            </CRow>
          )}
        </>
      
      )
}

export default WeatherNextHours