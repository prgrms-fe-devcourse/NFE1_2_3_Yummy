import { useMutation } from '@tanstack/react-query'
import { DeleteModalContainer } from './style'
import postApi from '@/apis/postService'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { queryClient } from '@/apis/api'
import usePostModal from '@/store/usePostModal'

const DeleteModal = ({ type }: { type: 'post' | 'comment' }) => {
  const { id: postId } = useParams()
  const navigate = useNavigate()

  const { isModalOpen, closeModal } = usePostModal()

  const {
    mutate: deletePost,
    isPending: isDeletingPost,
    isError: isDeletingPostError,
    error: deletingPostError,
  } = useMutation({
    mutationFn: async () => {
      if (postId) {
        await postApi.deletePost(postId)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/')
    },
  })

  let content

  if (isDeletingPostError) {
    content = (
      <>
        <h3>삭제 실패</h3>
        <p>{deletingPostError.message}</p>
      </>
    )
  }

  if (type === 'post') {
    content = (
      <>
        <h3>정말로 삭제하시겠습니까?</h3>
        <p>삭제된 게시물은 복구할 수 없습니다.</p>
      </>
    )
  }

  const handleDelete = () => {
    deletePost()
  }

  return (
    <DeleteModalContainer
      open={isModalOpen}
      onCancel={closeModal}
      onOk={handleDelete}
      okText={isDeletingPost ? <LoadingOutlined /> : '삭제'}
      cancelText='취소'
      centered
    >
      {content}
    </DeleteModalContainer>
  )
}

export default DeleteModal
