"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectTag = exports.fieldTag = exports.modelTag = void 0;
const chalk_1 = __importDefault(require("chalk"));
const strings_1 = require("./strings");
const Chalk = chalk_1.default;
function objectTag(text, type, color) {
    var _a, _b, _c, _d;
    if (color)
        Object.keys(color).forEach((key) => color[key] = (0, strings_1.lower)(color[key]));
    return Chalk[(color === null || color === void 0 ? void 0 : color.bg) ? 'bg' + (0, strings_1.proper)(color.bg) : 'bgCyan'](Chalk[(_a = color === null || color === void 0 ? void 0 : color.arrow) !== null && _a !== void 0 ? _a : 'black']('<')
        + Chalk[(_b = color === null || color === void 0 ? void 0 : color.label) !== null && _b !== void 0 ? _b : 'magenta'](type)
        + Chalk[(_c = color === null || color === void 0 ? void 0 : color.arrow) !== null && _c !== void 0 ? _c : 'black']('>')
        + Chalk[(_d = color === null || color === void 0 ? void 0 : color.name) !== null && _d !== void 0 ? _d : 'white']('\'' + text + '\''));
}
exports.objectTag = objectTag;
function modelTag(text) {
    return objectTag(text, 'MODEL');
}
exports.modelTag = modelTag;
function fieldTag(text) {
    return objectTag(text, 'FIELD', { bg: 'green' });
}
exports.fieldTag = fieldTag;
