import {readFile, render} from "./helpers";

const packageTemplate = (packageName: string, type: "react" | "pure") => {
    const data = {name: packageName}

    return [
        {
            file: "package.json",
            content: render(readFile("./project/packageJson.ejs"), data)
        },
        {
            file: "vite.config.ts",
            content: render(readFile("./project/viteConfig.ejs"), data)
        },
        {
            file: "src/lib/index.tsx",
            content: render(readFile("./project/index.ejs"), data)
        },
        {
            file: "index.html",
            content: render(readFile("./project/indexHtml.ejs"), data)

        },
        {
            file: "src/main.tsx",
            content: render(readFile("./project/main.ejs"), data)
        },
        {
            file: "src/App.tsx",
            content: render(readFile("./project/app.ejs"), data)
        }, {
            file: "tsconfig.json",
            content: render(readFile("./project/tsconfig.ejs"), data)
        }, {
            file: "tsconfig.node.json",
            content: render(readFile("./project/tsConfigNode.ejs"), data)
        }
    ]
}
export default packageTemplate;
