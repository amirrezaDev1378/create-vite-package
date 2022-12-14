import ejs from 'ejs'
import * as fs from "fs";
import path from "path";

const readFile = (address: string) => {
    return fs.readFileSync(path.join(__dirname, address), "utf-8").toString()
}
const render = (template, data) => {
    return `${ejs.render(template, data, {
        rmWhitespace: true,
    }).toString()}`
}
export {readFile, render}
