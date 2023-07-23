"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const client_1 = require("../models/client");
const create = function (model, ...args) {
    let f, options;
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
client_1.ClientModel;
