const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

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
