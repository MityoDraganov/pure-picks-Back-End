// pusher.module.ts

import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { PusherService } from './pusher.service';
import Pusher from 'pusher';

dotenv.config();

@Module({
  providers: [
    {
      provide: 'PUSHER_INSTANCE',
      useValue: new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.PUSHER_CLUSTER,
        encrypted: true,
      }),
    },
    PusherService,
  ],
  exports: ['PUSHER_INSTANCE'],
})
export class PusherModule {}
