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
        <PostImage src='https://img.freepik.com/free-photo/tofu-yolk-boiled-spicy-soup_1150-42896.jpg?t=st=1729664573~exp=1729668173~hmac=8f7746c1984bd6b33e717938f2338678ea050f458235f370e94d836ae8760181&w=1380' />
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
