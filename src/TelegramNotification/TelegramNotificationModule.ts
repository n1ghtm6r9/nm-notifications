import { encode } from 'he';
import { Module, Global } from '@nestjs/common';
import { configKey, IConfig } from '@nmxjs/config';
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

        const send = ({ message }, options?) =>
          Promise.all(
            telegramClients.map((client, i) => config.notification.telegrams[i].chatIds.map(chatId => client.sendMessage(chatId, message, options))),
          ).then();

        return {
          send,
          sendError: options => {
            const errorMessage = `
            <b>Error</b>
            <blockquote expandable>${encode(JSON.stringify(options))}</blockquote>
            `;
            return send(
              {
                message: errorMessage,
              },
              { parse_mode: 'HTML' },
            );
          },
        };
      },
      inject: [configKey],
    },
  ],
  exports: [telegramNotifierKey],
})
export class TelegramNotificationModule {}
