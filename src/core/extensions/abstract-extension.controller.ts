import type { ReceivedMessageEvent } from 'src/core/webhooks/received.model';
import { ActionFunction } from 'src/modules/action/entities/action-function.entity';
import { DataSource, Like } from 'typeorm';
import { Route } from 'src/modules/route/entities/route.entity';
import { Action } from 'src/modules/action/entities/action.entity';
import { AExtensionService } from './abstract-extension.service';

export class AExtensionController {
    async triggerFunction<S extends AExtensionService>(body: ReceivedMessageEvent, service: S, dataSource: DataSource, endpoint: string) {
        const { data } = body;

        const route = await dataSource.getRepository(Route).findOne({
            where: { endpoint }
        });

        if (!route) return { success: false, message: "Route not found" };
        
        const actions = await dataSource.getRepository(Action).find({
            where: { route: { id: route.id }, command: data.body, selectedEvents: Like(`%"${body.event}"%`)  }
        });

        for (const action of actions) {
            const actionFunction = await dataSource.getRepository(ActionFunction).findOne({
                where: { action: { id: action.id } },
                relations: { function: true }
            });

            if (actionFunction) {
                await service.process(actionFunction, body);
            }

        }

        return { success: false, message: "Event not processed" };
    }
}