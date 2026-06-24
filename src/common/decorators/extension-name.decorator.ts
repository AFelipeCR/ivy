export const ExtensionName = (name: string): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata('extension_name', name, target);
    };
};