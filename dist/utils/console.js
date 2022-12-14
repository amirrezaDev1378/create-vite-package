"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_cli_1 = __importDefault(require("colors-cli"));
const { green, red, blue, yellow, cyan } = colors_cli_1.default;
const mods = {
    error: red,
    info: blue,
    success: green,
    debug: yellow,
    warn: cyan
};
const ColorConsole = Object.entries(mods).reduce((acc, [key, value]) => {
    acc[key] = (message) => {
        console.log(value(message));
    };
    return acc;
}, {});
exports.default = ColorConsole;
