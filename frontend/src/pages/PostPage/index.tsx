import { PostPageContainer } from './style'
import PostContainer from '@/components/PostContainer'
import PostCommentContainer from '@/components/PostCommentContainer'
import PostSideButton from '@/components/PostSideButton'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import { useEffect } from 'react'

const PostPage = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let content

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (data) {
    content = (
      <>
        <PostContainer post={data} />
        <PostSideButton post={data} />
      </>
    )
  }

  return (
    <PostPageContainer>
      {content}
      <PostCommentContainer />
    </PostPageContainer>
  )
}

export default PostPage
