import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Image {
  @Prop()
  url: string;

  @Prop()
  publicId: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
