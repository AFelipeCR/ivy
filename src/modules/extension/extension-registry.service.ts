import { ModuleRef } from '@nestjs/core';
import { Injectable, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { ExtensionDefinition } from './extension.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Extension } from './entities/extension.entity';
import { Repository } from 'typeorm';
import { ExtFunction } from './entities/ext-function.entity';

@Injectable()
export class ExtensionRegistryService implements OnApplicationBootstrap {
  private registry: { name: string; functions: { alias, methodName, inputs }[], serviceClass: any }[] = [];

  constructor(
    @Inject('EXTENSIONS_LIST') private readonly extensions: ExtensionDefinition[],
    private readonly moduleRef: ModuleRef,
    @InjectRepository(Extension)
    private extensionRepository: Repository<Extension>,
    @InjectRepository(ExtFunction)
    private functionRepository: Repository<ExtFunction>,
  ) { }

  onApplicationBootstrap() {
    this.extensions.forEach(async ext => {
      const providers = Reflect.getMetadata('providers', ext.module) || [];

      const serviceClass = providers.find(p =>
        Reflect.getMetadata('is_extension_service', p) === true
      );

      if (serviceClass) {
        const serviceInstance = this.moduleRef.get(serviceClass, { strict: false });
        const map = (serviceInstance.constructor as any)._extensionFunctionMap || {};

        const functions = Object.entries(map).map(([alias, config]: [string, any]) => ({
            alias,
            methodName: config.methodName,
            inputs: config.inputs
        }));

        const name = ext.module.name.replace('Extension', '');

        this.registry.push({ name, functions, serviceClass });

        await this.saveToDatabase(name, functions);
      }
    });
  }

  getRegistry() {
    return this.registry;
  }

  getCatalog() {
    return this.registry.map(r => ({
      name: r.name,
      functions: r.functions.map(f => ({ alias: f.alias, inputs: f.inputs })),
    }))
  }

  private async saveToDatabase(name: string, functionNames: { alias: string, methodName: string, inputs: string[] }[]) {
    let extension = await this.extensionRepository.findOneBy({ name });
    if (!extension) extension = await this.extensionRepository.save({ name });

    for (const f of functionNames) {
      let extFunc = await this.functionRepository.findOne({
        where: { alias: f.alias, extension: { id: extension.id } }
      });

      if (extFunc) {
        extFunc.name = f.methodName;
        extFunc.inputs = f.inputs;
        await this.functionRepository.save(extFunc);
      } else {
        await this.functionRepository.save({
          alias: f.alias,
          name: f.methodName,
          inputs: f.inputs,
          extension,
        });
      }
    }
  }
}