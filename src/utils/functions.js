

export function tempMathRound(temp){
    let temperature = Math.round(temp);
    return `${temperature}°C`;
}


//add icons instead
const WindDir = [
    "N", 
    "NNE", 
    "NE", 
    "ENE", 
    "E", 
    "ESE", 
    "SE", 
    "SSE", 
    "S", 
    "SSW", 
    "SW", 
    "WSW", 
    "W", 
    "WNW", 
    "NW", 
    "NNW",
    "N", 
]


export function DegToDir(degree) {
    var val = Math.floor((degree / 22.5) + 0.5);
    return WindDir[(val % 16)];
}


export function convertTimeStamp(dt){
    return new Date(dt * 1000).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' })
}

export function convertTimeStampToDay(dt){
    return new Date(dt * 1000).toLocaleDateString("en-GB",{ weekday: 'short', day:'numeric',})
}

export function convertTimeStampToFullDay(dt){
    return new Date(dt * 1000).toLocaleDateString("en-GB",{ weekday: 'short', day:'numeric',hour: '2-digit', minute: '2-digit'})
}
