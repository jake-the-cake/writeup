"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const generic_1 = require("./controllers/generic");
const db_1 = require("./db");
const client_1 = require("./models/client");
(0, db_1.connectDB)('./data.json', startApp)
    .then(({ db, serve, callback }) => {
    console.log(db);
    if (db)
        serve();
    callback();
})
    .catch((err) => console.log(err));
function startApp() {
    const app = (0, express_1.default)();
    const port = config_1.APPLICATION.PORT;
    // @ts-ignore
    app.get('/', (0, generic_1.create)(client_1.ClientModel, { data: 'stuff' }, () => { console.log(''); }));
    http_1.default.createServer(app).listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
