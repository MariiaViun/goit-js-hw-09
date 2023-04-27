const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector("body");
let timer = null;

buttonStop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

buttonStart.addEventListener("click", () => {
    buttonStart.disabled = true;
    
    timer = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000);

    buttonStart.disabled = true;
    buttonStop.disabled = false;
});


buttonStop.addEventListener("click", () => {
    buttonStart.disabled = false;
    buttonStop.disabled = true;
    clearInterval(timer);
})

