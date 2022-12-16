"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const packageTemplate = (packageName, type) => {
    const data = { name: packageName };
    return [
        {
            file: "package.json",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./project/packageJson.ejs"), data)
        },
        {
            file: "vite.config.ts",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./project/viteConfig.ejs"), data)
        },
        {
            file: "src/lib/index.tsx",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./project/index.ejs"), data)
        },
        {
            file: "index.html",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./project/indexHtml.ejs"), data)
        },
        {
            file: "src/main.tsx",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./project/main.ejs"), data)
        },
        {
            file: "src/App.tsx",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./project/app.ejs"), data)
        }, {
            file: "tsconfig.json",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./project/tsconfig.ejs"), data)
        }, {
            file: "tsconfig.node.json",
            content: (0, helpers_1.render)((0, helpers_1.readFile)("./project/tsConfigNode.ejs"), data)
        }
    ];
};
exports.default = packageTemplate;
