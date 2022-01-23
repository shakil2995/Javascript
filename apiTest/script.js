function hideElem() {
    document.getElementById("weather").style.display = "none";
    console.log('hidden called');
    }
    function hideError() {
    document.getElementById("error").style.display = "none";
    console.log('hidden called');
    }

    function showElem() {
    document.getElementById("weather").style.display = "block";
    console.log('error show called');
}
    function showError() {
            document.getElementById("error").style.display = "block";
            // console.log('error show called');
            }

    async function getISS(){
        const issApi_url = 'https://api.wheretheiss.at/v1/satellites/25544'
        const response =await fetch (issApi_url);
        const data = await response.json();
        document.getElementById('lat').textContent=data.latitude;
        document.getElementById('lng').textContent=data.longitude;
        // alert(data.id);
    }
    async function getWeather(status){
        let location=status;
        if(status!="dhaka")
        {
            location = document.getElementById("get_location").value;
        }
        hideError();
        if(!isNaN(location))
        {
            console.log('returning')
            showError()
            return 0; 
        }
        const weatherApi_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=398e310b24f291b753fabdb60b31cc14`
        const response = await fetch (weatherApi_url);
        const data = await response.json();
        try{
            if (!data.name){
                throw new SyntaxError("no data");
            }
            
        }
        catch(err){
            console.log("json error " + err);
            showError()
        }
        let locationIcon = document.querySelector('.weather-icon');
        locationIcon.innerHTML =`<img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png>`;
        document.getElementById('setLocation').textContent=data.name;
        document.getElementById('temp').textContent=Math.round(data.main.temp)+'°C';
        document.getElementById('feelsLike').textContent=Math.round(data.main.feels_like)+'°C';
        document.getElementById('locationName').textContent= data.name;
        document.getElementById('windSpeed').textContent= data.wind.speed+' Km/h';
        document.getElementById('condition').textContent= data.weather[0].main;
        changeBackgroundUsingApiData(data.weather[0].id);
        showElem(weather);
    }
    function changeBackgroundUsingApiData(weatherStatus){

        if (weatherStatus>=200 && weatherStatus<=300){
            document.body.style.backgroundImage = "url('img/storm.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus>=300 && weatherStatus<=400){
            document.body.style.backgroundImage = "url('img/drizzle.png')";
            document.body.style.color = "white"
            }
        // if (weatherStatus>=200 && weatherStatus<200){
        //     document.body.style.backgroundImage = "url('img/rain.jpg')";
        //     // document.body.style.backgroundColor = "#c37d3c"
        //     document.body.style.color = "white"
        //     }
        else if (weatherStatus>=400 && weatherStatus<=500){
            document.body.style.backgroundImage = "url('img/storm.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus>=500 && weatherStatus<=600){
            document.body.style.backgroundImage = "url('img/snow.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus>=600 && weatherStatus<700){
            document.body.style.backgroundImage = "url('img/snow.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus>=700 && weatherStatus<800){
            document.body.style.backgroundImage = "url('img/haze.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus==800){
            document.body.style.backgroundImage = "url('img/clear.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus>800 && weatherStatus<=900){
            document.body.style.backgroundImage = "url('img/clouds.jpg')";
            document.body.style.color = "white"
            }
        else {
            document.body.style.backgroundImage = "url(img/default.jpg)";
            document.body.style.color = "white"
        }

           
    }
    hideElem();
    hideError();
    getWeather("dhaka");
    // if ('serviceWorker' in navigator){
    //     navigator.serviceWorker.register('/service-worker.js');
    // }
        
    