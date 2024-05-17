import { Injectable } from '@nestjs/common';
import { PusherService as NestJsPusherService } from 'nestjs-pusher';

@Injectable()
export class PusherService {
  constructor(private readonly pusherService: NestJsPusherService) {}

  async triggerEvent(channel: string, event: string, data: any): Promise<void> {
    await this.pusherService.trigger(channel, event, data);
  }
}
