import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ValidationError } from 'class-validator';
import { Model } from 'mongoose'; // Import ValidationError
import { RequestVerification } from 'src/Dtos/auth.dto';
import { MarketplaceSettings } from 'src/Schemas/MarketplaceSettings.schema';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectModel(MarketplaceSettings.name)
    private readonly marketplaceModel: Model<MarketplaceSettings>,
    @Inject(FirebaseService)
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(
    documents: File[],
    verificationDto: RequestVerification,
  ): Promise<MarketplaceSettings> {
    if (
      !verificationDto.latitude ||
      !verificationDto.longitude ||
      !documents ||
      documents.length === 0
    ) {
      throw new HttpException(
        `Incificient requirements! Must provide: documents, ${Object.keys(verificationDto).join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const contentUrls = await Promise.all(
      documents.map(async (file) => {
        const contentUrl = await this.firebaseService.uploadFile(file);
        return contentUrl;
      })
    );

    return await this.marketplaceModel.create({
      documents: contentUrls,
      sellerLocation: {
        latitude: verificationDto.latitude,
        longitude: verificationDto.longitude,
      },
      ...verificationDto,
    });
  }

  async edit() {}

  async delete() {}
}
