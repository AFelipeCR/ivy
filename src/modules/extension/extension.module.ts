import { DynamicModule, Module } from '@nestjs/common';
import { ExtensionDefinition } from './extension.interface';
import { ExtensionRegistryService } from './extension-registry.service';
import { ExtensionController } from './extension.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Extension } from './entities/extension.entity';
import { ExtFunction } from './entities/ext-function.entity';
import { ExtensionExecutorService } from './extension-executor.service';

@Module({
    providers: [
        ExtensionRegistryService,
        ExtensionExecutorService,
    ],
    imports: [TypeOrmModule.forFeature([Extension, ExtFunction]),],
    exports: [ExtensionRegistryService]
})
export class ExtensionsModule {
    static forRoot(extensions: ExtensionDefinition[]): DynamicModule {
        return {
            module: ExtensionsModule,
            providers: [
                {
                    provide: 'EXTENSIONS_LIST',
                    useValue: extensions,
                },
            ],
            controllers:[ExtensionController],
            imports: extensions.map(e => e.module),
        };
    }
}