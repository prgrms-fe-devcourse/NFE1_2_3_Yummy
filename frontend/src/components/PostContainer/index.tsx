import { PostImage } from '@/pages/PostPage/style'
import PostPagePostCard from '../PostPagePostCard'
import UserProfileCard from '../UserProfileCard'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import postApi from '@/apis/postService'

const PostContainer = () => {
  const { id: postId } = useParams()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => {
      if (postId) {
        return postApi.getPostById(postId)
      }
    },
    enabled: !!postId,
  })

  let content

  if (isLoading) {
    content = <div>Loading...</div>
  }

  if (isError) {
    content = <div>Error: {error.message}</div>
  }

  if (data) {
    const { user } = data
    content = (
      <>
        <PostImage src={data.image_url} />
        <PostPagePostCard {...data} />
        <UserProfileCard
          {...user}
          isDisplay={false}
        />
      </>
    )
  }

  return content
}

export default PostContainer
