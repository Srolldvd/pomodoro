import { APP } from "./timer";

export const updateTimer = (element) => {
  const secondsElem = element.querySelector("[data-seconds]");
  const minutesElem = element.querySelector("[data-minutes]");
  const pomodoroCountElem = element.nextElementSibling;

  secondsElem.textContent = APP.seconds;
  if (parseInt(secondsElem.textContent, 10) < 10) {
    secondsElem.textContent = `0${APP.seconds}`;
  }
  minutesElem.textContent = APP.minutes;
  pomodoroCountElem.textContent = `#${APP.pomodorosCount}`;
};
