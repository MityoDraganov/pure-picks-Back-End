import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/Dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':userId')
  async getProfileData(
    @Param('userId') userId: string,
  ){
    return this.authService.findUserById(userId)
  }

  
  @Patch()
  async edit(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
  ) {
    
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
}
