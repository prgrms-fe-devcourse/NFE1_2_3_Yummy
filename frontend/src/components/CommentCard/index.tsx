import { formatDate } from '@/utils/formatDate'
import {
  CommentCardButtonContainer,
  CommentCardContainer,
  CommentCardContent,
  CommentCardInfo,
  CommentReplyContainer,
} from './style'
import { PlusSquareOutlined } from '@ant-design/icons'
import { Comment } from '@/typings/db'

const CommentCard = ({ content, author, createdAt }: Comment) => {
  return (
    <CommentCardContainer>
      <CommentCardInfo>
        <img
          src='https://static.inews24.com/v1/0ea0b53518da00.jpg'
          alt='user Img'
        />
        <div>
          <p>{author}</p>
          <p>{formatDate(createdAt)}</p>
        </div>
      </CommentCardInfo>
      <CommentCardContent>{content}</CommentCardContent>
      <CommentCardButtonContainer>
        <CommentReplyContainer>
          <button>
            <PlusSquareOutlined />
          </button>
          <p>답글 달기</p>
        </CommentReplyContainer>
        <button>
          <p>삭제</p>
        </button>
      </CommentCardButtonContainer>
    </CommentCardContainer>
  )
}

export default CommentCard
