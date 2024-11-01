import { useMutation } from '@tanstack/react-query'
import { DeleteModalContainer } from './style'
import postApi from '@/apis/postService'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { queryClient } from '@/apis/api'
import usePostModal from '@/store/usePostModal'
import { useEffect } from 'react'

interface DeleteModalProps {
  comment_id?: string
}

const DeleteModal = ({ comment_id }: DeleteModalProps) => {
  const { id: postId } = useParams()
  const navigate = useNavigate()

  const { isModalOpen, closeModal } = usePostModal()
  const { type: modalType } = isModalOpen

  const {
    mutate: deletePost,
    isPending: isDeletingPost,
    isError: isDeletingPostError,
    error: deletingPostError,
    reset: deletePostReset,
  } = useMutation({
    mutationFn: async () => {
      if (postId) await postApi.deletePost(postId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/')
      closeModal()
    },
  })

  const {
    mutate: deleteComment,
    isPending: isDeletingComment,
    isError: isDeletingCommentError,
    error: deletingCommentError,
    reset: deleteCommentReset,
  } = useMutation({
    mutationFn: async () => {
      if (postId && comment_id) await postApi.deleteComment(postId, comment_id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', postId] })
      closeModal()
    },
  })

  /**
   * 모달이 열리면 mutation 상태 초기화
   *
   * 상태 초기화 안될시 error 상태의 메세지가 계속 유지됨
   */

  useEffect(() => {
    if (isModalOpen.open) {
      deletePostReset()
      deleteCommentReset()
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

  if (isDeletingPostError || isDeletingCommentError) {
    content = (
      <>
        <h3>삭제 실패</h3>
        <p>{deletingPostError?.message || deletingCommentError?.message}</p>
      </>
    )
  }

  const handleDelete = () => (comment_id ? deleteComment() : deletePost())

  return (
    <DeleteModalContainer
      open={isModalOpen.open}
      onCancel={closeModal}
      onOk={handleDelete}
      okText={
        isDeletingPost || isDeletingComment ? <LoadingOutlined /> : '삭제'
      }
      cancelText='취소'
      centered
    >
      {content}
    </DeleteModalContainer>
  )
}

export default DeleteModal
