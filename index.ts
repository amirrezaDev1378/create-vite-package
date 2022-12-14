#!/usr/bin/env node

import promptForOptions from "./utils/prompt";
import ColorConsole from "./utils/console";
import createProject from "./utils/createProject";
import packageTemplate from "./templates/package";
import path from "path";

ColorConsole.info("creating a vite package!");
console.log("\n\n");

(async () => {

    const {type, name, withProject} = await promptForOptions()
    console.log(JSON.stringify({type, name, withProject}, null, 2))
    const packagePath = path.join(process.cwd(), name);
    createProject({
        packageName: name,
        packagePath
    }, [`mkdir "${name}"`, `mkdir "${name}/src/lib"`], packageTemplate, [`cd ${name} && yarn add react react-dom vite @vitejs/plugin-react typescript `])
})()
