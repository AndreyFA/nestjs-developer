import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { StoreModule } from './modules/store/store.module';
import { MongooseConfigService } from './configurations/services/mongoose-config.service';
import { AgendaModule } from './modules/agenda/agenda.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BackofficeModule,
    StoreModule,
    AgendaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
