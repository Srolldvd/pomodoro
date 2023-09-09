import { APP, timer } from "./timer";

const calculateTimeFraction = () => {
  APP.timePassed++;
  const timeLeft = timer.getTime() - APP.timePassed;
  return timeLeft / timer.getTime();
};

const setCircleDasharray = () => {
  const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
  document
    .getElementById("timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
};

const resetCircleDasharray = () => {
  const resetCircleDasharray = `283 283`;
  document
    .getElementById("timer-path-remaining")
    .setAttribute("stroke-dasharray", resetCircleDasharray);
};

export { setCircleDasharray, resetCircleDasharray };
