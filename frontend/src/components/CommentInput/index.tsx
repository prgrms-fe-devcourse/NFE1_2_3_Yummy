import { useEffect, useState } from 'react'
import {
  CommentButton,
  CommentButtonContainer,
  CommentInputContainer,
  CommentTextArea,
} from './style'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { queryClient } from '@/apis/api'
import { CommentForm, CommentUpdateForm } from '@/utils/Model/commentModel'
import postApi from '@/apis/postService'
import { LoadingOutlined } from '@ant-design/icons'
import { useUpdateComment } from '@/hooks/useUpdateComment'

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

  if (!postId) return <div>포스트 아이디가 없습니다.</div>

  const [comment, setComment] = useState('')

  useEffect(() => {
    if (commentContent) {
      setComment(commentContent)
    }
  }, [commentContent])

  const {
    mutate: createComment,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useMutation({
    mutationFn: async (commentData: CommentForm) => {
      if (postId) {
        await postApi.createComment(postId, commentData)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', postId] })
      setComment('')
    },
  })

  const handleCancel = () => {
    inputState && inputState(false)
  }

  const { updateComment, isUpdatePending, isUpdateError, updateError } =
    useUpdateComment(postId, handleCancel)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const isPending = isCreatePending || isUpdatePending
  const isCommentEmpty = comment.trim() === ''
  const isUnchanged = commentContent === comment

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
          {isUpdatePending || isCreatePending ? (
            <LoadingOutlined />
          ) : (
            <p>{$isEdit ? '수정' : '댓글 작성'}</p>
          )}
        </CommentButton>
      </CommentButtonContainer>
    </CommentInputContainer>
  )
}

export default CommentInput
