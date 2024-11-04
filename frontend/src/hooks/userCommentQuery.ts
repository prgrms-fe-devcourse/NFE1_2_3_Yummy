import { useQuery } from '@tanstack/react-query'
import postApi from '@/apis/postService'

const QUERY_KEY = 'comment'
export const COMMENT_QUERY = (postId: string) => [QUERY_KEY, postId]

export const useCommentQuery = (postId: string) => {
  const {
    data: commentData,
    isLoading: isCommentLoading,
    isError: isCommentError,
    error: commentError,
  } = useQuery({
    queryKey: COMMENT_QUERY(postId),
    queryFn: () => postApi.getComment(postId),
  })

  return { commentData, isCommentLoading, isCommentError, commentError }
}
