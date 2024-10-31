import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/post/entities/post.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: false })
  profileImageUrl?: string;

  @Prop({ required: false })
  bio?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Post' }) // 포스트 참조 추가
  posts?: Types.ObjectId[]; // 사용자가 작성한 포스트의 ObjectId 배열
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('versionKey', false); // __v 필드 비활성화
