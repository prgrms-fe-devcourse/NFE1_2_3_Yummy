import { PostImage } from '@/pages/PostPage/style'
import PostPagePostCard from '../PostPagePostCard'
import UserProfileCard from '../UserProfileCard'
import { Post } from '@/typings/db'
import DeleteModal from '../DeleteModal'

const PostContainer = ({ post }: { post: Post }) => {
  console.log(post.image_url)
  return (
    <>
      <PostImage src={post.image_url} />
      <PostPagePostCard {...post} />
      <UserProfileCard
        {...post.user}
        isDisplay={false}
      />
      <DeleteModal />
    </>
  )
}

export default PostContainer
