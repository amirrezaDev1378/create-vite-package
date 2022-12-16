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
const project_1 = __importDefault(require("./templates/project"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const linkProjects_1 = __importDefault(require("./utils/linkProjects"));
const sanitizeName_1 = __importDefault(require("./utils/sanitizeName"));
console_1.default.info("creating a vite package!");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let hasError = false;
    const { type, name, withProject } = yield (0, prompt_1.default)();
    const isValidName = (0, sanitizeName_1.default)(name);
    if (!isValidName) {
        console_1.default.error("invalid package name!");
        console_1.default.error(`
        package must start with a lowercase letter, and can only contain letters, numbers, and dashes.
        `);
        return;
    }
    const packagePath = path_1.default.join(process.cwd(), name);
    const projectPath = path_1.default.join(process.cwd(), `${name}-example`);
    try {
        const Stage1 = ErrorBoundary(() => {
            console_1.default.info("creating package");
            (0, createProject_1.default)({
                packageName: name,
                targetPath: packagePath,
                type
            }, [`mkdir "${name}"`, `mkdir "${name}/src/lib"`], package_1.default, [`cd ${name} && yarn add react react-dom vite @vitejs/plugin-react typescript `]);
            console_1.default.success("package created successfully!");
        });
        if (withProject) {
            const Stage2 = ErrorBoundary(() => {
                console_1.default.info("creating example project project");
                (0, createProject_1.default)({
                    packageName: name,
                    targetPath: projectPath,
                    type
                }, [`mkdir "${name}-example"`, `mkdir "${name}-example/src/lib"`], project_1.default, [`cd ${name}-example && yarn add react react-dom vite @vitejs/plugin-react typescript @types/react-dom @types/react`]);
                console_1.default.success("project created successfully!");
            });
            hasError = !Stage1 || !Stage2;
        }
        else {
            hasError = !Stage1;
        }
    }
    catch (e) {
        console_1.default.error("an error occurred while creating the package or project");
        console.error(e);
    }
    if (hasError) {
        return;
    }
    try {
        const Stage3 = ErrorBoundary(() => {
            console_1.default.info("building packages");
            (0, child_process_1.execSync)(`cd ${name} && yarn build`, { stdio: "inherit" });
            console_1.default.success("packages built successfully!");
        });
        if (!Stage3) {
            hasError = true;
        }
    }
    catch (e) {
        console_1.default.error("an error occurred while building the packages");
        console.error(e);
    }
    try {
        if (withProject) {
            const Stage4 = ErrorBoundary(() => {
                console_1.default.info("linking packages");
                (0, linkProjects_1.default)(name);
                console_1.default.success("packages linked successfully!");
            });
            if (!Stage4) {
                hasError = true;
            }
        }
    }
    catch (e) {
        console_1.default.error("an error occurred while linking the packages");
        console.error(e);
    }
    if (hasError) {
        throw new Error("an error occurred while building or linking the packages");
    }
}))();
