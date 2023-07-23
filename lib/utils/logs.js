"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFail = exports.testPass = exports.devLog = exports.log = void 0;
const config_1 = __importDefault(require("../config"));
const chalk_1 = __importDefault(require("chalk"));
const strings_1 = require("./strings");
/** Use chalk more easily with Typescript and custom methods */
const Chalk = chalk_1.default;
function backToFrontArray(array) {
    array.unshift(array[array.length - 1]);
    array.pop();
    return array;
}
var LoggerMode;
(function (LoggerMode) {
    LoggerMode["info"] = "INFO";
    LoggerMode["err"] = "ERROR";
    LoggerMode["warn"] = "WARNING";
    LoggerMode["test"] = "TEST";
    LoggerMode["log"] = "LOG";
})(LoggerMode || (LoggerMode = {}));
class ServerLog {
    constructor(text = '') {
        this.timestamp = new Date();
        this.mode = LoggerMode.log;
        this.DATA_PREFIX = '[DATA OBJECT] See below...\n';
        this.colors = {
            DATETIME: 'white',
            SEPARATOR: 'black',
            LABELBG: 'bgGreen',
            LABELTEXT: 'white',
            [LoggerMode.info]: { COLOR: 'Blue', LABEL: 'white' },
            [LoggerMode.err]: { COLOR: 'Red', LABEL: 'white' },
            [LoggerMode.warn]: { COLOR: 'Yellow', LABEL: 'black' },
            [LoggerMode.test]: { COLOR: 'White', LABEL: 'black' },
            [LoggerMode.log]: 'reset'
        };
        this.text = text;
    }
    init(mode = null) {
        if (mode)
            this.mode = mode;
        this.timestamp = new Date();
        this.date = this.getDate();
        this.time = this.getTime();
    }
    setLabel() {
        const { LABELBG, LABELTEXT, SEPARATOR } = this.colors;
        const { COLOR, LABEL } = this.colors[this.mode];
        const tag = () => {
            if (this.mode !== LoggerMode.log)
                return (Chalk['bg' + COLOR](' ' + Chalk[LABEL](this.mode) + ' '));
            else
                return ' > ';
        };
        this.label = Chalk[LABELBG](Chalk[LABELTEXT](this.date + Chalk[SEPARATOR]('@') + this.time + tag())) + ' ';
    }
    addLeadingZero(arr) {
        return (() => {
            if (String(arr.item).split('').length === 1 && arr.i !== 0)
                arr.item = '0' + arr.item;
            return String(arr.item);
        })();
    }
    getDate() {
        const { DATETIME, SEPARATOR } = this.colors;
        const dateArray = backToFrontArray(this.timestamp.toLocaleDateString().split('/'));
        dateArray.forEach((item, i) => {
            dateArray[i] = Chalk[DATETIME](this.addLeadingZero({ item, i }));
        });
        return dateArray.join(Chalk[SEPARATOR]('-'));
    }
    getTime() {
        const { DATETIME, SEPARATOR } = this.colors;
        const [time, m] = this.timestamp.toLocaleTimeString().split(' ');
        const timeArray = time.split(':');
        timeArray.forEach((item, i) => {
            timeArray[i] = Chalk[DATETIME](this.addLeadingZero({ item, i }));
        });
        return timeArray.join(Chalk[SEPARATOR](':')) + Chalk[SEPARATOR](m) + ' ';
    }
    checkTextValue(text) {
        if (this.text === '' && text === '')
            this.text = '** blank log **';
        else if (this.text !== '' && text !== '') {
            new ServerLog().info(`** overwritten log value **`);
            this.text = text;
        }
        else
            this.text = this.text || text;
    }
    setThemeOrReset(theme) {
        if (typeof theme === 'string')
            return {
                STRING: 'reset', NONSTRING: 'reset'
            };
        return {
            STRING: theme.COLOR.toLowerCase(), NONSTRING: theme.COLOR.toLowerCase() + 'Bright'
        };
    }
    setDataPrefix({ STRING, NONSTRING }) {
        this.text = Chalk[((t = this.text) => {
            switch (typeof this.text) {
                case 'string': return STRING;
                default:
                    this.text = (0, strings_1.printObjectNeat)(this.text);
                    if (this.text !== 'null')
                        this.text = Chalk[STRING](this.DATA_PREFIX) + this.text;
                    return NONSTRING;
            }
        })()](this.text);
    }
    doTheRest(text, mode) {
        this.init(mode);
        this.checkTextValue(text);
        this.setDataPrefix(this.setThemeOrReset(this.colors[this.mode]));
        this.setLabel();
        return this.createLog();
    }
    info(text = '') { this.doTheRest(text, LoggerMode.info); }
    err(text = '') { this.doTheRest(text, LoggerMode.err); }
    warn(text = '') { this.doTheRest(text, LoggerMode.warn); }
    test(text = '') { this.doTheRest(text, LoggerMode.test); }
    log(text = '') { this.doTheRest(text, LoggerMode.log); }
    createLog() {
        console.log((this.label || '') + this.text);
        this.text = '';
    }
}
/** Exports and Functions */
const log = new ServerLog();
exports.log = log;
function devLog(text, type = 'log') {
    if (config_1.default.constants.mode !== 'DEV')
        return;
    new ServerLog(text)[type]();
}
exports.devLog = devLog;
function testLog(text, color) {
    new ServerLog(Chalk[color](text)).test();
}
function testPass(text) {
    testLog('Pass > ' + text, 'green');
}
exports.testPass = testPass;
function testFail(text) {
    testLog('Fail > ' + text, 'red');
}
exports.testFail = testFail;
