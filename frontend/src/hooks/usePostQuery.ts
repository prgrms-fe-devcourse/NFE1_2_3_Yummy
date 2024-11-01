import { useQuery } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import { Post } from '@/typings/db'

const QUERY_KEY = 'post'
export const POST_QUERY = (postId: string) => [QUERY_KEY, postId]

export const usePostQuery = (postId: string) => {
  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = useQuery<Post>({
    queryKey: POST_QUERY(postId),
    queryFn: () => postApi.getPostById(postId),
  })

  return { postData, isPostLoading, isPostError, postError }
}
