import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken?: string;

  @Prop({ default: 'Client' }) // role par defaut Client
  role: string; 
}

export const UserSchema = SchemaFactory.createForClass(User);
