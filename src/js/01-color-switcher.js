const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector("body");
let timer = null;

// buttonStop.setAttribute("disabled", "disabled");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

buttonStart.addEventListener("click", () => {
    buttonStart.disabled = true;
    timer = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    buttonStop.disabled = false;
});



buttonStop.addEventListener("click", () => {
    clearInterval(timer);
    buttonStart.disabled = false;
})

