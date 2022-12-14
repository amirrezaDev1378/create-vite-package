import * as fs from "fs";
import {execSync} from "child_process";
import path from "path";

type types = (options: { packageName: string, packagePath: string, type: "react" | "pure" }, commands: string[], template: (name: string, type: "react" | "pure") => { file: string, content: string }[], lastCommands: string[]) => void;

const CreateProject: types = async ({packageName, packagePath , type}, commands, template, lastCommands) => {
    commands.forEach((command) => {
        execSync(command, {stdio: "inherit"});
    })
    const files = template(packageName , type);
    files.forEach(({file, content}) => {
        const filePath = path.join(packagePath, file);
        fs.writeFileSync(filePath, content);
    })
    lastCommands.forEach((command) => {
        execSync(command, {stdio: "inherit"});
    })
}
export default CreateProject;
