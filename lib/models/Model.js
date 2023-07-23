"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.Model = void 0;
const config_1 = require("../config");
// import { deepStringify } from "../db"
const misc_1 = require("../utils/misc");
class Model {
    constructor(name, schema) {
        this.name = name;
        this.schema = schema;
        this.fields = Object.keys(this.schema);
        this.specialOptions('required', 'unique');
        // console.log(this)
        this.save('stuff');
    }
    specialOptions(...args) {
        if (args)
            args.forEach((propKey) => {
                this[propKey] = this.fields.filter((field) => this.schema[field][propKey] === true);
            });
    }
    save(options) {
        if (options)
            console.log('These options mean nothing to me.');
        // this.JSON = deepStringify(this.schema)
        console.log(this);
    }
}
exports.Model = Model;
class Schema {
    constructor(schema) {
        this.errors = null;
        this.utils = UTILS;
        this.checkSchema(schema);
        if (!this.errors)
            this.buildFields(schema);
        // else this.throwErrors()
        delete this.errors;
        delete this.utils;
        delete this.keys;
    }
    buildFields(schema) {
        this.keys = Object.keys(schema);
        this.keys.forEach((schemaKey) => {
            this[schemaKey] = this.populateFieldProperties(schema[schemaKey]);
        });
        this.populateDefaultProperties();
    }
    populateFieldProperties(prop) {
        if (typeof prop === 'string')
            prop = { type: 'string' };
        return Schema.schemaPropValues.update(prop);
    }
    populateDefaultProperties() {
        Object.keys(Schema.defaultPropValue).forEach((propKey) => {
            this[propKey] = Schema.defaultPropValue[propKey];
        });
    }
    checkSchema(schema) {
        this.checkKeys(schema);
    }
    checkKeys(schema) {
        // @ts-ignore
        if (!this.utils.hasKeys(schema))
            this.utils.newErr({
                message: 'Cannot use a blank schema.',
                loc: 'checkKeys',
                type: 'ValueErr',
                timestamp: config_1.APPLICATION.f.startTimer()
            }, this);
    }
}
exports.Schema = Schema;
Schema.defaultPropValue = {
    id: { type: 'string', required: true, unique: true, default: misc_1.randomHex },
    added: { type: 'number', required: true, unique: true, default: config_1.APPLICATION.f.startTimer },
    edited: { type: 'number', required: true, unique: true, default: null },
    validate: { type: 'function', required: true, unique: true, default: () => console.log('validation') }
};
Schema.schemaPropValues = {
    update: function (prop) {
        prop = Object.assign(Object.assign({}, Schema.schemaPropValues), prop);
        delete prop.update;
        return prop;
    },
    required: false,
    unique: false,
    default: null
};
function newErr(info, obj) {
    // @ts-ignore
    obj = obj || this;
    if (!obj.errors)
        obj.errors = [];
    obj.errors.push(info);
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
