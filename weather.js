

let form = document.getElementById('input');
let inputCityName = document.getElementById("inputbox");
let APIkey = '14a64bd41a53747e067e994861bda5c6';



form.addEventListener('submit', (event) => {
    event.preventDefault();
    getCityData();
});

function getCityData() {

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputCityName.value}&limit=5&appid=${APIkey}`)
    .then((response) =>response.json())
    .then((data) => {
        console.log("City-Data:",data)
        getCoordinates(data)
    })
    .catch((error) => console.log(error))
}


function getCoordinates(apiData) {
    let latitude = apiData[0].lat
    let longitude = apiData[0].lon

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`)
    .then((response) => response.json())
    .then((apiData) => {
        console.log("Co-ordinates:",apiData)
        appendData(apiData,inputCityName)
    })
    .catch((error) => console.log(error))
    
}


function appendData(apiData,inputCityName) {
    
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    
    let city = document.getElementById("city-name")
    let date = document.getElementById("date")
    let temperature = document.getElementById("temp")
    let weather = document.getElementById("weather")
    let fullTemp = document.getElementById("fulltemp")
    
    city.innerText = `${inputCityName.value},${apiData.sys.country}`
    temperature.innerText = (apiData.main.temp - 273.15).toFixed(1) + " °C";
    weather.innerText = apiData.weather[0].description;
    date.innerText = formattedDate;
    fullTemp.innerText = `${(apiData.main.temp_min-273.15).toFixed(1)+ " °C"}/${(data.main.temp_max-273.15).toFixed(1)+ " °C"}`

}