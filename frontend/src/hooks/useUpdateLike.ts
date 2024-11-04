import { useMutation } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import { queryClient } from '@/apis/api'
import { POST_QUERY } from './usePostQuery'
import { Post } from '@/typings/db'

export const useUpdateLike = (postId: string, userId: string) => {
  const {
    mutate: updateLike,
    isPending: isUpdateLikePending,
    isError: isUpdateLikeError,
    error: updateLikeError,
  } = useMutation({
    mutationFn: () => postApi.updatePostLike(postId),

    onMutate: () => {
      const previousData: Post | undefined = queryClient.getQueryData(
        POST_QUERY(postId),
      )
      const isLiked = previousData?.hearts.includes(userId)

      queryClient.cancelQueries({ queryKey: POST_QUERY(postId) })
      queryClient.setQueryData(POST_QUERY(postId), (prev: Post) => ({
        ...prev,
        hearts: isLiked
          ? prev.hearts.filter((user_id) => user_id !== userId)
          : [...prev.hearts, userId],
      }))
      return { previousData }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(POST_QUERY(postId), context?.previousData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POST_QUERY(postId) })
    },
  })

  return { updateLike, isUpdateLikePending, isUpdateLikeError, updateLikeError }
}
