//const apiProxy = "https://cors-anywhere.herokuapp.com/"
//const apiURL = "http://api.openweathermap.org/data/2.5/weather"
const uwpceWeatherURL = "https://uwpce-weather-proxy.herokuapp.com/data/2.5/weather"
const apiTempUnits = "imperial" // to display temperature in Farenheit
const apiKey = "546f48ff9abf785a7ea081758a757e6d"

let debug = null

// if 'My Weather' button is clicked
function getLatLong(position){
  var crd = position.coords;

  // console.log('Your current position is:');
  // console.log(`Latitude : ${crd.latitude}`);
  // console.log(`Longitude: ${crd.longitude}`);
  // call handleWeather to form the querystring
  handleWeather(crd.latitude, crd.longitude)
}

function handleWeather (latitude, longitude) {
  // latitude, longitude & apikey values
  let values = {lat: latitude, lon: longitude, units: apiTempUnits, appid: apiKey}
  // serialize them into a query string
  let queryString = queryBuilder(values)
  // console.log("query string: " + queryString)

  // call getWeather with the query string
  getWeather(queryString)

}

function getWeather (queryString) {
  let request = new XMLHttpRequest()

  // starts talk to API - 3 params
  // request method, url, (optional) async flag (default true)
  //request.open("GET", apiProxy + apiURL + queryString, true)

  request.open("GET", uwpceWeatherURL + queryString, true)
  // fires when the request is complete
  // update the DOM
  request.onload = function () {
    let response = JSON.parse(request.response)
    console.log(response.body.weather)


    /*let weatherDiv = document.getElementById("weather")
    weatherDiv.innerHTML = " Weather today in : " + response.name + " "
                            + " Description : " + response.weather[0].description
                            + " Temperature (F): "+ response.main.temp
                            + " Minimum Temperature (F) : "+ response.main.temp_min
                            + " Maximum Temperature (F) : "+ response.main.temp_max
     */

    //Div display
    let weatherDiv = document.getElementById("weather")
    weatherDiv.innerHTML = " Weather today in : " + response.body.name
    let iconDiv = document.getElementById("icon")
    let iconURL = "http://openweathermap.org/img/w/" + response.body.weather[0].icon + ".png"
    //console.log("iconURL " + iconURL)
    iconDiv.innerHTML = "<img src='" + iconURL + "'>"
    let descriptionDiv = document.getElementById("description")
    descriptionDiv.innerHTML = response.body.weather[0].description
    let temperatureDiv = document.getElementById("temperature")
    temperatureDiv.innerHTML = " Temperature : " + response.body.main.temp + " F"
    let minTemperatureDiv = document.getElementById("minTemperature")
    minTemperatureDiv.innerHTML = " Minimum Temperature : " + response.body.main.temp_min + " F"
    let maxTemperatureDiv = document.getElementById("maxTemperature")
    maxTemperatureDiv.innerHTML = " Maximum Temperature : " + response.body.main.temp_max + " F"
    let humidityDiv = document.getElementById("humidity")
    humidityDiv.innerHTML = " Humidity : " + response.body.main.humidity + " %"
    let windSpeedDiv = document.getElementById("windSpeed")
    windSpeedDiv.innerHTML = " Wind Speed : " + response.body.wind.speed + " mph"
    /*let windDegree	= response.body.wind.deg;							// wind direction (in degrees)
    let windCompass	= Math.round((windDegree -11.25) / 22.5);	// wind direction (compass value)

    // array of direction (compass) names
    var windNames					= new Array("North","North Northeast","Northeast","East Northeast","East","East Southeast", "Southeast", "South Southeast","South","South Southwest","Southwest","West Southwest","West","West Northwest","Northwest","North Northwest");
    // array of abbreviated (compass) names
    var windShortNames				= new Array("N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW");
    let windDirection	= windNames[windCompass];	// convert degrees and find wind direction name
    console.log("WindDegree " + windDegree + " WindCompass " + windCompass + " WindDirection " + windDirection)
*/

  }

  // fires if something goes wrong
  request.error = function (errorObject) {
    console.log("broken :(")
    console.log(errorObject)
  }

  // send the request!
  request.send()
}

function queryBuilder(queryObj){
  let holder = []
  // loop through queryObj key value pairs
  for(let key in queryObj){
    // turn each one into "key=value"
    let convert = `${encodeURIComponent(key)}=${encodeURIComponent(queryObj[key])}`
    // encodeURIComponent converts spaces and & to URI friendly values so we don't have to worry about them
    holder.push(convert)
  }
  // concatenate the pairs together, with & between
  let longString = holder.join("&")
  // prepend a ? to concatenated string, return
  return `?${longString}`
}
