import { SubscribableEvent } from "@ivy/openwa/dist/services/dto/webhook.dto"

export interface ReceivedMessageData {
    id: string,
    from: string,
    to: string,
    chatId: string,
    body: string,
    type: string,
    timestamp: number,
    fromMe: boolean,
    isGroup: boolean
}

export interface ReceivedMessageEvent {
  event: SubscribableEvent,
  timestamp: string,
  sessionId: string,
  idempotencyKey: string,
  deliveryId: string,
  data: ReceivedMessageData
}

