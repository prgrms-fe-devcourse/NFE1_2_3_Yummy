import { DeleteModalContainer } from './style'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import usePostModal from '@/store/usePostModal'
import { useEffect } from 'react'
import { useDeleteComment } from '@/hooks/useUpdateComment'
import { useDeletePostQuery } from '@/hooks/usePostQuery'

interface DeleteModalProps {
  comment_id?: string
}

const DeleteModal = ({ comment_id }: DeleteModalProps) => {
  const { id: postId } = useParams()
  if (!postId) return <div>포스트 아이디가 없습니다.</div>

  const navigate = useNavigate()
  const { isModalOpen, closeModal } = usePostModal()
  const { type: modalType } = isModalOpen

  const onMutateAction = () => {
    closeModal()
    if (modalType === 'post') navigate('/')
  }

  const {
    deletePost,
    isDeletingPost,
    isDeletingPostError,
    deletingPostError,
    deletePostReset,
  } = useDeletePostQuery(postId, onMutateAction)

  const {
    deleteComment,
    isDeletePending,
    isDeleteError,
    deleteError,
    deleteCommentReset,
  } = useDeleteComment(postId, onMutateAction)

  /**
   * 모달이 열리면 mutation 상태 초기화
   *
   * 상태 초기화 안될시 error 상태의 메세지가 계속 유지됨
   */

  useEffect(() => {
    if (isModalOpen.open) {
      deletePostReset()
      // deleteCommentReset()
    }
  }, [isModalOpen.open, deletePostReset, deleteCommentReset])

  let content = (
    <>
      <h3>정말로 삭제하시겠습니까?</h3>
      <p>
        삭제된 {modalType === 'comment' ? '댓글' : '게시물'}은 복구할 수
        없습니다.
      </p>
    </>
  )

  if (isDeletingPostError || isDeleteError) {
    content = (
      <>
        <h3>삭제 실패</h3>
        <p>{deletingPostError?.message || deleteError?.message}</p>
      </>
    )
  }

  const handleDelete = () =>
    comment_id ? deleteComment(comment_id) : deletePost()

  return (
    <DeleteModalContainer
      open={isModalOpen.open}
      onCancel={closeModal}
      onOk={handleDelete}
      okText={isDeletingPost || isDeletePending ? <LoadingOutlined /> : '삭제'}
      cancelText='취소'
      centered
    >
      {content}
    </DeleteModalContainer>
  )
}

export default DeleteModal
