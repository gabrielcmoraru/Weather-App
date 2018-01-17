//Convert unix time to h:m:s
function exactTime(t) {
	var dt = new Date(t*1000);
	var hr = dt.getHours();
	var m = "0" + dt.getMinutes();
	var s = "0" + dt.getSeconds();
		return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);
};

//Create empty variable for endpoint and coordinates
const coordUrl = [];

//Request geolocation
navigator.geolocation.getCurrentPosition(function(position) {
	//Push endpoint and coordinates to variable
	coordUrl.push("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude);
	//Get JSON using the given coordinates
	$.getJSON(coordUrl, function(data){
	console.log(data);
	//Use the JSON data in our website
	document.write("Geographic area: " + data.name + ", " + data.sys.country + "<br>" + "Temperature: " + data.main.temp + "°C" + "<br>" + "Maximum Temperature: " + data.main.temp_max + "<br>" + "Minimum Temperature: " + data.main.temp_min + "<br>" +
	"Humidity: " + data.main.humidity + "<br>" + "Sunrise: " + exactTime(data.sys.sunrise) + "<br>" + "Sunset: " + exactTime(data.sys.sunset) + "<br>" + "Pressure: " + data.main.pressure + "<br>" + "Weather: " + data.weather[0].description + "<br>" + "<img src='" + data.weather[0].icon + "' style:width(50px)>")

	});
});

