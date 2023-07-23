"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomHex = exports.stopTimer = exports.startTimer = exports.stopWatch = exports.startWatch = exports.setDuplicateValues = void 0;
function setDuplicateValues(value, keys, outputObj = {}) {
    keys.forEach((key) => outputObj[key] = value);
    return outputObj;
}
exports.setDuplicateValues = setDuplicateValues;
function startWatch() {
    return new Date().getTime();
}
exports.startWatch = startWatch;
function stopWatch(started, ended = startWatch()) {
    return ended - started + 'ms';
}
exports.stopWatch = stopWatch;
function startTimer(timer) {
    timer.started = startWatch();
    timer.ended = 'in progress';
    timer.elapsed = 'in progress';
}
exports.startTimer = startTimer;
function stopTimer(timer) {
    timer.ended = startWatch();
    timer.elapsed = stopWatch(timer.started, timer.ended);
}
exports.stopTimer = stopTimer;
function randomHex(length, value = '') {
    const hexDigits = '0123456789ABCDEFabcdef';
    for (let i = 0; i < length; i++) {
        value += String(hexDigits[Math.floor(Math.random() * 21)]);
    }
    return value;
}
exports.randomHex = randomHex;
const GoatUtils = {
    setDuplicateValues,
    startWatch, stopWatch,
    randomHex
};
exports.default = GoatUtils;
