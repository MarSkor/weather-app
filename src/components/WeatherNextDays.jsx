import React, {useState, useEffect} from 'react'
import { CRow, CCol } from '@coreui/react';
import { WeatherIcon } from '../utils/weatherIcon';
import { Loader, Error, Alert } from './index';
import { tempMathRound, convertTimeStampToDay, DegToDir} from '../utils/functions';
import { BsThermometerHigh,BsThermometerLow } from "react-icons/bs"
import { SiRainmeter, SiSnowflake} from "react-icons/si";

const WeatherNextDays = (props) => {
  let [loaded, setLoaded] = useState(false);
  const [weatherNextDays, setWeatherNextDays] = useState([]);
  const [alert, setAlert] = useState([]);
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
      const res = await fetch(baseUrl+`onecall?lat=${lat}&lon=${lon}&exclude=minutely,current,hourly&units=metric&appid=${apiKey}`)
  
      if(res.ok){
        const data = await res.json(); 
        setWeatherNextDays(data.daily)
        setAlert(data.alerts)
      //  console.log("weather daily", weatherNextDays) 
      }
      if(res.status === 404){
        setIsError("Location not found.")
      }
    }catch(error){
      setIsError("error")
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
          <h3>The Upcoming Days</h3>
        </div>
          {loaded ? (
            <Loader/>
          ) : (
            
            <CRow xs={{ cols: 2 }} md={{cols: 2}} lg={{cols: 3}} className='next-days-list'>
              
              {weatherNextDays.slice(1).map(function(dailyForecast, index) {
                if(index < 6){
                  return(
                    <CCol key={index} className="daycard-wrap">
                      <div className="daycard">
                        <CRow>
                          <CCol className='daycard__info'>
                            <h3>{convertTimeStampToDay(dailyForecast.dt)}</h3>
                            <h4>{dailyForecast.weather[0].description}</h4>
                          </CCol>
                        </CRow>

                        <CRow>
                          <CCol>
                            <WeatherIcon size={55} code={dailyForecast.weather[0].icon} />
                          </CCol>
                        </CRow>

                        <CRow className='daycard__temperatures'>
                          <CCol className='align-icon center-content'>
                            <BsThermometerHigh size={16} className='temp-icon weather-info-icon color-low-c'/>
                            <p className='temp-high'>{tempMathRound(dailyForecast.temp.max)}</p>
                          </CCol>
                          <CCol className='align-icon center-content'>
                            <BsThermometerLow size={16} className='temp-icon weather-info-icon color-low-c'/>
                            <p className='temp-low'>{tempMathRound(dailyForecast.temp.min)}</p>
                          </CCol>
                          <CCol className='align-icon center-content'>
                            <SiRainmeter size={16} className='temp-icon weather-info-icon color-low-c'/>
                            <p>{dailyForecast.rain ? (
                                  <>{Math.round(dailyForecast.rain)}</>
                              ): ("0")}</p>
                          </CCol>
                          {/* <CCol className='align-icon center-content'>
                            <SiSnowflake size={16} className='temp-icon weather-info-icon temp-low'/>
                            <p>{dailyForecast.snow ? (
                                  <>{Math.round(dailyForecast.snow)}</>
                              ): ("0")}</p>
                          </CCol> */}
                        </CRow>
                      </div>
                    </CCol>
                  );
                } else{ return   <div className="weather__error-wrap">
                {isError && <Error message={isError}/>}
              </div>}
              })}
            </CRow>
          )}
    
          
      </>
      
      )
}

export default WeatherNextDays