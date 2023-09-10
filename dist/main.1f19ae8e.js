// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;
function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }
  var id = bundles[bundles.length - 1];
  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }
    throw err;
  }
}
function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}
var bundleLoaders = {};
function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}
module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};
function loadBundle(bundle) {
  var id;
  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }
  if (bundles[bundle]) {
    return bundles[bundle];
  }
  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];
  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }
      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}
function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}
LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};
LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"js/index.js":[function(require,module,exports) {
Promise.all([require("_bundle_loader")(require.resolve("./init")), require("_bundle_loader")(require.resolve("./events"))]).then();
},{"_bundle_loader":"../node_modules/parcel-bundler/src/builtins/bundle-loader.js","./init":[["init.72abecf8.js","js/init.js"],"init.72abecf8.js.map","js/init.js"],"./events":[["events.f2267f34.js","js/events.js"],"events.f2267f34.js.map","js/events.js"]}],"main.js":[function(require,module,exports) {
"use strict";

require("./main.scss");
require("./js/index");
},{"./main.scss":"main.scss","./js/index":"js/index.js"}],"js/update-timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTimer = void 0;
var _timer = require("./timer");
var updateTimer = function updateTimer(element) {
  var secondsElem = element.querySelector("[data-seconds]");
  var minutesElem = element.querySelector("[data-minutes]");
  var pomodoroCountElem = element.nextElementSibling;
  secondsElem.textContent = _timer.APP.seconds;
  if (parseInt(secondsElem.textContent, 10) < 10) {
    secondsElem.textContent = "0".concat(_timer.APP.seconds);
  }
  minutesElem.textContent = _timer.APP.minutes;
  pomodoroCountElem.textContent = "#".concat(_timer.APP.pomodorosCount);
};
exports.updateTimer = updateTimer;
},{"./timer":"js/timer.js"}],"js/animate-timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCircleDasharray = exports.resetCircleDasharray = void 0;
var _timer = require("./timer");
var calculateTimeFraction = function calculateTimeFraction() {
  _timer.APP.timePassed++;
  var timeLeft = _timer.timer.getTime() - _timer.APP.timePassed;
  return timeLeft / _timer.timer.getTime();
};
var setCircleDasharray = function setCircleDasharray() {
  var circleDasharray = "".concat((calculateTimeFraction() * 283).toFixed(0), " 283");
  document.getElementById("timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
};
exports.setCircleDasharray = setCircleDasharray;
var resetCircleDasharray = function resetCircleDasharray() {
  var resetCircleDasharray = "283 283";
  document.getElementById("timer-path-remaining").setAttribute("stroke-dasharray", resetCircleDasharray);
};
exports.resetCircleDasharray = resetCircleDasharray;
},{"./timer":"js/timer.js"}],"js/breaks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortBreak = exports.longBreak = void 0;
var _timer = require("./timer");
var _animateTimer = require("./animate-timer");
var shortBreak = function shortBreak() {
  _timer.APP.shortBreakCounts++;
  _timer.APP.timePassed = 0;
  _timer.timer.shortBreak.checked = true;
  (0, _animateTimer.resetCircleDasharray)();
  (0, _animateTimer.setCircleDasharray)();
};
exports.shortBreak = shortBreak;
var longBreak = function longBreak() {
  _timer.APP.shortBreakCounts = 0;
  _timer.APP.timePassed = 0;
  _timer.timer.longBreak.checked = true;
  (0, _animateTimer.resetCircleDasharray)();
  (0, _animateTimer.setCircleDasharray)();
};
exports.longBreak = longBreak;
},{"./timer":"js/timer.js","./animate-timer":"js/animate-timer.js"}],"js/settingsModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFontStyle = exports.updateColor = exports.timerSettings = exports.setFontStyle = exports.setColor = exports.openModal = exports.modalElems = exports.modal = exports.getTimerValues = exports.getTimerInit = exports.closeModal = void 0;
var _timer = require("./timer");
var _updateTimer = require("./update-timer");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var modal = document.querySelector("[data-modal-settings]");
exports.modal = modal;
var root = document.querySelector(":root");
var modalElems = {
  modalForm: modal.querySelector("[data-settings]"),
  primaryColorPicker: modal.querySelector("[data-pomodoro-primary-color]"),
  secondaryColorPicker: modal.querySelector("[data-pomodoro-secondary-color]"),
  fontColorPicker: modal.querySelector("[data-pomodoro-font-color]"),
  timerValues: modal.querySelectorAll("[data-set-time]"),
  fontStyles: modal.querySelectorAll("[data-set-font]")
};
exports.modalElems = modalElems;
var _ref = {},
  timerStoredValues = _ref.timerStoredValues,
  timerInit = _ref.timerInit;
var getDataFromLS = function getDataFromLS() {
  return timerInit = JSON.parse(localStorage.getItem("timerValues"));
};
var getTimerInit = function getTimerInit() {
  if (localStorage.getItem("timerValues") !== null) {
    getDataFromLS();
    modalElems.timerValues.forEach(function (timerValue) {
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
exports.getTimerInit = getTimerInit;
var getTimerValues = function getTimerValues() {
  modalElems.timerValues.forEach(function (timerValue) {
    if (timerValue.dataset.setTime === "pomodoro") {
      timerStoredValues = _objectSpread(_objectSpread({}, timerStoredValues), {}, {
        workTime: timerValue.value
      });
    } else if (timerValue.dataset.setTime === "short-break") {
      timerStoredValues = _objectSpread(_objectSpread({}, timerStoredValues), {}, {
        shortBreak: timerValue.value
      });
    } else if (timerValue.dataset.setTime === "long-break") {
      timerStoredValues = _objectSpread(_objectSpread({}, timerStoredValues), {}, {
        longBreak: timerValue.value
      });
    }
  });
};
exports.getTimerValues = getTimerValues;
var timerSettings = function timerSettings() {
  getDataFromLS();
  if (!timerInit) {
    timerInit = {
      workTime: 25,
      shortBreak: 5,
      longBreak: 15
    };
  }
  modalElems.timerValues.forEach(function (timerValue) {
    if (_timer.timer.workTime.checked && timerValue.dataset.setTime === "pomodoro") {
      _timer.APP.minutes = timerInit.workTime;
      _timer.timer.time = timerInit.workTime;
      (0, _updateTimer.updateTimer)(_timer.timerElem);
    } else if (_timer.timer.shortBreak.checked && timerValue.dataset.setTime === "short-break") {
      _timer.APP.minutes = timerInit.shortBreak;
      _timer.timer.time = timerInit.shortBreak;
      (0, _updateTimer.updateTimer)(_timer.timerElem);
    } else if (_timer.timer.longBreak.checked && timerValue.dataset.setTime === "long-break") {
      _timer.APP.minutes = timerInit.longBreak;
      _timer.timer.time = timerInit.longBreak;
      (0, _updateTimer.updateTimer)(_timer.timerElem);
    }
  });
};
exports.timerSettings = timerSettings;
var openModal = function openModal() {
  modal.showModal();
};
exports.openModal = openModal;
var closeModal = function closeModal() {
  modal.close();
};
exports.closeModal = closeModal;
var setColor = function setColor() {
  getDataFromLS();
  if (timerInit !== null) {
    modalElems.primaryColorPicker.value = timerInit.primaryColor;
    modalElems.secondaryColorPicker.value = timerInit.secondaryColor;
    modalElems.fontColorPicker.value = timerInit.fontColor;
    root.style.setProperty("--pomodoro-primary-clr", timerInit.primaryColor);
    root.style.setProperty("--pomodoro-secondary-clr", timerInit.secondaryColor);
    root.style.setProperty("--pomodoro-primary-font-clr", timerInit.fontColor);
  }
  timerStoredValues = _objectSpread(_objectSpread({}, timerStoredValues), {}, {
    primaryColor: modalElems.primaryColorPicker.value,
    secondaryColor: modalElems.secondaryColorPicker.value,
    fontColor: modalElems.fontColorPicker.value
  });
};
exports.setColor = setColor;
var updateColor = function updateColor() {
  root.style.setProperty("--pomodoro-primary-clr", modalElems.primaryColorPicker.value);
  root.style.setProperty("--pomodoro-secondary-clr", modalElems.secondaryColorPicker.value);
  root.style.setProperty("--pomodoro-primary-font-clr", modalElems.fontColorPicker.value);
  timerStoredValues = _objectSpread(_objectSpread({}, timerStoredValues), {}, {
    primaryColor: modalElems.primaryColorPicker.value,
    secondaryColor: modalElems.secondaryColorPicker.value,
    fontColor: modalElems.fontColorPicker.value
  });
  localStorage.setItem("timerValues", JSON.stringify(timerStoredValues));
};
exports.updateColor = updateColor;
var setFontStyle = function setFontStyle() {
  getDataFromLS();
  if (!timerInit) return;
  modalElems.fontStyles.forEach(function (fontStyle) {
    if (fontStyle.dataset.setFont === timerInit.font) {
      fontStyle.checked = true;
    }
  });
};
exports.setFontStyle = setFontStyle;
var updateFontStyle = function updateFontStyle() {
  getDataFromLS();
  if (localStorage.getItem("timerValues") !== null) {
    modalElems.fontStyles.forEach(function (fontStyle) {
      if (fontStyle.checked) {
        timerStoredValues = _objectSpread(_objectSpread({}, timerStoredValues), {}, {
          font: fontStyle.dataset.setFont
        });
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
      } else if (fontStyle.dataset.setFont === "cursive-bold" && fontStyle.checked) {
        root.style.setProperty("--pomodoro-font-style", "italic");
        root.style.setProperty("--pomodoro-font-weight", "bold");
      }
    });
  }
};

// refactor export / import
exports.updateFontStyle = updateFontStyle;
},{"./timer":"js/timer.js","./update-timer":"js/update-timer.js"}],"js/states-handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchState = exports.statesHandler = exports.stateInit = void 0;
var _timer = require("./timer");
var _breaks = require("./breaks");
var _updateTimer = require("./update-timer");
var _animateTimer = require("./animate-timer");
var _settingsModal = require("./settingsModal");
var statesHandler = function statesHandler() {
  if (_timer.APP.minutes === 0 && _timer.APP.seconds === 0 && _timer.APP.shortBreakCounts < 3 && !_timer.timer.shortBreak.checked && !_timer.timer.longBreak.checked //pokud minuty, sekundy = 0 a zaroven kratky pretavky byli min jak 3 a zaroven pokud neni preple radio u kratky a zaroven dlouhy pauzy
  ) {
    (0, _breaks.shortBreak)();
    (0, _settingsModal.timerSettings)();
  } else if (_timer.APP.minutes === 0 && _timer.APP.seconds === 0 && (_timer.timer.shortBreak.checked || _timer.timer.longBreak.checked) //pokud minuty, sekundy = 0 a zaroven pokud neni preple radio u kratky nebo dlouhy pauzy
  ) {
    _timer.APP.timePassed = 0;
    _timer.APP.pomodorosCount++;
    _timer.timer.workTime.checked = true;
    (0, _settingsModal.timerSettings)();
  } else if (_timer.APP.minutes === 0 && _timer.APP.seconds === 0 && _timer.APP.shortBreakCounts === 3) {
    (0, _breaks.longBreak)(); //pokud minuty, sekundy = 0 a zaroven pokud byli kratky pauzy vice jak 3x
    (0, _settingsModal.timerSettings)();
  }
};
exports.statesHandler = statesHandler;
var switchState = function switchState(element) {
  if (element.id === "work-time") {
    stateInit();
    (0, _settingsModal.timerSettings)();
    (0, _animateTimer.setCircleDasharray)();
    (0, _animateTimer.resetCircleDasharray)();
    clearInterval(_timer.startTimer);
  }
  if (element.id === "short-break") {
    stateInit();
    (0, _settingsModal.timerSettings)();
    (0, _breaks.shortBreak)();
    (0, _updateTimer.updateTimer)(_timer.timerElem);
    clearInterval(_timer.startTimer);
  }
  if (element.id === "long-break") {
    stateInit();
    (0, _settingsModal.timerSettings)();
    (0, _breaks.longBreak)();
    (0, _updateTimer.updateTimer)(_timer.timerElem);
    clearInterval(_timer.startTimer);
  }
};
exports.switchState = switchState;
var stateInit = function stateInit() {
  _timer.APP.seconds = 0;
  _timer.APP.pomodorosCount = 1;
  _timer.APP.shortBreakCounts = 0;
  _timer.APP.timePassed = 0;
  _timer.timer.playBtn.firstElementChild.classList.remove("fa-pause");
  _timer.timer.playBtn.firstElementChild.classList.add("fa-play");
  _timer.timer.playBtn.dataset.tooltip = "play";
  _timer.timer.playBtn.dataset.timerControl = "play";
  (0, _settingsModal.timerSettings)();
  clearInterval(_timer.startTimer);
  (0, _updateTimer.updateTimer)(_timer.timerElem);
  (0, _animateTimer.setCircleDasharray)();
  (0, _animateTimer.resetCircleDasharray)();
};
exports.stateInit = stateInit;
},{"./timer":"js/timer.js","./breaks":"js/breaks.js","./update-timer":"js/update-timer.js","./animate-timer":"js/animate-timer.js","./settingsModal":"js/settingsModal.js"}],"js/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timerElem = exports.timerControl = exports.timer = exports.stateElem = exports.startTimer = exports.countTime = exports.APP = void 0;
var _updateTimer = require("./update-timer");
var _statesHandler = require("./states-handler");
var _animateTimer = require("./animate-timer");
var timerElem = document.getElementById("pomodoro-timer");
exports.timerElem = timerElem;
var stateElem = timerElem.previousElementSibling.firstElementChild;
exports.stateElem = stateElem;
var startTimer;
exports.startTimer = startTimer;
var APP = {
  minutes: 25,
  seconds: 0,
  timePassed: 0,
  pomodorosCount: 1,
  shortBreakCounts: 0
};
exports.APP = APP;
var timer = {
  time: 25,
  getTime: function getTime() {
    return timer.time * 60;
  },
  workTime: stateElem.querySelector("[data-work-time]"),
  shortBreak: stateElem.querySelector("[data-short-break]"),
  longBreak: stateElem.querySelector("[data-long-break]"),
  playBtn: timerElem.querySelector("[data-timer-control]")
};
exports.timer = timer;
var countTime = function countTime() {
  if (APP.seconds === 0) {
    APP.seconds = 59 + 1;
    APP.minutes = APP.minutes - 1;
  }
  APP.seconds = APP.seconds - 1;
  (0, _updateTimer.updateTimer)(timerElem);
  (0, _animateTimer.resetCircleDasharray)();
  (0, _animateTimer.setCircleDasharray)();
  (0, _statesHandler.statesHandler)();
};
exports.countTime = countTime;
var timerControl = function timerControl() {
  var playBtn = timer.playBtn;
  var playBtnIcon = playBtn.firstElementChild;
  if (playBtn.dataset.timerControl === "play") {
    exports.startTimer = startTimer = setInterval(countTime, 1);
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
exports.timerControl = timerControl;
},{"./update-timer":"js/update-timer.js","./states-handler":"js/states-handler.js","./animate-timer":"js/animate-timer.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61588" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}],"../node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;
    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };
    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("js",require("../node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js"));
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0,"main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map