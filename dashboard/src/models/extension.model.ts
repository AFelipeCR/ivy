import type { SubscribableEvent } from "./route.model";


export type ExtFunctionInput = "input-text" | "textarea";

export interface ExtFunction {
    alias: string;
    inputs: ExtFunctionInput[]
}

export interface ExtensionModel {
    name: string;
    events: SubscribableEvent[],
    functions: ExtFunction[];
}

export interface ExtensionFunction { 
    id: number, 
    functionId: number, 
    extensionId:number, 
}
