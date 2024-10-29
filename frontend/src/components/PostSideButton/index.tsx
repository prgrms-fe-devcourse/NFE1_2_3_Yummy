import {
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  MergeFilled,
} from '@ant-design/icons'
import { PostSideButtonContainer, PostSideButtonItem } from './style'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import usePostModal from '@/store/usePostModal'

const PostSideButton = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { openModal } = usePostModal()
  const [postLiked, setPostLiked] = useState(false)
  const [postLikeCount, setPostLikeCount] = useState(0)

  const handleLike = () => {
    setPostLiked(!postLiked)
    setPostLikeCount(postLiked ? postLikeCount - 1 : postLikeCount + 1)
  }

  const handleEdit = () => {
    navigate(`${pathname}/edit`)
  }

  return (
    <PostSideButtonContainer shape='square'>
      <PostSideButtonItem
        icon={<HeartFilled />}
        shape='square'
        description={postLikeCount.toString()}
        $isLiked={postLiked}
        onClick={handleLike}
      />
      <PostSideButtonItem icon={<MergeFilled />} />
      <PostSideButtonItem
        icon={<EditOutlined />}
        onClick={handleEdit}
      />
      <PostSideButtonItem
        icon={<DeleteOutlined />}
        onClick={openModal}
      />
    </PostSideButtonContainer>
  )
}

export default PostSideButton
