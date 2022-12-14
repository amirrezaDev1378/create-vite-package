import p from "prompts"


const promptForOptions = async () => {
    const {type , name , withProject} = await p([{
        type: "text",
        name: "name",
        message: "What is the name of your package?",
        validate: (value) => {
            if (value.length < 3) {
                return "Package name must be at least 3 characters long"
            }
            return true
        }

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
        message: "Create a project to use your package with?",
        choices: [
            {title: "Yes!", value: true},
            {title: "No.", value: false},
        ]
    }])
    return {type, name, withProject};
}
export default promptForOptions;
