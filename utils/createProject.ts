import * as fs from "fs";
import {execSync} from "child_process";
import path from "path";

type types = (options: { packageName: string, packagePath: string }, commands: string[], template: (name: string) => { file: string, content: string }[], lastCommands: string[]) => void;

const CreateProject: types = async ({packageName, packagePath}, commands, template, lastCommands) => {
    commands.forEach((command) => {
        execSync(command, {stdio: "inherit"});
    })
    const files = template(packageName);
    files.forEach(({file, content}) => {
        const filePath = path.join(packagePath, file);
        fs.writeFileSync(filePath, content);
    })
    lastCommands.forEach((command) => {
        execSync(command, {stdio: "inherit"});
    })
}
export default CreateProject;
