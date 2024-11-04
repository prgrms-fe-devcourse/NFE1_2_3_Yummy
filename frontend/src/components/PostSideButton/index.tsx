import {
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  MergeFilled,
} from '@ant-design/icons'
import { PostSideButtonContainer, PostSideButtonItem } from './style'
import { useLocation, useNavigate } from 'react-router-dom'
import usePostModal from '@/store/usePostModal'
import { Post } from '@/typings/db'
import { checkAuthor, USER_ID } from '@/utils/user'
import { useUpdateLike } from '@/hooks/useUpdateLike'

const PostSideButton = ({ post }: { post: Post }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { openModal } = usePostModal()

  // 포스트 정보
  const { hearts, _id: postId } = post
  const userId = USER_ID() || ''
  const isLiked = userId && hearts.includes(userId)

  const {
    updateLike,
    isUpdateLikePending,
    isUpdateLikeError,
    updateLikeError,
  } = useUpdateLike(postId, userId)

  const handleLike = () => {
    if (isUpdateLikePending) return
    updateLike()
  }

  const handleEdit = () => {
    navigate(`${pathname}/edit`)
  }

  const isAuthor = checkAuthor(post.user._id)

  return (
    <PostSideButtonContainer shape='square'>
      <PostSideButtonItem
        icon={<HeartFilled />}
        shape='square'
        description={hearts.length.toString()}
        $isLiked={!!isLiked}
        onClick={handleLike}
      />
      <PostSideButtonItem icon={<MergeFilled />} />
      {isAuthor && (
        <>
          <PostSideButtonItem
            icon={<EditOutlined />}
            onClick={handleEdit}
          />
          <PostSideButtonItem
            icon={<DeleteOutlined />}
            onClick={() => openModal('post')}
          />
        </>
      )}
    </PostSideButtonContainer>
  )
}

export default PostSideButton
