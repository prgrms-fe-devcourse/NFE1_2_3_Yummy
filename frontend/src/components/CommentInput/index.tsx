import { useEffect, useState } from 'react'
import {
  CommentButton,
  CommentButtonContainer,
  CommentInputContainer,
  CommentTextArea,
} from './style'
import { useParams } from 'react-router-dom'
import { CommentForm, CommentUpdateForm } from '@/utils/Model/commentModel'
import { LoadingOutlined } from '@ant-design/icons'
import { useCreateComment, useUpdateComment } from '@/hooks/useUpdateComment'
import ErrorPage from '@/pages/ErrorPage'
import { message } from 'antd'

interface CommentInputProps {
  $isEdit?: boolean
  commentContent?: string
  commentId?: string
  inputState?: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentInput = ({
  $isEdit,
  commentContent,
  commentId,
  inputState,
}: CommentInputProps) => {
  const { id: postId } = useParams()

  if (!postId)
    return (
      <ErrorPage
        title='포스트 아이디가 없습니다.'
        message='다시 시도해주세요.'
      />
    )

  const [comment, setComment] = useState('')

  useEffect(() => {
    if (commentContent) {
      setComment(commentContent)
    }
  }, [commentContent])

  const handleCancel = () => {
    inputState && inputState(false)
  }

  const handleCommentState = () => {
    setComment('')
  }

  const { createComment, isCreatePending, isCreateError } = useCreateComment({
    postId,
    handleCommentState,
  })

  const { updateComment, isUpdatePending, isUpdateError } = useUpdateComment(
    postId,
    handleCancel,
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleSubmit = () => {
    if (!postId || isCommentEmpty) return

    if ($isEdit && commentId) {
      const commentUpdateData = new CommentUpdateForm(
        comment,
        postId,
        commentId,
      )
      updateComment(commentUpdateData)
    } else {
      const commentCreateData = new CommentForm(comment, postId)
      createComment(commentCreateData)
    }
  }

  if (isCreateError || isUpdateError) {
    message.error('댓글 작성 중 오류 발생')
  }

  const isPending = isCreatePending || isUpdatePending
  const isCommentEmpty = comment.trim() === ''
  const isUnchanged = commentContent === comment

  const buttonText = isPending ? (
    <LoadingOutlined />
  ) : (
    <p>{$isEdit ? '수정' : '댓글 작성'}</p>
  )

  return (
    <CommentInputContainer $isEdit={$isEdit ?? false}>
      <CommentTextArea
        placeholder='댓글을 입력해주세요.'
        value={comment}
        onChange={handleChange}
      />
      <CommentButtonContainer>
        <CommentButton
          $isDisplay={$isEdit ?? false}
          $isCancel={$isEdit ?? false}
          onClick={handleCancel}
          disabled={isPending}
        >
          <p>취소</p>
        </CommentButton>
        <CommentButton
          $isDisplay={true}
          disabled={isCommentEmpty || isPending || isUnchanged}
          onClick={handleSubmit}
        >
          {buttonText}
        </CommentButton>
      </CommentButtonContainer>
    </CommentInputContainer>
  )
}

export default CommentInput
