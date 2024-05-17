import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { PusherModule } from 'nestjs-pusher'; // Import PusherModule from 'nestjs-pusher'
import { PusherService } from './pusher.service';

dotenv.config();

@Module({
  providers: [PusherService],
  exports: [PusherService],
  imports: [
    PusherModule.forRoot({
      key: process.env.PUSHER_KEY,
      appId: process.env.PUSHER_APP_ID,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
    }),
  ],
})
export class PusherLibModule {}
