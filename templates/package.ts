import {readFile, render} from "./helpers";

const packageTemplate = (packageName: string, type: "react" | "pure") => {
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
            file: "src/main.tsx",
            content: render(readFile("./package/main.ejs"), data)
        },
        {
            file: "src/App.tsx",
            content: render(readFile("./package/app.ejs"), data)
        }, {
            file: "tsconfig.json",
            content: render(readFile("./package/tsconfig.ejs"), data)
        }
    ]
}
export default packageTemplate;
