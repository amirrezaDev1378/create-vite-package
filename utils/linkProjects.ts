import {execSync} from "child_process";

const linkProjects = (name:string) => {
    execSync(`cd ${name} && yarn link && cd ../${name}-example && yarn link ${name}`)
    execSync(`cd ${name}-example && yarn link ${name}`)
    execSync(`cd ${name}-example && yarn add file:../${name}`)
}
export default linkProjects;
