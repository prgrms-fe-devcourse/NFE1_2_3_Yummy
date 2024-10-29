import { Post } from '../entities/post.schema';

export class PaginatedPostsDto {
  totalCount: number;
  posts: Post[];
}
