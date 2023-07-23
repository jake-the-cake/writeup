"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmask = exports.mask = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_1 = __importDefault(require("../config"));
var EncodeMode;
(function (EncodeMode) {
    EncodeMode["e"] = "encrypt";
    EncodeMode["d"] = "decrypt";
})(EncodeMode || (EncodeMode = {}));
class GoatMask {
    constructor(obj, mode, options) {
        this.mode = mode;
        if (typeof obj === 'string')
            return this.handleString(obj);
        if (obj._doc) {
            this.in = obj._doc;
        }
        else
            this.in = obj;
        this.out = {};
        this.options = Object.assign({ ignore: [], booleanPrefix: 'is' }, options);
        this.keys = {
            ignore: [...this.options.ignore],
            convert: [],
            boolean: []
        };
        return this.split();
    }
    handleString(value) {
        this.out = this.convert(value).toString(this.utf());
        return this;
    }
    /** Conversion Method */
    convert(value) {
        return crypto_js_1.default.AES[this.mode](value, config_1.default.constants.secret.crypto);
    }
    /** Return boolean to original form */
    toBoolean() {
        this.keys.boolean.forEach((key) => {
            this.out[key] = (() => {
                switch (this.out[key]) {
                    case 'true': return true;
                    default: return false;
                }
            })();
        });
    }
    /** Check if UTF encoding is needed */
    utf() {
        if (this.mode === EncodeMode.d)
            return crypto_js_1.default.enc.Utf8;
    }
    /** Return Data */
    data() {
        if (this.mode === EncodeMode.d && typeof this.out !== 'string')
            this.toBoolean();
        return this.out;
    }
    /** Private Algorithm Methods */
    split() {
        Object.keys(this.in).forEach((key) => {
            var _a, _b;
            if (key.slice(0, 2).includes('_'))
                (_a = this.keys) === null || _a === void 0 ? void 0 : _a.ignore.push(key);
            else
                (_b = this.keys) === null || _b === void 0 ? void 0 : _b.convert.push(key);
            if (key.slice(0, 2) === this.options.booleanPrefix)
                this.keys.boolean.push(key);
        });
        return this.cycle();
    }
    cycle() {
        this.keys.convert.forEach((key) => {
            this.out[key] = this.convert(String(this.in[key])).toString(this.utf());
        });
        return this.unignore();
    }
    unignore() {
        this.keys.ignore.forEach((key) => {
            this.out[key] = this.in[key];
        });
        return this;
    }
}
/** Exports and Functions */
function doMagic(value, options, mode) {
    if ((options === null || options === void 0 ? void 0 : options.ignore) && typeof options.ignore === 'string')
        options.ignore = [options.ignore];
    return new GoatMask(value, mode, options).data();
}
function mask(value, options) {
    return doMagic(value, options, EncodeMode.e);
}
exports.mask = mask;
function unmask(value, options) {
    return doMagic(value, options, EncodeMode.d);
}
exports.unmask = unmask;
