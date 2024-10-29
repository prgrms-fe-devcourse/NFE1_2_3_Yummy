import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './entities/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(
    createPostDto: CreatePostDto,
    user: UserDocument,
  ): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostDto,
      user, // 게시글 작성자 ID 설정
    });
    await createdPost.save();
    return await createdPost.populate('user'); // userId를 User 객체로 채워 반
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).populate('user').exec();
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    user: UserDocument,
  ): Promise<Post> {
    const post = await this.findOne(id); // 게시글 찾기

    if ((post.user as UserDocument)._id.toString() !== user._id.toString()) {
      // 권한 체크
      throw new ForbiddenException('본인의 게시글만 수정할 수 있습니다.');
    }
    return await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .populate('user')
      .exec();
  }

  async remove(id: string, user: UserDocument): Promise<any> {
    const post = await this.findOne(id); // 게시글 찾기
    if ((post.user as UserDocument)._id.toString() !== user._id.toString()) {
      // 권한 체크
      throw new ForbiddenException('본인의 게시글만 삭제할 수 있습니다.');
    }
    return await this.postModel.findByIdAndDelete(id).exec();
  }
}
