"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const simple_json_db_1 = __importDefault(require("simple-json-db"));
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const generic_1 = require("./controllers/generic");
const DB = new simple_json_db_1.default('./data.json');
if (DB)
    startApp();
function startApp() {
    const app = (0, express_1.default)();
    const port = config_1.APPLICATION.PORT;
    // @ts-ignore
    app.get('/', (0, generic_1.create)({}, { data: 'stuff' }, () => { console.log(''); }));
    http_1.default.createServer(app).listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
