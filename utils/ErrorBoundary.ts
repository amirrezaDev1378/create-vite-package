type Types = (fn: (...args) => any, onError?: (error: Error) => any) => boolean;
const ErrorBoundary: Types = (fn, onError) => {
    const defaultOnError = (error: Error) => {
        console.error(error);
    }
    const errorFn = onError || defaultOnError;
    try {
        fn();
        return true;
    } catch (e: any) {
        errorFn(e)
        return false;
    }
}
export default ErrorBoundary;
