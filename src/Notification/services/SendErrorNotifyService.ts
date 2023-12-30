import { Injectable } from '@nestjs/common';
import { getFullMessageFromError } from '@nmxjs/utils';
import { SendNotifyService } from './SendNotifyService';

@Injectable()
export class SendErrorNotifyService {
  constructor(protected readonly sendNotifyService: SendNotifyService) {}

  public call = (error: Error) =>
    this.sendNotifyService.call({
      message: getFullMessageFromError({ error }),
    });
}
