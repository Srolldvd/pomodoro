import { APP, timer, timerElem } from "./timer";
import { updateTimer } from "./update-timer";

const modal = document.querySelector("[data-modal-settings]");
const root = document.querySelector(":root");

const modalElems = {
  modalForm: modal.querySelector("[data-settings]"),
  primaryColorPicker: modal.querySelector("[data-pomodoro-primary-color]"),
  secondaryColorPicker: modal.querySelector("[data-pomodoro-secondary-color]"),
  fontColorPicker: modal.querySelector("[data-pomodoro-font-color]"),
  timerValues: modal.querySelectorAll("[data-set-time]"),
  fontStyles: modal.querySelectorAll("[data-set-font]")
};

let { timerStoredValues, timerInit } = {};

const getDataFromLS = () => {
  return (timerInit = JSON.parse(localStorage.getItem("timerValues")));
};

const getTimerInit = () => {
  if (localStorage.getItem("timerValues") !== null) {
    getDataFromLS();

    modalElems.timerValues.forEach((timerValue) => {
      if (timerValue.dataset.setTime === "pomodoro") {
        timerValue.value = timerInit.workTime;
      } else if (timerValue.dataset.setTime === "short-break") {
        timerValue.value = timerInit.shortBreak;
      } else if (timerValue.dataset.setTime === "long-break") {
        timerValue.value = timerInit.longBreak;
      }
    });
  }
};

const getTimerValues = () => {
  modalElems.timerValues.forEach((timerValue) => {
    if (timerValue.dataset.setTime === "pomodoro") {
      timerStoredValues = {
        ...timerStoredValues,
        workTime: timerValue.value
      };
    } else if (timerValue.dataset.setTime === "short-break") {
      timerStoredValues = {
        ...timerStoredValues,
        shortBreak: timerValue.value
      };
    } else if (timerValue.dataset.setTime === "long-break") {
      timerStoredValues = {
        ...timerStoredValues,
        longBreak: timerValue.value
      };
    }
  });
};

const timerSettings = () => {
  getDataFromLS();
  if (!timerInit) {
    timerInit = {
      workTime: 25,
      shortBreak: 5,
      longBreak: 15
    };
  }

  modalElems.timerValues.forEach((timerValue) => {
    if (timer.workTime.checked && timerValue.dataset.setTime === "pomodoro") {
      APP.minutes = timerInit.workTime;
      timer.time = timerInit.workTime;
      updateTimer(timerElem);
    } else if (
      timer.shortBreak.checked &&
      timerValue.dataset.setTime === "short-break"
    ) {
      APP.minutes = timerInit.shortBreak;
      timer.time = timerInit.shortBreak;
      updateTimer(timerElem);
    } else if (
      timer.longBreak.checked &&
      timerValue.dataset.setTime === "long-break"
    ) {
      APP.minutes = timerInit.longBreak;
      timer.time = timerInit.longBreak;
      updateTimer(timerElem);
    }
  });
};

const openModal = () => {
  modal.showModal();
};

const closeModal = () => {
  modal.close();
};

const setColor = () => {
  getDataFromLS();

  if (timerInit !== null) {
    modalElems.primaryColorPicker.value = timerInit.primaryColor;
    modalElems.secondaryColorPicker.value = timerInit.secondaryColor;
    modalElems.fontColorPicker.value = timerInit.fontColor;

    root.style.setProperty("--pomodoro-primary-clr", timerInit.primaryColor);

    root.style.setProperty(
      "--pomodoro-secondary-clr",
      timerInit.secondaryColor
    );

    root.style.setProperty("--pomodoro-primary-font-clr", timerInit.fontColor);
  }

  timerStoredValues = {
    ...timerStoredValues,
    primaryColor: modalElems.primaryColorPicker.value,
    secondaryColor: modalElems.secondaryColorPicker.value,
    fontColor: modalElems.fontColorPicker.value
  };
};

const updateColor = () => {
  root.style.setProperty(
    "--pomodoro-primary-clr",
    modalElems.primaryColorPicker.value
  );

  root.style.setProperty(
    "--pomodoro-secondary-clr",
    modalElems.secondaryColorPicker.value
  );

  root.style.setProperty(
    "--pomodoro-primary-font-clr",
    modalElems.fontColorPicker.value
  );

  timerStoredValues = {
    ...timerStoredValues,
    primaryColor: modalElems.primaryColorPicker.value,
    secondaryColor: modalElems.secondaryColorPicker.value,
    fontColor: modalElems.fontColorPicker.value
  };

  localStorage.setItem("timerValues", JSON.stringify(timerStoredValues));
};

const setFontStyle = () => {
  getDataFromLS();
  if (!timerInit) return;

  modalElems.fontStyles.forEach((fontStyle) => {
    if (fontStyle.dataset.setFont === timerInit.font) {
      fontStyle.checked = true;
    }
  });
};

const updateFontStyle = () => {
  getDataFromLS();

  if (localStorage.getItem("timerValues") !== null) {
    modalElems.fontStyles.forEach((fontStyle) => {
      if (fontStyle.checked) {
        timerStoredValues = {
          ...timerStoredValues,
          font: fontStyle.dataset.setFont
        };
        localStorage.setItem("timerValues", JSON.stringify(timerStoredValues));
      }

      if (fontStyle.dataset.setFont === "normal" && fontStyle.checked) {
        root.style.setProperty("--pomodoro-font-style", "normal");
        root.style.setProperty("--pomodoro-font-weight", "normal");
      } else if (fontStyle.dataset.setFont === "cursive" && fontStyle.checked) {
        root.style.setProperty("--pomodoro-font-style", "italic");
        root.style.setProperty("--pomodoro-font-weight", "normal");
      } else if (fontStyle.dataset.setFont === "bold" && fontStyle.checked) {
        root.style.setProperty("--pomodoro-font-style", "normal");
        root.style.setProperty("--pomodoro-font-weight", "bold");
      } else if (
        fontStyle.dataset.setFont === "cursive-bold" &&
        fontStyle.checked
      ) {
        root.style.setProperty("--pomodoro-font-style", "italic");
        root.style.setProperty("--pomodoro-font-weight", "bold");
      }
    });
  }
};

export {
  modal,
  modalElems,
  openModal,
  closeModal,
  getTimerInit,
  timerSettings,
  setColor,
  updateColor,
  getTimerValues,
  setFontStyle,
  updateFontStyle
};

// refactor export / import
