import { APP, startTimer, timerElem, timer } from "./timer";
import { shortBreak, longBreak } from "./breaks";
import { updateTimer } from "./update-timer";
import { setCircleDasharray, resetCircleDasharray } from "./animate-timer";
import { timerSettings } from "./settingsModal";

const statesHandler = () => {
  if (
    APP.minutes === 0 &&
    APP.seconds === 0 &&
    APP.shortBreakCounts < 3 &&
    !timer.shortBreak.checked &&
    !timer.longBreak.checked //pokud minuty, sekundy = 0 a zaroven kratky pretavky byli min jak 3 a zaroven pokud neni preple radio u kratky a zaroven dlouhy pauzy
  ) {
    shortBreak();
    timerSettings();
  } else if (
    APP.minutes === 0 &&
    APP.seconds === 0 &&
    (timer.shortBreak.checked || timer.longBreak.checked) //pokud minuty, sekundy = 0 a zaroven pokud neni preple radio u kratky nebo dlouhy pauzy
  ) {
    APP.timePassed = 0;
    APP.pomodorosCount++;
    timer.workTime.checked = true;
    timerSettings();
  } else if (
    APP.minutes === 0 &&
    APP.seconds === 0 &&
    APP.shortBreakCounts === 3
  ) {
    longBreak(); //pokud minuty, sekundy = 0 a zaroven pokud byli kratky pauzy vice jak 3x
    timerSettings();
  }
};

const switchState = (element) => {
  if (element.id === "work-time") {
    stateInit();
    timerSettings();
    setCircleDasharray();
    resetCircleDasharray();
    clearInterval(startTimer);
  }
  if (element.id === "short-break") {
    stateInit();
    timerSettings();
    shortBreak();
    updateTimer(timerElem);
    clearInterval(startTimer);
  }
  if (element.id === "long-break") {
    stateInit();
    timerSettings();
    longBreak();
    updateTimer(timerElem);
    clearInterval(startTimer);
  }
};

const stateInit = () => {
  APP.seconds = 0;
  APP.pomodorosCount = 1;
  APP.shortBreakCounts = 0;
  APP.timePassed = 0;
  timer.playBtn.firstElementChild.classList.remove("fa-pause");
  timer.playBtn.firstElementChild.classList.add("fa-play");
  timer.playBtn.dataset.tooltip = "play";
  timer.playBtn.dataset.timerControl = "play";
  timerSettings();
  clearInterval(startTimer);
  updateTimer(timerElem);
  setCircleDasharray();
  resetCircleDasharray();
};

export { statesHandler, switchState, stateInit };
