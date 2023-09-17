const API_KEY = "ff6ca1478c95a2a603cf2ec6f3399078";
const KELVIN_KEY = "273.15";
let now = new Date();
let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

function setIcon(id){
    let iconSrc = '';
  if (200 <= id && id < 300) {
      iconSrc = './img/200.png';
  } else if (300 <= id && id < 400) {
      iconSrc = './img/300.png';
  } else if (500 <= id && id < 600) {
      iconSrc = './img/500.png';
  } else if (600 <= id && id < 700) {
      iconSrc = './img/600.png';
  } else if (700 <= id && id < 800) {
      iconSrc = './img/700.png';
  } else if (id == 800) {
      iconSrc = './img/800.png';
  } else if (id > 800) {
      iconSrc = './img/801.png';
  }
  return iconSrc;
}

function fetchUrl(url, callback){
    fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data));
}

function getElement(selector){
    return document.querySelector(selector);
}

function getElements(selectors){
    return document.querySelectorAll(selectors);
}

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metrics`;
    console.log(lat, lon)


    fetchUrl(currentUrl, (data) => {
        
        getElement(".city").innerText = data.name;
        console.log(data);
        const weather = data.weather[0].main;
        const temp = Math.floor(data.main.temp - KELVIN_KEY);
        getElement(".current-col h5").innerText = `${weather}/${temp}`;
        const weatherId = data.weather[0].id;
        console.log(setIcon(weatherId)); 
        getElement(".current-col img").src = setIcon(weatherId);
    })

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetchUrl(forecastUrl, (info) => {
        console.log(info);
        let todayForecast9am = null;
        let todayForecast12pm = null;
        let todayForecast6pm = null;
        let todayForecast9pm = null; 
    
        for(let i = 0; i < info.list.length; i++){
            let forecast = info.list[i]; 
            let forecastData = new Date(forecast.dt_txt);
            let forecastHour = forecastData.getHours();
            let forecastDate = forecastData.setHours(0,0,0,0);
            let todayDate = today.setHours(0,0,0,0);
    
            if(forecastDate === todayDate){
               
                if(forecastHour >= 9 && forecastHour <= 12 && !todayForecast9am){
                    todayForecast9am = forecast;
                    console.log(`오늘의 9시 근처 예보: ${forecast.dt_txt}, ${Math.floor(forecast.main.temp - KELVIN_KEY)}, ${setIcon(forecast.weather[0].id)}`);
                }else if(forecastHour >= 12 && forecastHour <= 15 && !todayForecast12pm){
                    todayForecast12pm = forecast;
                    console.log(`오늘의 12시 근처 예보: ${forecast.dt_txt}, ${Math.floor(forecast.main.temp - KELVIN_KEY)}, ${setIcon(forecast.weather[0].id)}`);
                }else if(forecastHour > 15 && forecastHour <= 18 && !todayForecast6pm){
                    todayForecast6pm = forecast;
                    console.log(`오늘의 18시 근처 예보: ${forecast.dt_txt}, ${Math.floor(forecast.main.temp - KELVIN_KEY)}, ${setIcon(forecast.weather[0].id)}`);
                }
                
                else if(forecastHour >= 18 && forecastHour <= 21 && !todayForecast9pm){
                    todayForecast9pm = forecast;
                    console.log(`오늘의 21시 근처 예보: ${forecast.dt_txt}, ${Math.floor(forecast.main.temp - KELVIN_KEY)}, ${setIcon(forecast.weather[0].id)}`);
                }
            }
        }
        
        let currentHour = (new Date()).getHours();

      
        let firstForecast, secondForecast;
        if(currentHour >= 15) {
      
        firstForecast = todayForecast6pm || todayForecast9pm;
        secondForecast = todayForecast9pm || null;
        } else {
        
        firstForecast = todayForecast9am || todayForecast12pm;
        secondForecast = todayForecast6pm || todayForecast9pm;
        }

        if(firstForecast) {
            let firstImage = document.querySelector(".today-row .info img:nth-child(1)");
            firstImage.src = setIcon(firstForecast.weather[0].id);
            getElement(".today-row .info .first-info").innerText = `${Math.floor(firstForecast.main.temp - KELVIN_KEY)}`;
        }

        if(secondForecast) {
            let secondImage = document.querySelector(".today-row .info img:nth-child(2)");
            secondImage.src = setIcon(secondForecast.weather[0].id);
            getElement(".today-row .info .second-info").innerText = `${Math.floor(secondForecast.main.temp - KELVIN_KEY)}`;
        }

    });

  
    fetchUrl(forecastUrl, (info) => {
        let tomorrowForecast9am = null;
        let tomorrowForecast6pm = null;

      
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let tomorrowDate = tomorrow.setHours(0,0,0,0);

        for(let i = 0; i < info.list.length; i++){
            let forecast = info.list[i]; 
            let forecastData = new Date(forecast.dt_txt);
            let forecastHour = forecastData.getHours();
            let forecastDate = forecastData.setHours(0,0,0,0);
    
            if(forecastDate === tomorrowDate){
                
                if(forecastHour === 9 && !tomorrowForecast9am){
                    tomorrowForecast9am = forecast;
                } else if(forecastHour === 18 && !tomorrowForecast6pm){
                    tomorrowForecast6pm = forecast;
                }
            }
        }

      
        if(tomorrowForecast9am) {
            console.log(`내일의 9시 예보: ${tomorrowForecast9am.dt_txt}, ${Math.floor(tomorrowForecast9am.main.temp - KELVIN_KEY)}, ${setIcon(tomorrowForecast9am.weather[0].id)}`);

            let firstImage = document.querySelector(".tmr-row .info img:nth-child(1)");
            firstImage.src = setIcon(tomorrowForecast9am.weather[0].id);
            getElement(".tmr-row .info .first-info").innerText = `${Math.floor(tomorrowForecast9am.main.temp - KELVIN_KEY)}`;
        }

    
        if(tomorrowForecast6pm) {
            console.log(`내일의 6시 예보: ${tomorrowForecast6pm.dt_txt}, ${Math.floor(tomorrowForecast6pm.main.temp - KELVIN_KEY)}, ${setIcon(tomorrowForecast6pm.weather[0].id)}`);

            let secondImage = document.querySelector(".tmr-row .info img:nth-child(2)");
            secondImage.src = setIcon(tomorrowForecast6pm.weather[0].id);
            getElement(".tmr-row .info .second-info").innerText = `${Math.floor(tomorrowForecast6pm.main.temp - KELVIN_KEY)}`;
        }
    });
    
    

}

function onGeoError(){
    alert("We can't find you. No weather for you. Sorry");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);


// 출처 제작자: iconixar - Flaticon