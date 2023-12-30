import { Module, Global } from '@nestjs/common';
import * as Services from './services';
import { INotifier } from './interfaces';
import { TelegramNotificationModule, telegramNotifierKey } from '../TelegramNotification';
import { allNotifiersKey, notifierKey } from './constants';

const providers = [
  {
    key: telegramNotifierKey,
    provider: 'telegram',
    module: TelegramNotificationModule,
  },
];

@Global()
@Module({
  imports: providers.map(p => p.module),
  providers: [
    ...Object.values(Services),
    {
      provide: notifierKey,
      useFactory: (sendNotifyService: Services.SendNotifyService, sendErrorNotifyService: Services.SendErrorNotifyService): INotifier => ({
        send: sendNotifyService.call.bind(sendNotifyService),
        sendError: sendErrorNotifyService.call.bind(sendErrorNotifyService),
      }),
      inject: [Services.SendNotifyService, Services.SendErrorNotifyService],
    },
    {
      provide: allNotifiersKey,
      useFactory: (...notifiers: INotifier[]) => {
        return notifiers.reduce((res, item, i) => {
          res.set(providers[i].provider, item);
          return res;
        }, new Map());
      },
      inject: providers.map(p => p.key),
    },
  ],
  exports: [notifierKey],
})
export class NotificationModule {}
