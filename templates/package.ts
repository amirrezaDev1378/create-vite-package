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
const packageTemplate = (packageName: string) => {
    console.log(__dirname , __filename , path.join(__dirname, "./package/packageJson.ejs") , process.cwd() , path.join(process.cwd(), "packageJson.ejs"))
    const data = {name: packageName}

    return [
        {
            file: "package.json",
            content: render(readFile("./package/packageJson.ejs"), data)
        },
        {
            file: "vite.config.ts",
            content: render(readFile("./package/viteConfig.ejs"), data)
        },
        {
            file: "src/lib/index.tsx",
            content: render(readFile("./package/index.ejs"), data)
        },
        {
            file: "index.html",
            content: render(readFile("./package/indexHtml.ejs"), data)

        },
        {
            file: "src/main.jsx",
            content: render(readFile("./package/main.ejs"), data)
        },
        {
            file: "src/App.jsx",
            content: render(readFile("./package/app.ejs"), data)
        }, {
            file: "tsconfig.json",
            content: render(readFile("./package/tsconfig.ejs"), data)
        }
    ]
}
export default packageTemplate;
