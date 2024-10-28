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
import { getPostById } from '@/apis/api'

const PostPagePostCard = () => {
  const { id } = useParams()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id as string),
    enabled: !!id,
  })

  let content

  if (isLoading) {
    content = <div>Loading...</div>
  }

  if (isError) {
    content = <div>Error: {error.message}</div>
  }

  if (data) {
    content = (
      <PostPagePostCardContainer>
        <PostInfo>
          <p>{data?.category}</p>
          <h1>{data?.title}</h1>
          <PostDetail>
            <AuthorDetail>
              <img
                src='https://static.inews24.com/v1/0ea0b53518da00.jpg'
                alt='Author'
              />
              <span>애드워드 리</span>
            </AuthorDetail>
            <Dot>·</Dot>
            <p>{formatDate(data?.createdAt)}</p>
          </PostDetail>
        </PostInfo>

        <PostContent>{data?.content}</PostContent>
      </PostPagePostCardContainer>
    )
  }

  return <>{content}</>
}

export default PostPagePostCard
