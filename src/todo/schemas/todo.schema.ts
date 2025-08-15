import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Image, ImageSchema } from './image.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true })
  task: string;

  @Prop()
  description: string;

  @Prop({ type: ImageSchema })
  image: Image;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
