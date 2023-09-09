import { APP, timer } from "./timer";
import { setCircleDasharray, resetCircleDasharray } from "./animate-timer";

const shortBreak = () => {
  APP.shortBreakCounts++;
  APP.timePassed = 0;
  timer.shortBreak.checked = true;
  resetCircleDasharray();
  setCircleDasharray();
};

const longBreak = () => {
  APP.shortBreakCounts = 0;
  APP.timePassed = 0;
  timer.longBreak.checked = true;
  resetCircleDasharray();
  setCircleDasharray();
};

export { shortBreak, longBreak };
