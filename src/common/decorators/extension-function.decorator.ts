export const ExtensionFunction = (name: string, inputs: string[] = []): MethodDecorator => {
    return (target: any, propertyKey: string | symbol) => {
        const constructor = target.constructor;

        if (!constructor._extensionFunctionMap) {
            constructor._extensionFunctionMap = {};
        }

        constructor._extensionFunctionMap[name] = {
            methodName: propertyKey,
            inputs: inputs
        };
    };
};
