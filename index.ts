#!/usr/bin/env node

import promptForOptions from "./utils/prompt";
import ColorConsole from "./utils/console";
import createProject from "./utils/createProject";
import packageTemplate from "./templates/package";
import projectTemplate from "./templates/project";
import path from "path";
import {execSync} from "child_process";
import linkProjects from "./utils/linkProjects";
import sanitizeName from "./utils/sanitizeName";
import ErrorBoundary from "./utils/ErrorBoundary";

ColorConsole.info("creating a vite package!");

(async () => {
    let hasError = false;
    const {type, name, withProject} = await promptForOptions()
    const isValidName = await sanitizeName(name);
    if (!isValidName) {
        ColorConsole.error("invalid package name!");
        ColorConsole.error(`
        package must start with a lowercase letter, and can only contain letters, numbers, and dashes.
        `);
        return;
    }
    const packagePath = path.join(process.cwd(), name);
    const projectPath = path.join(process.cwd(), `${name}-example`);
    try {
        const Stage1 = ErrorBoundary(() => {
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
        })
        if (withProject) {
            const Stage2 = ErrorBoundary(() => {
                ColorConsole.info("creating example project project")
                createProject({
                        packageName: name,
                        targetPath: projectPath,
                        type
                    }, [`mkdir "${name}-example"`, `mkdir "${name}-example/src/lib"`],
                    projectTemplate,
                    [`cd ${name}-example && yarn add react react-dom vite @vitejs/plugin-react typescript @types/react-dom @types/react `]
                )
                ColorConsole.success("project created successfully!")
            })
            hasError = !Stage1 || !Stage2;
        } else {
            hasError = !Stage1;
        }
    } catch (e) {
        ColorConsole.error("an error occurred while creating the package or project");
        console.error(e)
    }
    if (hasError) {
        return;
    }

    try {
        const Stage3 = ErrorBoundary(() => {
            ColorConsole.info("building packages")
            execSync(`cd ${name} && yarn build`, {stdio: "inherit"});
            ColorConsole.success("packages built successfully!")
        })
        if (!Stage3) {
            hasError = true;
        }
    } catch (e) {
        ColorConsole.error("an error occurred while building the packages");
        console.error(e)
    }
    try {
        if (withProject) {
            const Stage4 = ErrorBoundary(() => {
                ColorConsole.info("linking packages")
                linkProjects(name)
                ColorConsole.success("packages linked successfully!")
            })
            if (!Stage4) {
                hasError = true;
            }
        }
    } catch (e) {
        ColorConsole.error("an error occurred while linking the packages");
        console.error(e)
    }

    if (hasError) {
        throw new Error("an error occurred while building or linking the packages");
    }
})()
