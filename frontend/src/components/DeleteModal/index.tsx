import { useMutation } from '@tanstack/react-query'
import { DeleteModalContainer } from './style'
import postApi from '@/apis/postService'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { queryClient } from '@/apis/api'

interface DeleteModalProps {
  isModalOpen: boolean
  onhandleDeleteModal: () => void
}

const DeleteModal = ({
  isModalOpen,
  onhandleDeleteModal,
}: DeleteModalProps) => {
  const { id: postId } = useParams()
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
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

  if (isError) {
    content = (
      <>
        <h3>삭제 실패</h3>
        <p>{error.message}</p>
      </>
    )
  }

  if (isModalOpen) {
    content = (
      <>
        <h3>정말로 삭제하시겠습니까?</h3>
        <p>삭제된 게시물은 복구할 수 없습니다.</p>
      </>
    )
  }

  const handleDelete = () => {
    mutate()
  }

  return (
    <DeleteModalContainer
      open={isModalOpen}
      onCancel={onhandleDeleteModal}
      onOk={handleDelete}
      okText={isPending ? <LoadingOutlined /> : '삭제'}
      cancelText='취소'
      centered
    >
      {content}
    </DeleteModalContainer>
  )
}

export default DeleteModal
