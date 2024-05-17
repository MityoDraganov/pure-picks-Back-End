import { Controller, Inject, Get, Req, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
    constructor(
        @Inject(AuthService)
        private readonly authService: AuthService,
        private readonly deliveriesService: DeliveriesService,
      ) {}

      // --Receivers--

      // --Deliverers--

      @Post('deliverer/makeAvaliable')
      async makeAvaliable(
        @Req() req: Request,
      ) {
        const user = await this.authService.findUserById(req.userId);
        return this.deliveriesService.makeAvaliable(user)
      }

      
      @Post('deliverer/makeUnAvaliable')
      async makeUnAvaliable(
        @Req() req: Request,
      ) {
        const user = await this.authService.findUserById(req.userId);
        return this.deliveriesService.makeUnAvaliable(user)
    }

}
