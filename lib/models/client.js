"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const Model_1 = require("./Model");
const Client = new Model_1.Schema({
    name: 'string',
    location: 'string',
    email: {
        type: 'string',
        required: true
    }
});
const ClientModel = new Model_1.Model('Client', Client);
exports.ClientModel = ClientModel;
