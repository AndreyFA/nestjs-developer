import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nestjs:nestjs@cursonestjs-mg45a.azure.mongodb.net/test?retryWrites=true&w=majority'),
    BackofficeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
