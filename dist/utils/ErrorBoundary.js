"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorBoundary = (fn, onError) => {
    const defaultOnError = (error) => {
        console.error(error);
    };
    const errorFn = onError || defaultOnError;
    try {
        fn();
        return true;
    }
    catch (e) {
        errorFn(e);
        return false;
    }
};
exports.default = ErrorBoundary;
