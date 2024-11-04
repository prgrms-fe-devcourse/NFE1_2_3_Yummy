import { useMutation } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import {
  CommentCreateForm,
  CommentForm,
  CommentUpdateForm,
} from '@/utils/Model/commentModel'
import { queryClient } from '@/apis/api'
import { COMMENT_QUERY } from '@/hooks/userCommentQuery'
import { Comment } from '@/typings/db'
import useUserInfo from '@/store/useUserInfo'
interface UseCreateCommentProps {
  postId: string
  handleCommentState: () => void
}

export const useCreateComment = ({
  postId,
  handleCommentState,
}: UseCreateCommentProps) => {
  const { userInfo } = useUserInfo()

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

      if (!userInfo) return

      const commentCreateData = new CommentCreateForm(
        commentData.content,
        commentData.postId,
        userInfo,
      )

      queryClient.cancelQueries({ queryKey: COMMENT_QUERY(postId) })
      queryClient.setQueryData(COMMENT_QUERY(postId), (prev: Comment[]) => [
        ...prev,
        commentCreateData,
      ])

      handleCommentState()

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
