import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

class ImageDto {
  @ApiProperty({ description: 'Publicly accessible URL of the image' })
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Cloud storage public ID (e.g., from Cloudinary)',
  })
  @IsNotEmpty()
  publicId: string;
}
export class TodoDto {
  @ApiProperty({ description: 'User id of the todoist' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Task of the user' })
  @IsNotEmpty()
  task: string;

  @ApiProperty({ description: 'Description of the task' })
  description: string;

  @ApiProperty({
    description: 'Image details',
    type: () => ImageDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImageDto)
  image?: ImageDto;
}
