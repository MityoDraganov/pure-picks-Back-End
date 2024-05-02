import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

import * as admin from 'firebase-admin';
@Module({
  providers: [
    FirebaseService,
    {
      provide: 'FirebaseAdmin',
      useFactory: () => {
        //const serviceAccount = require('../config/citireport-18077-firebase-adminsdk-xn6zb-ae31d8a92b.json');
        admin.initializeApp({
          credential: admin.credential.cert(
            './src/config/purepicks-f7721-firebase-adminsdk-rttpl-3c5291eb06.json',
          ),
          storageBucket: 'gs://purepicks-f7721.appspot.com',
        });
        return admin;
      },
    },
  ],
  exports: [FirebaseService, 'FirebaseAdmin'],
})
export class FirebaseModule {}
