import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';

@Module({
  imports: [PostModule],
  controllers: [PostController],
  providers: [PostService],
})
export class AppModule {}
