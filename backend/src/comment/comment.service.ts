import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.schema';
import { Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  // 댓글 생성
  async create(
    postId: Types.ObjectId,
    content: string,
    userId: Types.ObjectId,
  ): Promise<Comment> {
    const newComment = new this.commentModel({
      postId,
      content,
      user: userId,
    });
    return await newComment.save().then((comment) => comment.populate('user')); // populate 사용
  }

  // 특정 게시글의 댓글 조회
  async findByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ postId: new Types.ObjectId(postId) })
      .populate('user')
      .exec();
  }

  // 댓글 수정
  async update(commentId: string, content: string): Promise<Comment> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(
      commentId,
      { content },
      { new: true },
    );

    if (!updatedComment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    return updatedComment;
  }

  // 댓글 삭제
  async delete(commentId: string): Promise<void> {
    const result = await this.commentModel.findByIdAndDelete(commentId);
    if (!result) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }
  }

  async findById(commentId: string): Promise<Comment | null> {
    return this.commentModel.findById(commentId).populate('user').exec();
  }
}
