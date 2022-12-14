import path from "path";
import * as fs from "fs";

const getRootPath = () => {
    let level = "../"
    while (true) {
        if (fs.existsSync(path.resolve(__dirname, `${level}package.json`))) {
            return path.resolve(__dirname, level);
        }
        if (level.length > 100) {
            throw new Error("package.json not found");
        }
        level += "../"
    }
}
export default getRootPath
