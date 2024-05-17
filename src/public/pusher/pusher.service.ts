// pusher.service.ts
import { Injectable, Inject } from '@nestjs/common';
import Pusher from 'pusher';

@Injectable()
export class PusherService {
  constructor(@Inject('PUSHER_INSTANCE') private pusherClient: Pusher) {}

  async triggerEvent(channel: string, event: string, data: any): Promise<void> {
    await this.pusherClient.trigger(channel, event, data);
  }
}
