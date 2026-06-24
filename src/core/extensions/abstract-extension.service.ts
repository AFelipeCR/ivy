import { ReceivedMessageEvent } from "src/core/webhooks/received.model";
import { ActionFunction } from "src/modules/action/entities/action-function.entity";

export abstract class AExtensionService {
    async process(actionFunction: ActionFunction, body: ReceivedMessageEvent) {
        return await this.executeAction(actionFunction, body);
    }

    private async executeAction(actionFunction: ActionFunction, body: ReceivedMessageEvent) {
        const funcName = actionFunction.function.name;
        const params = actionFunction.values;

        if (typeof this[funcName] === 'function') {
            return await this[funcName](body, params);
        }

        return { success: false };
    }
}