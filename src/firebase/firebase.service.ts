import { Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { File } from 'multer';

export class FirebaseService {


  public constructor(
    @Inject('FirebaseAdmin') private readonly firebaseAdmin: admin.app.App,
  ) {}

  

  public async uploadFile(content: File): Promise<string> {
    try {
      if (!content.originalname) {
        throw new Error('Content not present!');
      }

      const bucket = this.firebaseAdmin.storage().bucket();
      const fileName = `${Date.now()}_${content.originalname}`;
      const fileUpload = bucket.file(fileName);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: content.mimetype,
        },
      });

      await new Promise<void>((resolve, reject) => {
        stream.on('error', (err: any) => reject(err));
        stream.on('finish', () => resolve());
        stream.end(content.buffer);
      });

      const [signedUrl] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2491', // Adjust expiration date as needed
      });

      return signedUrl;
    } catch (err: any) {
      return err.message;
    }
  }
}
