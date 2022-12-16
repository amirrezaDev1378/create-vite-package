"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const linkProjects = (name) => {
    (0, child_process_1.execSync)(`cd ${name} && yarn link && cd ${name}-example && yarn link ${name}`);
    (0, child_process_1.execSync)(`cd ${name}-example && yarn link ${name}`);
    (0, child_process_1.execSync)(`cd ${name}-example && yarn add file:../${name}`);
};
exports.default = linkProjects;
