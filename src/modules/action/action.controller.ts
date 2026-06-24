import { Body, Controller, Get, Post } from '@nestjs/common';
import { type ActionReq, ActionService } from './action.service';

@Controller('actions')
export class ActionController {
    constructor(
        private readonly actionS: ActionService,
    ) { }

    @Post()
    async create(@Body() body: ActionReq) {
        return this.actionS.create(body);
    }
}