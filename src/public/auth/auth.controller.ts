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
import { AdminLoginDto, CreateUserDto, RequestVerification } from 'src/Dtos/auth.dto';
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

  // --ADMIN ACTIONS--
    @Post('admin/login')
  async adminLogin(@Body() adminLogin: AdminLoginDto) {
    return this.authService.adminLogin(adminLogin);
  }

  @Get()
  async getAllUsers(){
    return this.authService.getAllUsers()
  }


  @Post('admin/promoteAdmin/:userId')
  async promoteAdmin(@Param('userId') userId: string){
    const user = await this.authService.findUserById(userId)

    return this.authService.promoteAdmin(user)
  }
}
