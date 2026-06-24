export const SUBSCRIBABLE_EVENTS = [
  'message.received',
  'message.edited',
  'message.sent',
  'message.ack',
  'message.revoked',
  'session.status',
  'session.qr',
  'session.authenticated',
  'session.disconnected',
  'group.join',
  'group.leave',
  'group.update',
] as const;

export type SubscribableEvent = (typeof SUBSCRIBABLE_EVENTS)[number];

export interface RouteModel {
  id: number;
  endpoint: string;
  events: SubscribableEvent [];
  name: string;
  registered: boolean;
  actions: any[]
}