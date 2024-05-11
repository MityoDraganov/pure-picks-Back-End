import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}

  async createGpsLocation({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) {
    return await this.locationModel.create({
      latitude,
      longitude,
    });
  }

  
}
