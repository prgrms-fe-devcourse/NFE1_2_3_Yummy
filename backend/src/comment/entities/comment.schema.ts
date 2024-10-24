import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post } from '../../post/entities/post.schema';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  postId: Post;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
