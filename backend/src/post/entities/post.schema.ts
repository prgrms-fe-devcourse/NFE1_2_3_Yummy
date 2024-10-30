import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User; // 회원가입 기능 완료 후 추가

  @Prop({ required: true })
  title: string; // 제목

  @Prop({ required: true })
  content: string; // 게시글 내용

  @Prop()
  category: string; // 카테고리

  @Prop()
  image_url: string; // 이미지 URL

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] }) // 좋아요 배열
  hearts: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.set('versionKey', false);
