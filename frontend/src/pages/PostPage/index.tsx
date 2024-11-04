import { PostLoading, PostPageContainer } from './style'
import PostContainer from '@/components/PostContainer'
import PostCommentContainer from '@/components/PostCommentContainer'
import PostSideButton from '@/components/PostSideButton'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { usePostQuery } from '@/hooks/usePostQuery'
import ErrorPage from '../ErrorPage'

const PostPage = () => {
  const { id: postId } = useParams()

  if (!postId)
    return (
      <ErrorPage
        title='게시글 아이디가 없습니다.'
        message='다시 시도해주세요.'
      />
    )

  // 스크롤 위치 초기화
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { postData, isPostLoading, isPostError } = usePostQuery(postId)

  let content

  if (isPostLoading) return <PostLoading />

  if (isPostError)
    return (
      <ErrorPage
        title='게시물을 불러오는 중 오류가 발생했습니다.'
        message='다시 시도해주세요.'
      />
    )

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
