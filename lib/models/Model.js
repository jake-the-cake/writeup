"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.Model = void 0;
const config_1 = require("../config");
class Model {
    constructor(schema) {
    }
}
exports.Model = Model;
// [key: string]: SchemaProperty
class Schema {
    constructor(schema) {
        this.errors = null;
        bindUtils(this);
        this.checkSchema(schema);
        if (!this.errors)
            this.buildFields(schema);
        this.unbindUtils(this);
        // this.end()
    }
    // end() {
    // }
    buildFields(schema) {
        Object.keys(schema).forEach((schemaKey) => {
            this[schemaKey] = schema[schemaKey];
        });
    }
    checkSchema(schema) {
        this.checkKeys(schema);
    }
    checkKeys(schema) {
        if (!this.hasKeys(schema))
            this.newErr({
                message: 'Cannot use a blank schema.',
                loc: 'checkKeys',
                type: 'ValueErr',
                timestamp: config_1.APPLICATION.f.startTimer()
            });
    }
}
exports.Schema = Schema;
function newErr(info) {
    // @ts-ignore
    if (!this.errors)
        this.errors = [];
    // @ts-ignore
    this.errors.push(info);
}
function hasKeys(obj) {
    try {
        if (Object.keys(obj).length > 0)
            return true;
        else
            return false;
    }
    catch (err) {
        console.error(err.message);
        return false;
    }
}
const UTILS = {
    hasKeys,
    newErr
};
function unbindUtils(obj) {
    // @ts-ignore
    if (!obj)
        obj = this;
    obj.utils.forEach((utilityKey) => {
        delete obj[utilityKey];
    });
    delete obj.utils;
    delete obj.errors;
}
function bindUtils(obj) {
    const utils = Object.assign(Object.assign({}, UTILS), { unbindUtils });
    obj.utils = [];
    Object.keys(utils).forEach((utilityKey) => {
        obj[utilityKey] = UTILS[utilityKey] || unbindUtils;
        obj.utils.push(utilityKey);
    });
}
