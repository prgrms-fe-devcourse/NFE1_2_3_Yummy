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
import { useMutation } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import { queryClient } from '@/apis/api'

const PostSideButton = ({ post }: { post: Post }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { openModal } = usePostModal()

  // 포스트 정보
  const { user, hearts, _id: postId } = post
  const isLiked = hearts.includes(user._id)

  // 포스트 좋아요 뮤테이션
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => postApi.updatePostLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
    },
  })

  const handleLike = () => {
    if (isPending) return
    mutate()
  }

  const handleEdit = () => {
    navigate(`${pathname}/edit`)
  }

  return (
    <PostSideButtonContainer shape='square'>
      <PostSideButtonItem
        icon={<HeartFilled />}
        shape='square'
        description={hearts.length.toString()}
        $isLiked={isLiked}
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
