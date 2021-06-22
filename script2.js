var loc = document.getElementById("place");
var tempValue = document.getElementById("temp_val");
var tempIcon = document.getElementById("temp_icon");
var climate = document.getElementById("details");
var describe = document.getElementById("describe");
var iconFile;
const search_box = document.getElementById("search_inp");
const search_btn = document.getElementById("search_btn");

search_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    getWeather(search_box.value);
    search_box.value='';
})

const getWeather = async (city)=>{
    try{
        const respond = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eedc98bbd92c1f587d90575d475084f8`,{mode: "cors"});
        const weatherData = await respond.json();
        console.log(weatherData);

        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];

        loc.innerText = name;
        tempValue.textContent = Math.round(feels_like-273);
        climate.innerText = main;
        console.log(id);

        if(id <300 && id>200){
            tempIcon.src="./icons/storm.svg";
        }
        if(id <400 && id>300){
            tempIcon.src="./icons/cloudy.svg";
        }
        if(id <600 && id>500){
            tempIcon.src="./icons/rain1.svg";
        }
        if(id <700 && id>600){
            tempIcon.src="./icons/snowy.svg";
        }
        if(id <800 && id>700){
            tempIcon.src="./icons/cloudy.svg";
        }
        if(id <805 && id >800){
            tempIcon.src = "./icons/haze.svg";
        }
        if(id==800){
            tempIcon.src="./icons/sun1.svg";
        }
    }
    catch{
        console.log('city not found');
    }
}

window.addEventListener("load",()=>{
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=eedc98bbd92c1f587d90575d475084f8`

            fetch(api).then((respond)=>{
                return respond.json();
            }).then(data =>{   
                const {name} = data;
                const {feels_like} = data.main;
                const {id,main,description}= data.weather[0];

                loc.textContent = name;
                tempValue.textContent = Math.round(feels_like-273);
                climate.textContent = main;
                // describe.textContent = description;

                // console.log(data);
                console.log(id);

                if(id <300 && id>200){
                    tempIcon.src="./icons/storm.svg";
                }
                if(id <400 && id>300){
                    tempIcon.src="./icons/cloudy.svg";
                }
                if(id <600 && id>500){
                    tempIcon.src="./icons/rain1.svg";
                }
                if(id <700 && id>600){
                    tempIcon.src="./icons/snowy.svg";
                }
                if(id <800 && id>700){
                    tempIcon.src="./icons/haze.svg";
                }
                if(id <805 && id >800){
                    tempIcon.src = "./icons/haze.svg";
                }
                if(id==800){
                    tempIcon.src="./icons/sun1.svg";
                }
                
            })
        })
    }
})