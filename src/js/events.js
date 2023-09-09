import { timerControl } from "./timer";
import { timerReset } from "./timer-reset";
import {
  openModal,
  closeModal,
  timerSettings,
  modalElems,
  updateColor,
  getTimerValues,
  updateFontStyle
} from "./settingsModal";
import { switchState } from "./states-handler";

document.addEventListener("click", (e) => {
  const element = e.target;
  element.parentElement.matches("[data-timer-control]") ? timerControl() : null;
  element.parentElement.matches("[data-timer-reset]") ? timerReset() : null;
  element.closest("[data-open-modal]") ? openModal() : null;
  element.closest("[data-close-modal]") ? closeModal() : null;
  element.closest("[data-work-time]") ||
  element.closest("[data-short-break]") ||
  element.closest("[data-long-break]")
    ? switchState(element)
    : null;
});

modalElems.modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getTimerValues();
  timerSettings();
  closeModal();
});

modalElems.modalForm.addEventListener("change", () => {
  getTimerValues();
  timerSettings();
  updateColor();
  updateFontStyle();
});
