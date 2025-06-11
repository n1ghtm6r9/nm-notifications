import { Injectable, Inject } from '@nestjs/common';
import { allNotifiersKey } from '../constants';
import { IAllNotifiers, INotificationSendOptions } from '../interfaces';

@Injectable()
export class SendNotifyService {
  constructor(@Inject(allNotifiersKey) protected readonly allNotifiers: IAllNotifiers) {}

  public call = (options: INotificationSendOptions) =>
    Promise.all(
      Array.from(this.allNotifiers.values())
        .filter(Boolean)
        .map(v => v.send(options)),
    );
}
