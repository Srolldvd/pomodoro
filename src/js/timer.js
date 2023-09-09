import { updateTimer } from "./update-timer";
import { statesHandler } from "./states-handler";
import { setCircleDasharray, resetCircleDasharray } from "./animate-timer";

const timerElem = document.getElementById("pomodoro-timer");
const stateElem = timerElem.previousElementSibling.firstElementChild;
let startTimer;

const APP = {
  minutes: 25,
  seconds: 0,
  timePassed: 0,
  pomodorosCount: 1,
  shortBreakCounts: 0
};

const timer = {
  time: 25,
  getTime: () => {
    return timer.time * 60;
  },
  workTime: stateElem.querySelector("[data-work-time]"),
  shortBreak: stateElem.querySelector("[data-short-break]"),
  longBreak: stateElem.querySelector("[data-long-break]"),
  playBtn: timerElem.querySelector("[data-timer-control]")
};

const countTime = () => {
  if (APP.seconds === 0) {
    APP.seconds = 59 + 1;
    APP.minutes = APP.minutes - 1;
  }
  APP.seconds = APP.seconds - 1;

  updateTimer(timerElem);
  resetCircleDasharray();
  setCircleDasharray();
  statesHandler();
};

const timerControl = () => {
  const playBtn = timer.playBtn;
  const playBtnIcon = playBtn.firstElementChild;

  if (playBtn.dataset.timerControl === "play") {
    startTimer = setInterval(countTime, 1);
    playBtnIcon.classList.remove("fa-play");
    playBtnIcon.classList.add("fa-pause");
    playBtn.dataset.tooltip = "pause";
    playBtn.dataset.timerControl = "pause";
  } else if (playBtn.dataset.timerControl === "pause") {
    clearInterval(startTimer);
    playBtnIcon.classList.remove("fa-pause");
    playBtnIcon.classList.add("fa-play");
    playBtn.dataset.tooltip = "play";
    playBtn.dataset.timerControl = "play";
  }
};

export {
  timerElem,
  timer,
  stateElem,
  startTimer,
  APP,
  countTime,
  timerControl
};
