export const ExtensionService = (): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata('is_extension_service', true, target);
    };
};