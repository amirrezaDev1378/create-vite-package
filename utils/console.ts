import colors from "colors-cli";

const {green, red, blue, yellow, cyan} = colors;

const mods = {
    error: red,
    info: blue,
    success: green,
    debug: yellow,
    warn: cyan
}
type Mod = keyof typeof mods;
type ColorConsoleTypes = {
    [key in Mod]: (message: string) => void;
};


const ColorConsole:ColorConsoleTypes = Object.entries(mods).reduce((acc, [key, value]) => {
    acc[key] = (message) => {
        console.log(value(message));
    }
    return acc;
}, {} as any);

export default ColorConsole;
