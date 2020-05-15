const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const currentLocationWeather = document.querySelector("#current-location");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = e.target.elements[0].value.trim();
  messageTwo.textContent = "";
  if (location) {
    messageOne.textContent = "Loading Results";
    fetch(`/weather?address=${location}`)
      .then((res) =>
        res.json().then((data) => {
          console.log(data.location);
          messageOne.textContent = `${data.location}`;
          messageTwo.textContent = `${data.forecast}`;
        })
      )
      .catch((err) => (errorMessage.textContent = err.error));
  } else {
    messageOne.textContent = "Please enter a location";
  }
});
const getPosition = async () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
  } else {
    messageOne.textContent = "Loading results...";
    navigator.geolocation.getCurrentPosition(async (res) => {
      const json = await fetch(
        `/myweather?latitude=${res.coords.latitude}&longitude=${res.coords.longitude}`
      );
      const data = await json.json();
      messageOne.textContent = `${data.location}`;
      messageTwo.textContent = `${data.summary}`;
    });
  }
};
currentLocationWeather.addEventListener("click", () => getPosition());
