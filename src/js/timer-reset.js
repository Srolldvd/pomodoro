import { timer } from "./timer";
import { stateInit } from "./states-handler";

export const timerReset = () => {
  timer.workTime.checked = true;
  stateInit();
};
