const getJSON = (url, cb) =>{
  const xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.responseType = 'json';
  xhr.onerror = () => {console.log("Can't Connect");}
  xhr.onload = () => {
    const status = xhr.status;
    if(status >= 200 && status <= 400)
      cb(xhr.response);
    else
      console.log(status);  
  }
  xhr.send();
};

const getLocation = (ipData) => {
  document.querySelector('.h2--city').innerHTML = ipData.city;
  document.querySelector('.h2--country').innerHTML = ipData.country;
};

const getWeather = (ipData) => {
  getJSON(
    'http://api.openweathermap.org/data/2.5/weather?lat=' +
    ipData.loc.split(',')[0] + '&lon=' + 
    ipData.loc.split(',')[1] + '&units=imperial' + 
    '&appid=174ca7c117e1e592e6796b14b9395aff',
       (wData) => {

    const wImg = {
      "Clouds": ["wi-cloudy", "assets/img/clouds.jpg"],
      "Extreme": ["wi-tornado", "assets/img/tornado.jpg"],
      "Additional": ["wi-na", "assets/img/clearsky.jpg"],
      "Thunderstorm": ["wi-lightning", "assets/img/thunderstorm.jpg"],
      "Drizzle": ["wi-showers", "assets/img/rain.jpg"],
      "Rain": ["wi-rain", "assets/img/rain.jpg"],
      "Snow": ["wi-snow", "assets/img/snow.jpg"],
      "Atmosphere":["wi-fog", "assets/img/fog.jpg"],
      "Clear": ["wi-day-windy", "assets/img/clearsky.jpg"]
    };
    const wVar = wImg[wData.weather[0].main];

    document.querySelector('.h2--temp').innerHTML =
      Math.round(wData.main.temp) + ' °F';
    document.querySelector('body').style.background = 
      `url(${wVar[1]}) no-repeat center center fixed`; 
    document.querySelector('body').style.backgroundSize = "cover";
    document.querySelector('.wi').classList.add(wVar[0]);
  });
};

const convert = () => {
  const button = document.querySelector('.b--convert');
  const temp = document.querySelector('.h2--temp');

  if(button.innerHTML == "Convert to °C"){
    temp.innerHTML = Math.round((temp.innerHTML.split(' ')[0]- 32) * 5 / 9) + " °C";
    button.innerHTML = "Convert to °F";
  }
  else {
    temp.innerHTML = Math.round((temp.innerHTML.split(' ')[0] * 9 / 5) + 32) + " °F";
    button.innerHTML = "Convert to °C";
  }
};



getJSON('http://ipinfo.io/?callback', (ipData) => {
  getLocation(ipData);
  getWeather(ipData);
});

document.querySelector('.b--convert').onclick = () => {
  convert();
};

