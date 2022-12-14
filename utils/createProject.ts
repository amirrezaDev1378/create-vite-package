import * as fs from "fs";
import {execSync} from "child_process";
import path from "path";

type options = {
    packageName: string, targetPath: string, type: "react" | "pure"
}
type templateFunction = (name: string, type: "react" | "pure") => { file: string, content: string }[]
type types = (options: options, commands: string[], template: templateFunction, lastCommands: string[]) => void;

const CreateProject: types = async (options, commands, template, lastCommands) => {
    const {packageName, targetPath, type} = options;
    const files = template(packageName, type);

    commands.forEach((command) => {
        execSync(command, {stdio: "inherit"});
    })
    files.forEach(({file, content}) => {
        const filePath = path.join(targetPath, file);
        fs.writeFileSync(filePath, content);
    })
    lastCommands.forEach((command) => {
        execSync(command, {stdio: "inherit"});
    })
}
export default CreateProject;
