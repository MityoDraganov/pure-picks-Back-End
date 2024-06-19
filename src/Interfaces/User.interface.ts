import mongoose from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  type: string;
  products: mongoose.Types.ObjectId[];
}

