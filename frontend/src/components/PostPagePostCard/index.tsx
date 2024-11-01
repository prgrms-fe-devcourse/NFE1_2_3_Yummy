import { formatDate } from '@/utils/formatDate'
import {
  AuthorDetail,
  AuthorProfileImage,
  Dot,
  PostContent,
  PostDetail,
  PostInfo,
  PostPagePostCardContainer,
} from './style'

import { UserOutlined } from '@ant-design/icons'
import { Post } from '@typings/db'
import { Avatar } from 'antd'
import DOMPurify from 'dompurify'

const PostPagePostCard = ({
  user,
  category,
  title,
  createdAt,
  content,
}: Post) => {
  const { profileImageUrl, nickname } = user
  const sanitizedData = DOMPurify.sanitize(content)

  const authorProfileImage = profileImageUrl ? (
    <AuthorProfileImage
      src={profileImageUrl}
      alt='Author'
    />
  ) : (
    <Avatar icon={<UserOutlined />} />
  )

  return (
    <PostPagePostCardContainer>
      <PostInfo>
        <p>{category}</p>
        <h1>{title}</h1>
        <PostDetail>
          <AuthorDetail>
            {authorProfileImage}
            <span>{nickname}</span>
          </AuthorDetail>
          <Dot>·</Dot>
          <p>{formatDate(createdAt)}</p>
        </PostDetail>
      </PostInfo>

      <PostContent dangerouslySetInnerHTML={{ __html: sanitizedData }} />
    </PostPagePostCardContainer>
  )
}

export default PostPagePostCard
