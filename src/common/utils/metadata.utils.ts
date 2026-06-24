import 'reflect-metadata';

export function getFunctionsFromMetadata(target: any): string[] {
  const prototype = target.prototype;
  const propertyNames = Object.getOwnPropertyNames(prototype);
  const functions: string[] = [];

  propertyNames.forEach((propertyName) => {
    const metadata = Reflect.getMetadata('ext_func', prototype, propertyName);

    if (metadata) {
      functions.push(metadata);
    }
  });

  return functions;
}