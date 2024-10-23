import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  // @Prop({ required: true })
  // user_id: string; // 회원가입 기능 완료 후 추가

  @Prop({ required: true })
  title: string; // 제목

  @Prop({ required: true })
  content: string; // 게시글 내용

  @Prop()
  category: string; // 카테고리

  @Prop()
  image_url: string; // 이미지 URL
}

export const PostSchema = SchemaFactory.createForClass(Post);
