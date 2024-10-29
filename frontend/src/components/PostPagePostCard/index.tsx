import { formatDate } from '@/utils/formatDate'
import {
  AuthorDetail,
  Dot,
  PostContent,
  PostDetail,
  PostInfo,
  PostPagePostCardContainer,
} from './style'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const PostPagePostCard = () => {
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
    const { user: author } = data

    const authorProfileImage = author.profileImageUrl ? (
      <img
        src={author?.profileImageUrl}
        alt='Author'
      />
    ) : (
      <Avatar icon={<UserOutlined />} />
    )

    content = (
      <PostPagePostCardContainer>
        <PostInfo>
          <p>{data?.category}</p>
          <h1>{data?.title}</h1>
          <PostDetail>
            <AuthorDetail>
              {authorProfileImage}
              <span>{author?.nickname}</span>
            </AuthorDetail>
            <Dot>·</Dot>
            <p>{formatDate(data?.createdAt)}</p>
          </PostDetail>
        </PostInfo>

        <PostContent dangerouslySetInnerHTML={{ __html: data?.content }} />
      </PostPagePostCardContainer>
    )
  }

  return <>{content}</>
}

export default PostPagePostCard
