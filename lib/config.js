"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPLICATION = void 0;
const APPLICATION = {
    PORT: process.env.PORT || 9999,
    f: {
        startTimer: () => new Date().getTime(),
        stopTimer: (start) => {
            if (start)
                return (APPLICATION.f.startTimer() - start) + 'ms';
        }
    }
};
exports.APPLICATION = APPLICATION;
