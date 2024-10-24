import { formatDate } from '@/utils/formatDate'
import {
  CommentCardButtonContainer,
  CommentCardContainer,
  CommentCardContent,
  CommentCardInfo,
  CommentReplyContainer,
} from './style'
import { PlusSquareOutlined } from '@ant-design/icons'

const CommentCard = () => {
  return (
    <CommentCardContainer>
      <CommentCardInfo>
        <img
          src='https://static.inews24.com/v1/0ea0b53518da00.jpg'
          alt='user Img'
        />
        <div>
          <p>애드워드 리</p>
          <p>{formatDate(new Date())}</p>
        </div>
      </CommentCardInfo>
      <CommentCardContent>잘 보고 갑니다</CommentCardContent>
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
