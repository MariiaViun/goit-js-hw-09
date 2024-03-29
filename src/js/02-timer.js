import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button");
const day = document.querySelector("span[data-days]");
const hours = document.querySelector("span[data-hours]");
const minets = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");
// console.log(day);
let formatDate = null;
let timerId = null;
let timeDifference = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
};

btnStart.disabled = true;
flatpickr(input, options);
btnStart.addEventListener('click', onclick);

function onclick() {
  timerId = setInterval(startTimer, 1000);
}

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStart.disabled = true;
    return Notiflix.Notify.failure('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  btnStart.removeAttribute('disabled');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

    // Remaining days
function pad(value) {
    return String(value).padStart(2, '0');
}

const days = pad(Math.floor(ms / day));

  // Remaining hours
const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

return { days, hours, minutes, seconds };
}

function startTimer() {
  btnStart.disabled = true;
  input.setAttribute('disabled', true);

  timeDifference -= 1000;

  if (timeDifference <= 0) {
    Notiflix.Notify.success('Time end');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}

function renderDate(formatDate) {
  seconds.textContent = formatDate.seconds;
  minets.textContent = formatDate.minutes;
  hours.textContent = formatDate.hours;
  day.textContent = formatDate.days;
}