import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { IUser } from 'src/Interfaces/User.interface';
import { User } from 'src/Schemas/User.schema';

@Injectable()
export class AuthService {
  private readonly saltRounds: number; // Define saltRounds here

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {
    this.saltRounds = +process.env.BCRYPT_SALT_ROUNDS || 10;
  }


  

  async register(userCredentials: IUser) {
    try {
      if (
        await this.userModel.findOne({
          $or: [
            { username: userCredentials.username },
            { email: userCredentials.email },
          ],
        })
      ) {
        throw new HttpException(
          'Name or Email already occupied!',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const hash = await bcrypt.hash(userCredentials.password, this.saltRounds);
      const user = await this.userModel.create({
        ...userCredentials,
        password: hash,
      });

      const token = await this.jwtService.sign({
        _id: user._id,
        iat: Math.floor(Date.now() / 1000),
      });

      return { user, token };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(userCredentials: IUser) {
    try {
      const user = await this.userModel.findOne({
        $or: [{ username: userCredentials.username }, { email: userCredentials.email }],
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (!(await bcrypt.compare(userCredentials.password, user.password))) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const token = await this.jwtService.sign({
        _id: user._id,
        iat: Math.floor(Date.now() / 1000),
      });

      return { ...user.toJSON(), token };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
