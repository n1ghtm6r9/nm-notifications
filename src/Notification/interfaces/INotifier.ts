import { INotificationSendOptions } from './INotificationSendOptions';

export interface INotifier {
  send(options: INotificationSendOptions): void;
  sendError(error: Error): void;
}
