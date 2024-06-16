import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/Schemas/User.schema';
import { CreateUserDto, RequestVerification } from 'src/Dtos/auth.dto';
import { MarketplaceService } from '../marketplace/marketplace.service';

@Injectable()
export class AuthService {
  private readonly saltRounds: number; // Define saltRounds here

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(MarketplaceService)
    private readonly marketplaceService: MarketplaceService,
    private readonly jwtService: JwtService,
  ) {
    this.saltRounds = +process.env.BCRYPT_SALT_ROUNDS || 10;
  }

  async register(userCredentials: CreateUserDto) {
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

      return { ...user.toJSON(), token };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(userCredentials: CreateUserDto) {
    try {
      const user = await this.userModel.findOne({
        $or: [
          { username: userCredentials.username },
          { email: userCredentials.email },
        ],
      }).populate("orders");

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

  async requestVerification(
    userId: string,
    documents: File[],
    verificationDto: RequestVerification,
  ) {
    try {
      const user = await this.findUserById(userId);

      const marketPlaceSettings = await this.marketplaceService.create(
        documents,
        verificationDto,
      );
      user.VerifiedStatus = 'Pending';
      user.marketplaceSettings = marketPlaceSettings;

      await user.save();

      return user;
    } catch (err: any) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async acceptVerification(userId: string) {}

  async findUserById(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new HttpException('User not found!', 404);
    }

    return user;
  }

    async findUserByIdLEAN(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new HttpException('User not found!', 404);
    }

    return user.toJSON();
  }
}
