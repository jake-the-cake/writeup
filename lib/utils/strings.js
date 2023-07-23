"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goatStringTasks = exports.GoatString = exports.lower = exports.upper = exports.proper = exports.printObjectNeat = void 0;
const utils_1 = require("../testing/utils");
const types_1 = require("../testing/types");
/**
 * Creates an object with a string value to be edited
 * @type {IGoatString}
 * @param {string} [value=""] - The supplied string
 * @property {string} [value=""] - The string that is being edited
 * @property {IOString} proper - Return i.e. 'Abcde...'
 * @property {IOString} upper - Return i.e. 'AAAAA...'
 * @property {IOString} lower - Return i.e. 'aaaaa...'
 * @returns {string} Edited string value
*/
class GoatString {
    constructor(value = "", isTest = false) {
        this.value = '';
        if (isTest === true)
            return this.runTests();
        this.setValue(value);
        return this;
    }
    /**
     * Returns a string with the first letter upper() and the
     * remaining string as lower()
     * @param {string|undefined} value - The string that is being edited
     * @type {IOString} String in, string out function
     * @returns {string} Edited string value
     *
     */
    proper(value) {
        value = this.updateValue(value);
        return this.upper(value[0]) + this.lower(value.slice(1));
    }
    /**
     * Returns an all upper case string
     * @param {string|undefined} value - The string that is being edited
     * @type {IOString} String in, string out function
     * @returns {string} Edited string value
     */
    upper(value) {
        return this.returnString(value, 'toUpperCase');
    }
    /**
     * Returns an all lower case string
     * @param {string|undefined} value - The string that is being edited
     * @type {IOString} String in, string out function
     * @returns {string} Edited string value
     */
    lower(value) {
        return this.returnString(value, 'toLowerCase');
    }
    setValue(value) {
        if (typeof value === 'object')
            return null;
        this.value = String(value);
        return this.value;
    }
    updateValue(value = '') {
        if (value)
            this.setValue(value);
        return this.value;
    }
    returnString(value, method) {
        value = this.updateValue(value);
        return value !== '' ? value[method]() : "";
    }
    runTests() {
        this.tasks = (0, utils_1.populateTests)(GoatString, this);
        return this;
    }
}
exports.GoatString = GoatString;
/*
 * Inits, variables, and functions
 *
 */
const goatString = new GoatString('');
const { proper, upper, lower } = goatString;
exports.proper = proper;
exports.upper = upper;
exports.lower = lower;
const printObjectNeat = (obj) => JSON.stringify(obj, null, 2);
exports.printObjectNeat = printObjectNeat;
/*
 * Exports
 */
exports.default = goatString;
/*
 * Testing
 *
 */
exports.goatStringTasks = {
    classConstructor: [
        {
            params: [types_1.TestValues.value],
            checkProp: 'value',
            expect: types_1.TestValues.value,
            title: 'Make sure class initialiazes value'
        }
    ],
    setValue: [
        {
            params: [types_1.TestValues.value],
            checkProp: 'value',
            expect: types_1.TestValues.value,
            title: 'Set value to supplied string'
        },
        {
            params: [6047],
            checkProp: 'value',
            expect: '6047',
            title: 'Set value of a number to a string'
        },
        {
            params: [{ object: 'with data' }],
            checkProp: 'value',
            expect: null,
            title: 'Set value of an object to a string'
        },
        {
            params: [[1, '2']],
            checkProp: 'value',
            expect: null,
            title: 'Set value of an array to a string'
        },
    ],
    updateValue: [
        {
            params: [types_1.TestValues.updated],
            checkProp: 'value',
            expect: types_1.TestValues.updated,
            title: 'Update value to supplied string'
        },
        {
            params: [types_1.TestValues.blank],
            checkProp: 'value',
            expect: types_1.TestValues.value,
            title: 'Use previous text on blank string'
        }
    ]
};
///////////////
// experimental
const quiggleTest = {
    obj: 'data'
};
