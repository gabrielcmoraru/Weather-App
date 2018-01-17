//Convert unix time to h:m:s
function exactTime(t) {
	const dt = new Date(t*1000);
	const hr = dt.getHours();
	const m = "0" + dt.getMinutes();
	const s = "0" + dt.getSeconds();
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

	//Use the JSON data in our website
	$(document).ready(function() {
		$('.card-img-top').attr({
			'src': data.weather[0].icon,
			'alt': data.weather[0].main
		});
		$('.card-title').html("<strong>" + data.name + ", " + data.sys.country + "</strong>");
		$('.card-text').html("<strong>" + data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1) + "</strong>");

		//Default display temperature in celsius
		$('.temperature').html(Math.round(data.main.temp) + "°" + "C");
		$('.temperature-min').html("Min: " + data.main.temp_min + "°" + "C");
		$('.temperature-max').html("Max: " + data.main.temp_max + "°" + "C");

		//Change to farenheit action on click, activate button and deactivate the celsius
		$('#farenheit').on('click', function(event) {
			//Convert celsius to farenheit & Round up the temperature in farenheit
			$('.temperature').html(Math.round(data.main.temp * 9/5 + 32) + "°" + "F");
			$('.temperature-min').html("Min: " + Math.round(data.main.temp_min  * 9/5 + 32) + "°" + "F");
			$('.temperature-max').html("Max: " + Math.round(data.main.temp_max  * 9/5 + 32) + "°" + "F");
			$('#farenheit').addClass('active') && $('#celsius').removeClass('active')
			;});

		//Change to celsius action on click, activate button and deactivate the farenheit
		$('#celsius').on('click', function(event) {
			$('.temperature').html(Math.round(data.main.temp) + "°" + "C");
			$('.temperature-min').html("Min: " + data.main.temp_min + "°" + "C");
			$('.temperature-max').html("Max: " + data.main.temp_max + "°" + "C");
			$('#celsius').addClass('active') && $('#farenheit').removeClass('active');
			});
		//Show atmospheric pressure
		$('.pressure').html("Pressure: " + data.main.pressure + " mb/hPa");

		//Show wind speed
		$('.wind').html("Wind: " + data.wind.speed + " mph");

		//Show time of sunrise
		$('.sunrise').html("Sunrise: " + exactTime(data.sys.sunrise));

		//Show time of sunset
		$('.sunset').html("Sunset: " + exactTime(data.sys.sunset));
	});
	});

});
