import React, {useState, useEffect} from 'react';
import {  WeatherInfo, WeatherNextDays, WeatherNextHours } from '../components';
import { CRow, CCol, CAlert } from '@coreui/react';
import { convertTimeStamp, convertTimeStampToFullDay } from '../utils/functions';

const WeatherDashboard = ({weatherData}) => {
    let [loaded, setLoaded] = useState(false);
    const [alerts, setAlerts] = useState(null)
    const [isError, setIsError] = useState(null);
  
    const baseUrl = "https://api.openweathermap.org/data/2.5/"
    const apiKey = process.env.REACT_APP_API_KEY;
  
    
    useEffect(() => {
      setLoaded(false)
    },[weatherData.coordinates])
  
  
    const getWeather = async() => {
      let lat = weatherData.coordinates.lat;
      let lon = weatherData.coordinates.lon;
  
      try{
        const res = await fetch(baseUrl+`onecall?lat=${lat}&lon=${lon}&exclude=minutely,current,hourly,daily&appid=${apiKey}`)
    
        if(res.ok){
          const data = await res.json(); 
          setAlerts(data.alerts)
        }
      }catch(error){
        setIsError(error)
  
        
      }finally{
        setLoaded(false)
      }
    }
  
    useEffect(() => {
      getWeather()
    },[]) 

  return (
     <CRow  className="weather-container">
        <CCol sm={{ span: true, order: 6 }} md={5} lg={4}>
            <section className='weather__dashboard-left dashboard-card dashboard-img'>
                <WeatherInfo weather={weatherData}/>
            </section>
        </CCol>


        <CCol sm={{ span: true, order: -1 }} md={7} lg={8} >
            <section className='weather__dashboard-right dashboard-card'>
                {weatherData ? (
                    <>
                    <CRow className='weather__row-top weather-row'>                       
                        <CCol >
                            <WeatherNextHours coordinates={weatherData.coordinates}/>
                        </CCol>
                    </CRow>
                    <CRow  className='weather__row-bottom weather-row' >
                        <CCol>
                            <WeatherNextDays coordinates={weatherData.coordinates}/>
                        </CCol>
                    </CRow>
                    </>
                 ) : (
                    <>
                        <h2>No Weather to Display</h2>
                    </>
                 )}
            </section>
        </CCol>
        {alerts && alerts.map((alert, index) => {
            return(
                <CAlert key={index} color="danger" variant="solid" className='alert-wrap'>
                    <h3>{alert.event}</h3>
                    <h4>{alert.description}</h4>
                    <h4>Starts: {convertTimeStampToFullDay(alert.start)}</h4>
                    <h4>Ends: {convertTimeStampToFullDay(alert.end)}</h4>
                    <p>From {alert.sender_name}</p>
                </CAlert>
            )
        })}
     </CRow>

  )
}

export default WeatherDashboard
