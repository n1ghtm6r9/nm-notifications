import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IAllNotifiers } from '../interfaces';
import { allNotifiersKey } from '../constants';
import { INotificationSendErrorOptions } from '../interfaces';

@Injectable()
export class SendErrorNotifyService {
  constructor(@Inject(allNotifiersKey) protected readonly allNotifiers: IAllNotifiers) {}

  public call = (options: INotificationSendErrorOptions) =>
    Promise.all(
      Array.from(this.allNotifiers.values())
        .filter(Boolean)
        .map(v => v.sendError(options)),
    );
}
