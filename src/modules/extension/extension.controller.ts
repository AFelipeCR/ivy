import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExtensionRegistryService } from './extension-registry.service';
import { ExtensionExecutorService } from './extension-executor.service';

@Controller('extensions')
export class ExtensionController {
    constructor(
        private readonly registryS: ExtensionRegistryService,
        private readonly executorS: ExtensionExecutorService
    ) { }

    @Get()
    getCatalog() {
        return this.registryS.getCatalog();
    }

    @Post('trigger')
    async triggerFunction(@Body() body: { ext: string, func: string, params: any[] }) {
        const success = await this.executorS.execute(body.ext, body.func, ...body.params);
        return { success };
    }
}