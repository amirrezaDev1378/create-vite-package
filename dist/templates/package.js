"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const readFile = (address) => {
    return fs.readFileSync(path_1.default.join(__dirname, address), "utf-8").toString();
};
const render = (template, data) => {
    return `${ejs_1.default.render(template, data, {
        rmWhitespace: true,
    }).toString()}`;
};
const packageTemplate = (packageName) => {
    console.log(__dirname, __filename, path_1.default.join(__dirname, "./package/packageJson.ejs"), process.cwd(), path_1.default.join(process.cwd(), "packageJson.ejs"));
    const data = { name: packageName };
    return [
        {
            file: "package.json",
            content: render(readFile("./package/packageJson.ejs"), data)
        },
        {
            file: "vite.config.ts",
            content: render(readFile("./package/viteConfig.ejs"), data)
        },
        {
            file: "src/lib/index.tsx",
            content: render(readFile("./package/index.ejs"), data)
        },
        {
            file: "index.html",
            content: render(readFile("./package/indexHtml.ejs"), data)
        },
        {
            file: "src/main.jsx",
            content: render(readFile("./package/main.ejs"), data)
        },
        {
            file: "src/App.jsx",
            content: render(readFile("./package/app.ejs"), data)
        }, {
            file: "tsconfig.json",
            content: render(readFile("./package/tsconfig.ejs"), data)
        }
    ];
};
exports.default = packageTemplate;
