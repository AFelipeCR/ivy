import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RawAxiosRequestHeaders } from 'axios';
import { SessionsService } from '@ivy/openwa';
import { Action } from './entities/action.entity';
import { ExtFunction } from '../extension/entities/ext-function.entity';
import { ActionFunction } from './entities/action-function.entity';
import { SubscribableEvent } from '@ivy/openwa/dist/services/dto/webhook.dto';

@Injectable()
export class ActionService {
    headers: RawAxiosRequestHeaders;

    constructor(
        @InjectRepository(Action)
        private actionR: Repository<Action>,
        @InjectRepository(ExtFunction)
        private functionR: Repository<ExtFunction>,
        @InjectRepository(ActionFunction)
        private actionFuncR: Repository<ActionFunction>,
        private config: ConfigService,
    ) {
        this.headers = {
            "X-API-Key": this.config.get("API_KEY"),
            "Content-Type": "application/json"
        }
    }

    

    async create(data: ActionReq) {
        const action = await this.actionR.save({ 
            command: data.command, 
            route: { id: data.routeId },
            selectedEvents: data.events
        });

        for (const item of data.functions) {
            const extFunc = await this.functionR.findOne({
                where: {
                    alias: item.function,
                    extension: { name: item.extension }
                }
            });

            if (extFunc) {
                await this.actionFuncR.save({
                    action: { id: action.id },
                    function: { id: extFunc.id },
                    values: item.inputs,
                });
            }
        }

        return { success: true }
    }
}

interface ActionFuncReq {
    extension: string;
    function: string;
    inputs: string[];
}

export interface ActionReq {
    command: string;
    functions: ActionFuncReq[];
    routeId: number;
    events: SubscribableEvent[];
}