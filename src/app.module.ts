import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGODB_URI');
        if (!uri) {
          throw new Error('MONGODB_URI is not defined in .env');
        }
        return { uri };
      },
    }),

    UsersModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'CLOUDINARY',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const cloudName = config.get<string>('CLOUDINARY_CLOUD_NAME');
        const apiKey = config.get<string>('CLOUDINARY_API_KEY');
        const apiSecret = config.get<string>('CLOUDINARY_API_SECRET');

        if (!cloudName || !apiKey || !apiSecret) {
          throw new Error('Cloudinary environment variables are missing in .env');
        }

        cloudinary.config({
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
        });

        return cloudinary;
      },
    },
  ],
})
export class AppModule {}
