import {
  getTimerValues,
  getTimerInit,
  timerSettings,
  setColor,
  setFontStyle,
  updateFontStyle
} from "./settingsModal";

export default (function () {
  getTimerValues();
  getTimerInit();
  timerSettings();
  setColor();
  setFontStyle();
  updateFontStyle();
})();
