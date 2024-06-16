import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, RequestVerification } from 'src/Dtos/auth.dto';
import { AuthService } from './auth.service';
import { FilesInterceptor } from '@nestjs/platform-express';

import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':userId')
  async getProfileData(@Param('userId') userId: string) {
    return this.authService.findUserByIdLEAN(userId);
  }

  @Patch()
  async edit(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    //const user = await this.authService.findUserById(req.userId);
    //return this.productService.edit(productDto, user, productId);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Post('/verification/request')
  @UseInterceptors(FilesInterceptor('documents'))
  async requestVerification(
    @Body() verificationDto: RequestVerification,
    @Req() req: Request,
    @UploadedFiles() documents: any,
  ) {
    return this.authService.requestVerification(
      req.userId,
      documents,
      verificationDto,
    );
  }

  @Post('/verification/accept')
  async acceptVerification() {}
}
