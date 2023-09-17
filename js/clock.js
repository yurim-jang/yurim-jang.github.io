const clock = document.querySelector("h2#clock");
const dDate = document.querySelector("h2#d-day");

function getClock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const newHours = hours % 12;
    
    const formattedHours = newHours.toString().padStart(2, " "); 
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const period = hours < 12 ? "am" : "pm";

    // 날짜 구하기
    
    if (newHours > 0){
        
        clock.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
    }else{
        
        clock.innerText = `12:${formattedMinutes}:${formattedSeconds} ${period}`;
    }
}


setInterval(getClock, 1000);
