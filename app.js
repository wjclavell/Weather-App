window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".temperature");
	const temperatureSpan = document.querySelector(".temperature span");
	let windRain = document.querySelector(".wind-rain");

	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				long = position.coords.longitude;
				lat = position.coords.latitude;

				const proxy = "https://cors-anywhere.herokuapp.com/";
				const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

				fetch(api)
		.then(response => {
			return response.json();
		})
		.then(data => {
			const { temperature, summary, icon, precipProbability, windSpeed } = data.currently;
			//set DOM elements from the API
			temperatureDegree.textContent = temperature.toFixed(2);
			windRain.textContent = `Wind Speed: ${windSpeed}mph | Chance of Rain: ${Math.floor(precipProbability * 100)}%`;
			temperatureDescription.textContent = summary;
			locationTimezone.textContent = data.timezone.replace(/_/g, " ");
			//formula for degrees F to C
			let celsius = (temperature -32) * (5 / 9);
			let km = windSpeed * 1.60934;
			//set icon
			setIcons(icon, document.querySelector(".icon"));

			//change temp to celsius/frenheit
			temperatureSection.addEventListener('click', () => {
				if(temperatureSpan.textContent === "°F") {
					temperatureSpan.textContent = "°C";
					temperatureDegree.textContent = celsius.toFixed(2);
					windRain.textContent = `Wind Speed: ${km.toFixed(2)}km/h | Chance of Rain: ${Math.floor(precipProbability * 100)}%`;
				} else {
					temperatureSpan.textContent = "°F";
					temperatureDegree.textContent = temperature.toFixed(2);
					windRain.textContent = `Wind Speed: ${windSpeed}mph | Chance of Rain: ${Math.floor(precipProbability * 100)}%`;
				}
			})
		});
	});

}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});

