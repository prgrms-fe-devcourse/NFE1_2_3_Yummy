import { formatDate } from '@/utils/formatDate'
import {
  CommentCardButtonContainer,
  CommentCardContainer,
  CommentCardContent,
  CommentCardInfo,
} from './style'
import { Comment } from '@/typings/db'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import CommentInput from '../CommentInput'
import DeleteModal from '../DeleteModal'
import usePostModal from '@/store/usePostModal'

const CommentCard = ({ content, createdAt, _id, user }: Comment) => {
  const [isEdit, setIsEdit] = useState(false)

  const { openModal } = usePostModal()

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleOpenDeleteModal = () => {
    openModal('comment')
  }

  const authorProfileImage = user.profileImageUrl ? (
    <img
      src={user.profileImageUrl}
      alt='user Img'
    />
  ) : (
    <Avatar icon={<UserOutlined />} />
  )

  return (
    <CommentCardContainer>
      <DeleteModal comment_id={_id} />
      <CommentCardInfo>
        {authorProfileImage}
        <div>
          <p>{user.nickname}</p>
          <p>{formatDate(createdAt)}</p>
        </div>
      </CommentCardInfo>
      <CommentCardContent>{content}</CommentCardContent>
      <CommentCardButtonContainer>
        <button onClick={handleEdit}>
          <p>수정</p>
        </button>
        <button onClick={handleOpenDeleteModal}>
          <p>삭제</p>
        </button>
      </CommentCardButtonContainer>
      {isEdit && (
        <CommentInput
          $isEdit={true}
          commentContent={content}
          commentId={_id}
          inputState={setIsEdit}
        />
      )}
    </CommentCardContainer>
  )
}

export default CommentCard
