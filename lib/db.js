"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const simple_json_db_1 = __importDefault(require("simple-json-db"));
const cb = () => {
    console.log('Connected to DB');
};
function connectDB(loc, serve, callback = cb) {
    return new Promise((resolve, reject) => {
        try {
            resolve({ db: new simple_json_db_1.default(loc), serve, callback });
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.connectDB = connectDB;
