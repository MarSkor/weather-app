import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

export const WeatherIcon = (props) =>{
    const weatherConditions = {
        "01d": "CLEAR_DAY",
        "01n": "CLEAR_NIGHT",
        "02d": "PARTLY_CLOUDY_DAY",
        "02n": "PARTLY_CLOUDY_NIGHT",
        "03d": "CLOUDY",
        "03n": "CLOUDY",
        "04d": "CLOUDY",
        "04n": "CLOUDY",
        "09d": "SLEET",
        "09n": "SLEET",
        "10d": "RAIN",
        "10n": "RAIN",
        "11d": "RAIN",
        "11n": "RAINY",
        "13d": "SNOW",
        "13n": "SNOW",
        "50d": "FOG",
        "50n": "FOG",
    }


    return(
        <ReactAnimatedWeather
        icon={weatherConditions[props.code]}
        color="#cdcdff"
        size={props.size}
        animate={true}
        />
    )
}