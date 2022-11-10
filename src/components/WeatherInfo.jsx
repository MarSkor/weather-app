import React from 'react';
import { CRow, CCol } from '@coreui/react';
import { tempMathRound, DegToDir, convertTimeStamp } from "../utils/functions";
import { WeatherIcon} from "../utils/weatherIcon";
import { BsThermometerHigh,BsThermometerLow, BsSunset, BsSunrise } from "react-icons/bs"
import { WiHumidity } from "react-icons/wi";
import { SiRainmeter, SiSnowflake} from "react-icons/si";


const WeatherInfo = ({weather}) => {
  const regionNames = new Intl.DisplayNames(['en'], {type: 'region'})

  return (
    <>
    <CCol className="dashboard__country-info">
        <CRow>
            <CCol>
                <h2>{weather.city}</h2>
                <h3>{regionNames.of(weather.country)}</h3>
            </CCol>
            <CCol className='dashboard__updated'>
                <h4>Updated: <span className='updated-time'>{convertTimeStamp(weather.date)}</span></h4>
            </CCol>
        </CRow>
    </CCol>

    <CCol className="dashboard__temperature">
        <CRow>
            <CCol>
                <div className="weather-now">
                    <h1>{tempMathRound(weather.temperature)}</h1>
                    <span><WeatherIcon size={90} code={weather.icon} /></span>
                </div>
                <div className='description'>{weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}</div>
            </CCol>
            <CCol className='feels-like-wrap'>
                <div className="feels-like">
                    <h4>Feels like</h4>
                    <p>{tempMathRound(weather.feelsLike)}</p>
                </div>
            </CCol>
        </CRow>
    </CCol>

    <CCol className="dashboard__minandmax weather-info-daily">
        <CRow>
            <CCol>
                <h4>H Temp.</h4>
                <p className='temp'>
                    <BsThermometerHigh size={22} className='temp-icon weather-info-icon'/>
                    {tempMathRound(weather.maxTemp)}
                </p>
            </CCol>

            <CCol>
                <h4>L Temp.</h4>
                <p className='temp'>
                    <BsThermometerLow size={22} className='temp-icon weather-info-icon'/>
                    {tempMathRound(weather.minTemp)}
                </p>
            </CCol>

            <CCol>
                <h4>Precip. (mm)</h4>
                <p>{weather.rain? (
                    <span className='align-icon'><SiRainmeter size={22} className='temp-icon weather-info-icon'/>{weather.rain}</span>
                ): ("0")}</p>
                <p>{weather.snow ? (
                    <>{weather.snow}</>
                ): ("")}</p>
                {/* {weather.main.rain ? (
                    <p>{weather.main.rain.rain['3h']}mm</p>
                ) : (
                <p>0</p>
                )} */}
                {/* {weather.main.snow ? (
                    <p>{weather.main.snow.snow['3h']}mm</p>
                ) : (
                    <p>0</p>
                 )} */}
                               
            </CCol>
        </CRow>
    </CCol>

    <CCol className="dashboard__wind weather-info-daily">
        <CRow>
            <CCol>
                <h4>Wind(Gust)</h4>
                <p>{Math.round(weather.windSpeed)} m/s {DegToDir(weather.windDeg)}  {weather.windGust && `(${Math.round(weather.windGust)})`}</p>
             </CCol>
            <CCol>
                {weather.humidity &&
                    <>
                    <h4>Humidity</h4>
                    <p className='align-items'><WiHumidity className='weather-info-icon' size={26}/>{weather.humidity}</p>
                    </>
                }
            </CCol>
        </CRow>
    </CCol>

    <CCol className="dashboard__wind weather-info-daily">
        <CRow>
            <CCol>
                <h4>Sunrise</h4>
                <p className='align-items'>
                <BsSunrise size={26} className='weather-info-icon sun-icon'/>
                {convertTimeStamp(weather.sunrise)}
                </p>
            </CCol>

            <CCol>
                <h4>Sunset</h4>
                <p className='align-items'>
                <BsSunset size={26} className='weather-info-icon sun-icon'/>
                {convertTimeStamp(weather.sunset)}
                </p>
            </CCol>
        </CRow>
    </CCol>
    </>
  )
}

export default WeatherInfo