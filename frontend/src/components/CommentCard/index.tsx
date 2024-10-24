import { CommentCardContainer, CommentCardInfo } from './style'

const CommentCard = () => {
  return (
    <CommentCardContainer>
      <CommentCardInfo>
        <img
          src='https://static.inews24.com/v1/0ea0b53518da00.jpg'
          alt=''
        />
        <div>
          <p>애드워드 리</p>
          <p>2024.01.01</p>
        </div>
      </CommentCardInfo>
    </CommentCardContainer>
  )
}

export default CommentCard
