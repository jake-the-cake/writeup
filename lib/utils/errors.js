"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quiggleErr = exports.QuiggleErr = void 0;
class QuiggleErr {
    constructor(location) {
        this.time = new Date();
        this.from = "QuiggleErrSys";
        this.location = location.toLowerCase();
        this.locTitle = this.location[0].toUpperCase() + this.location.slice(1);
        return this;
    }
    required() {
        return this.custom(400, `${this.locTitle} field is required.`);
    }
    format() {
        return this.custom(400, `${this.locTitle} format is invalid.`);
    }
    unique(value) {
        return this.custom(400, `${this.locTitle} '${value}' is already in use.`);
    }
    notfound(params) {
        return this.custom(404, `${params} not found in '${this.location}.'`);
    }
    custom(code, message) {
        this.message = message;
        this.code = code;
        return this;
    }
    isUnique(model, value, loc = this.location) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(function (resolve) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (Array.from(yield model.find({ [loc]: value })).length > 0) {
                        resolve(false);
                    }
                    else
                        resolve(true);
                });
            });
        });
    }
    saveTo(obj) {
        const location = this.location;
        if (obj.api.error === null)
            obj.api.error = {};
        obj.api.code = this.code || 500;
        obj.api.error[location] = {
            time: this.time,
            from: this.from,
            location,
            message: this.message,
        };
    }
}
exports.QuiggleErr = QuiggleErr;
function quiggleErr(location) {
    return new QuiggleErr(location);
}
exports.quiggleErr = quiggleErr;
