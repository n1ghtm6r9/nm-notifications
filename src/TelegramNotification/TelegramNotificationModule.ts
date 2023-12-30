import { Module, Global } from '@nestjs/common';
import { configKey, IConfig } from '@nmxjs/config';
import { getFullMessageFromError } from '@nmxjs/utils';
import * as TelegramBot from 'node-telegram-bot-api';
import type { INotifier } from '../Notification';
import { telegramNotifierKey } from './constants';

@Global()
@Module({
  providers: [
    {
      provide: telegramNotifierKey,
      useFactory: (config: IConfig): INotifier => {
        if (!config.notification?.telegrams?.length) {
          return null;
        }
        const telegramClients = config.notification.telegrams.map(telegramConfig => new TelegramBot(telegramConfig.token));

        const send = ({ message }) =>
          Promise.all(telegramClients.map((client, i) => client.sendMessage(config.notification.telegrams[i].chatId, message))).then();

        return {
          send,
          sendError: error => send({ message: getFullMessageFromError({ error }) }),
        };
      },
      inject: [configKey],
    },
  ],
  exports: [telegramNotifierKey],
})
export class TelegramNotificationModule {}
