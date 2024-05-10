import { IsNotEmpty, IsString, IsEmail, IsObject } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  // pfp: File;
  type: string;
}

export class RequestVerification {
  @IsNotEmpty()
  documents: File[];

  @IsNotEmpty()
  @IsObject()
  sellerLocation: {
    latitude: number;
    longitude: number;
  };
}
