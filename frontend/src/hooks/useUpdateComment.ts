import { useMutation } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import { CommentForm, CommentUpdateForm } from '@/utils/Model/commentModel'
import { queryClient } from '@/apis/api'
import { COMMENT_QUERY } from '@/hooks/userCommentQuery'
import { Comment } from '@/typings/db'
interface UseCreateCommentProps {
  postId: string
  onSettledCreateAction: () => void
}

/**
 * Optimistic Update를 위해 User 데이터 필요한 상황
 * 추후 논의 필요해보임
 */
export const useCreateComment = ({
  postId,
  onSettledCreateAction,
}: UseCreateCommentProps) => {
  const {
    mutate: createComment,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useMutation({
    mutationFn: async (commentData: CommentForm) =>
      await postApi.createComment(postId, commentData),

    onMutate: (commentData) => {
      const previousComment = queryClient.getQueryData<Comment[]>(
        COMMENT_QUERY(postId),
      )
      queryClient.cancelQueries({ queryKey: COMMENT_QUERY(postId) })
      queryClient.setQueryData(COMMENT_QUERY(postId), (prev: Comment[]) => [
        ...prev,
        commentData,
      ])

      return { previousComment }
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(COMMENT_QUERY(postId), context?.previousComment)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY(postId) })
      onSettledCreateAction()
    },
  })

  return {
    createComment,
    isCreatePending,
    isCreateError,
    createError,
  }
}

export const useDeleteComment = (
  postId: string,
  onMutateAction: () => void,
) => {
  const {
    mutate: deleteComment,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
    reset: deleteCommentReset,
  } = useMutation({
    mutationFn: async (commentId: string) =>
      await postApi.deleteComment(postId, commentId),

    onMutate: (commentId) => {
      const previousComment = queryClient.getQueryData<Comment[]>(
        COMMENT_QUERY(postId),
      )

      queryClient.cancelQueries({ queryKey: COMMENT_QUERY(postId) })

      queryClient.setQueryData(COMMENT_QUERY(postId), (prev: Comment[]) =>
        prev.filter((comment) => comment._id !== commentId),
      )
      onMutateAction()

      return { previousComment }
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(COMMENT_QUERY(postId), context?.previousComment)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY(postId) })
    },
  })

  return {
    deleteComment,
    isDeletePending,
    isDeleteError,
    deleteError,
    deleteCommentReset,
  }
}

export const useUpdateComment = (
  postId: string,
  onMutateAction: () => void,
) => {
  const {
    mutate: updateComment,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: async (commentUpdateData: CommentUpdateForm) =>
      await postApi.updateComment(commentUpdateData),

    onMutate: (commentUpdateData) => {
      const previousComment = queryClient.getQueryData<Comment[]>(
        COMMENT_QUERY(postId),
      )
      queryClient.cancelQueries({ queryKey: COMMENT_QUERY(postId) })
      queryClient.setQueryData(COMMENT_QUERY(postId), (prev: Comment[]) =>
        prev.map((comment) =>
          comment._id === commentUpdateData.commentId
            ? { ...comment, content: commentUpdateData.content }
            : comment,
        ),
      )

      onMutateAction()

      return { previousComment }
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(COMMENT_QUERY(postId), context?.previousComment)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY(postId) })
    },
  })

  return {
    updateComment,
    isUpdatePending,
    isUpdateError,
    updateError,
  }
}
