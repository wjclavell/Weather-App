//clock
const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');
    const hand = document.querySelector('.hand');

    function setDate () {
      const now = new Date();

      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

      const minutes = now.getMinutes();
      const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
      minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

      const hours = now.getHours();
      const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;
      hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    }
    //setDate function will run every second
    setInterval(setDate, 1000);

    setDate();


//weather app
window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".temperature");
	const temperatureSpan = document.querySelector(".temperature span");
	let windRain = document.querySelector(".wind-rain");

//if location is on then this will run
	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				long = position.coords.longitude;
				lat = position.coords.latitude;

		//darksky api and a proxy server to allow us to use it on our device
				const proxy = "https://cors-anywhere.herokuapp.com/";
				const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

				fetch(api)
		.then(response => {
			return response.json();
		})
		.then(data => {
			//grab this data from the 'currently' array of the api
			const { temperature, summary, icon, precipProbability, windSpeed } = data.currently;
			//set DOM elements from the API
			temperatureDegree.textContent = temperature.toFixed(2);
			windRain.textContent = `💨 Speed: ${windSpeed}mph | Chance of 🌧️: ${Math.floor(precipProbability * 100)}%`;
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
					windRain.textContent = `💨 Speed: ${km.toFixed(2)}km/h | Chance of 🌧️: ${Math.floor(precipProbability * 100)}%`;
				} else {
					temperatureSpan.textContent = "°F";
					temperatureDegree.textContent = temperature.toFixed(2);
					windRain.textContent = `💨 Speed: ${windSpeed}mph | Chance of 🌧️: ${Math.floor(precipProbability * 100)}%`;
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

console.log("????");