#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = __importDefault(require("./utils/prompt"));
const console_1 = __importDefault(require("./utils/console"));
const createProject_1 = __importDefault(require("./utils/createProject"));
const package_1 = __importDefault(require("./templates/package"));
const path_1 = __importDefault(require("path"));
console_1.default.info("creating a vite package!");
console.log("\n\n");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { type, name, withProject } = yield (0, prompt_1.default)();
    console.log(JSON.stringify({ type, name, withProject }, null, 2));
    const packagePath = path_1.default.join(process.cwd(), name);
    (0, createProject_1.default)({
        packageName: name,
        packagePath
    }, [`mkdir "${name}"`, `mkdir "${name}/src/lib"`], package_1.default, [`cd ${name} && yarn add react react-dom vite @vitejs/plugin-react typescript `]);
}))();
