import ColorConsole from "./console";
import * as fs from "fs";
import path from "path";
import getRootPath from "./getRootPath";

const nonTsIncludes = [
    "templates/package",
    "templates/project",
];

(async () => {
    let hasError = false;
    const root = getRootPath();
    ColorConsole.info("Afterbuild started");

    try {
        nonTsIncludes.forEach((dir) => {
            const currentPath = path.resolve(root, `${dir}`);
            const targetPath = path.resolve(root, `./dist/${dir}`)
            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath);
            }
            fs.cpSync(currentPath, targetPath, {recursive: true});
        })
    } catch (e: any) {
        hasError = true;
        ColorConsole.error(e?.message || "an error occurred");
    }
    if (!hasError) {
        ColorConsole.success("Afterbuild finished successfully");
        return;
    }
    ColorConsole.error("Prebuild failed");

})()
