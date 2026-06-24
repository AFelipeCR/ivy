import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ExtensionRegistryService } from './extension-registry.service';

@Injectable()
export class ExtensionExecutorService {
    constructor(
        private readonly registryService: ExtensionRegistryService,
        private readonly moduleRef: ModuleRef
    ) { }

    async execute(extensionName: string, functionName: string, ...args: any[]) {
        const registry = this.registryService.getRegistry();
        const extension = registry.find(e => e.name === extensionName);

        if (!extension) throw new NotFoundException('Extension not found');

        const func = extension.functions.find((f: any) => f.alias === functionName);

        const serviceInstance = this.moduleRef.get(extension.serviceClass, { strict: false });

        if (func && typeof serviceInstance[func.methodName] === 'function') {
            const a = await serviceInstance[func.methodName](...args);
            return a;
        }

        if (typeof serviceInstance[functionName] === 'function') {
            const a = await serviceInstance[functionName](...args);
            return a;
        }

        throw new NotFoundException('Function not found');
    }
}