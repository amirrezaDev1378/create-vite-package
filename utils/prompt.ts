import p from "prompts"


const promptForOptions = async () => {
    const {type , name , withProject} = await p([{
        type: "text",
        name: "name",
        message: "What is the name of your package?"
    }, {
        type: "select",
        name: "type",
        message: "How would you like to create your package?",
        choices: [
            {title: "React", value: "react"},
            {title: "Pure", value: "pure"},
        ]
    }, {
        type: "select",
        name: "withProject",
        message: "Do want to create a simple react project for your package too?",
        choices: [
            {title: "Yes!", value: true},
            {title: "No.", value: false},
        ]
    }])
    return {type, name, withProject};
}
export default promptForOptions;
