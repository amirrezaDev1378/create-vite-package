import * as yup from "yup";

const sanitizeName = async (string: string) => {
    const schema = yup.string().min(3).max(30).matches(/^[a-z][a-zA-Z0-9\-_]+$/g).required();
    return await schema.isValid(string)
}
export default sanitizeName;
