"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const packageTemplate = (packageName, type) => {
    const data = { name: packageName };
    const generalFiles = [
        {
            file: "package.json",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./package/packageJson.ejs"), data)
        },
        {
            file: "index.html",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./package/indexHtml.ejs"), data)
        },
        {
            file: "tsconfig.json",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./package/tsconfig.ejs"), data)
        }
    ];
    const reactFiles = [
        {
            file: "vite.config.ts",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./package/viteConfig.ejs"), data)
        },
        {
            file: "src/lib/index.tsx",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./package/index.ejs"), data)
        },
        {
            file: "src/main.tsx",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./package/main.ejs"), data)
        },
        {
            file: "src/App.tsx",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./package/app.ejs"), data)
        },
    ];
    const pureFiles = [
        {
            file: "vite.config.ts",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./package/pureViteConfig.ejs"), data)
        },
        {
            file: "src/lib/index.ts",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./package/pureIndex.ejs"), data)
        },
    ];
    return [
        ...generalFiles,
        ...(type === "react" ? reactFiles : pureFiles)
    ];
};
exports.default = packageTemplate;
