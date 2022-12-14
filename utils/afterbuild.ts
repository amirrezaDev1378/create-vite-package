import ColorConsole from "./console";
import * as fs from "fs";
import path from "path";

const nonTsIncludes = [
    "templates/package",
];

(async () => {
    let hasError = false;
    ColorConsole.info("Prebuild started");

    try {
        nonTsIncludes.forEach((dir) => {
            const folderPath = path.resolve(__dirname, `../${dir}`)
            fs.mkdirSync(folderPath)
            fs.cpSync(folderPath, "./dist", {recursive: true});
        })
    } catch (e: any) {
        hasError = true;
        ColorConsole.error(e?.message || "an error occurred");
    }
    if (!hasError) {
        ColorConsole.success("Prebuild finished successfully");
        return;
    }
    ColorConsole.error("Prebuild failed");

})()
