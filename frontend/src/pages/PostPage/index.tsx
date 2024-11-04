import { PostPageContainer } from './style'
import PostContainer from '@/components/PostContainer'
import PostCommentContainer from '@/components/PostCommentContainer'
import PostSideButton from '@/components/PostSideButton'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { usePostQuery } from '@/hooks/usePostQuery'

const PostPage = () => {
  const { id: postId } = useParams()

  // 추후 핸들링 예정
  if (!postId) return <div>게시글 아이디가 없습니다.</div>

  // 스크롤 위치 초기화
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { postData, isPostLoading, isPostError, postError } =
    usePostQuery(postId)

  let content

  if (isPostLoading) return <div>Loading...</div>

  if (isPostError) return <div>Error: {postError?.message}</div>

  if (postData) {
    content = (
      <>
        <PostContainer post={postData} />
        <PostSideButton post={postData} />
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
