export interface INotificationSendErrorOptions {
  message: string;
  code: string;
  params?: Record<string, unknown>;
  serviceName?: string;
  path?: string;
}
