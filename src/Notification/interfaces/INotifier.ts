import { INotificationSendOptions } from './INotificationSendOptions';
import { INotificationSendErrorOptions } from './INotificationSendErrorOptions';

export interface INotifier {
  send(options: INotificationSendOptions): void;
  sendError(options: INotificationSendErrorOptions): void;
}
