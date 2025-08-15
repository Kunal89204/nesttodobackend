import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs'; // ✅ fixed import

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  },
  inject: [ConfigService],
};

export const uploadOnCloudinary = async (filePath: string) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });

    fs.unlinkSync(filePath); // remove local temp file after successful upload
    return response;
  } catch (error) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // clean up even on failure
    }
    console.error('Cloudinary upload failed:', error);
    return null;
  }
};
