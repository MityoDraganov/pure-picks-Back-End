import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User, UserSchema } from 'src/Schemas/User.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MarketplaceModule } from '../marketplace/marketplace.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    MarketplaceModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
