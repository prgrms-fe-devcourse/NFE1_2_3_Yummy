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
import { User } from 'src/users/schemas/user.schema';
import { PaginatedPostsDto } from './dto/paginated-post.dto';
import { Comment } from 'src/comment/entities/comment.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    user: UserDocument,
  ): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostDto,
      user,
    });
    await createdPost.save();

    await this.userModel.findByIdAndUpdate(user._id, {
      $push: { posts: createdPost._id },
    });

    return await createdPost.populate('user');
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedPostsDto> {
    const skip = (page - 1) * limit;
    const totalCount = await this.postModel.countDocuments();

    const posts = await this.postModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate('user')
      .exec();

    return { totalCount, posts };
  }

  async findAllPosts() {
    return this.postModel.find();
  }

  async findByCategory(category: string) {
    return this.postModel.find({ category });
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
    await this.commentModel.deleteMany({ postId: post._id }).exec();

    return await this.postModel.findByIdAndDelete(id).exec();
  }

  async searchByTitle(keyword: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const totalCount = await this.postModel.countDocuments({
      title: { $regex: keyword, $options: 'i' },
    });

    const posts = await this.postModel
      .find({ title: { $regex: keyword, $options: 'i' } })
      .skip(skip)
      .limit(limit)
      .populate('user')
      .exec();

    return { totalCount, posts };
  }

  async searchByContent(keyword: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const totalCount = await this.postModel.countDocuments({
      content: { $regex: keyword, $options: 'i' },
    });

    const posts = await this.postModel
      .find({ content: { $regex: keyword, $options: 'i' } })
      .skip(skip)
      .limit(limit)
      .populate('user')
      .exec();

    return { totalCount, posts };
  }

  async searchByNickname(
    nickname: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const user = await this.userModel.findOne({ nickname }).exec();
    if (!user) return { totalCount: 0, posts: [] };

    const skip = (page - 1) * limit;
    const totalCount = await this.postModel.countDocuments({ user: user._id });

    const posts = await this.postModel
      .find({ user: user._id })
      .skip(skip)
      .limit(limit)
      .populate('user')
      .exec();

    return { totalCount, posts };
  }

  async likePost(postId: string, user: UserDocument): Promise<Post> {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException('포스트를 찾을 수 없습니다.');
    }

    const userId = user._id as Types.ObjectId; // 타입 단언으로 ObjectId 지정

    // 사용자가 이미 좋아요를 눌렀는지 확인
    if (!post.hearts.includes(userId)) {
      // 좋아요 추가
      post.hearts.push(userId);
    } else {
      // 이미 좋아요를 누른 경우, 좋아요 취소
      post.hearts = post.hearts.filter(
        (id) => id.toString() !== userId.toString(),
      );
    }

    return await post.save();
  }
}
