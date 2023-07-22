"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const Model_1 = require("../models/Model");
const create = function (model, ...args) {
    let f, options;
    // new Schema({data:'here'})
    console.log(new Model_1.Schema({ data: 'here' }));
    // new Schema({})
    return (req, res, next) => {
        if (args)
            args.forEach((arg) => {
                if (typeof arg === 'function' && !f)
                    f = arg;
                if (typeof arg === 'object' && !options)
                    options = arg;
            });
        console.log(f);
        console.log(options);
    };
};
exports.create = create;
