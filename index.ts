#!/usr/bin/env node

import promptForOptions from "./utils/prompt";
import ColorConsole from "./utils/console";
import createProject from "./utils/createProject";
import packageTemplate from "./templates/package";
import projectTemplate from "./templates/project";
import path from "path";
import {execSync} from "child_process";
import linkProjects from "./utils/linkProjects";

ColorConsole.info("creating a vite package!");

(async () => {

    const {type, name, withProject} = await promptForOptions()
    const packagePath = path.join(process.cwd(), name);
    const projectPath = path.join(process.cwd(), `${name}-example`);
    try {
        ColorConsole.info("creating package")
        createProject({
                packageName: name,
                targetPath: packagePath,
                type
            }, [`mkdir "${name}"`, `mkdir "${name}/src/lib"`],
            packageTemplate,
            [`cd ${name} && yarn add react react-dom vite @vitejs/plugin-react typescript `]
        )
        ColorConsole.success("package created successfully!")

        ColorConsole.info("creating example project project")
        createProject({
                packageName: name,
                targetPath: projectPath,
                type
            }, [`mkdir "${name}-example"`, `mkdir "${name}-example/src/lib"`],
            projectTemplate,
            [`cd ${name}-example && yarn add react react-dom vite @vitejs/plugin-react typescript @types/react-dom @types/react`]
        )
        ColorConsole.success("project created successfully!")
    } catch (e) {
        ColorConsole.error("an error occurred while creating the package or project");
        console.error(e)
    }
    try {
        ColorConsole.info("building packages")
        execSync(`cd ${name} && yarn build`, {stdio: "inherit"});
        ColorConsole.success("packages built successfully!")
    } catch (e) {
        ColorConsole.error("an error occurred while building the packages");
        console.error(e)
    }
    try {
        ColorConsole.info("linking packages")
        linkProjects(name)
        ColorConsole.success("packages linked successfully!")
    } catch (e) {
        ColorConsole.error("an error occurred while linking the packages");
        console.error(e)
    }

})()
