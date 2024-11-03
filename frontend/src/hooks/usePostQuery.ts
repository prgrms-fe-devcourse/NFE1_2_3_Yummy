import { useMutation, useQuery } from '@tanstack/react-query'
import postApi from '@/apis/postService'
import { Post, Posts } from '@/typings/db'
import { queryClient } from '@/apis/api'

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

export const useDeletePostQuery = (
  postId: string,
  onMutateAction: () => void,
) => {
  const {
    mutate: deletePost,
    isPending: isDeletingPost,
    isError: isDeletingPostError,
    error: deletingPostError,
    reset: deletePostReset,
  } = useMutation({
    mutationFn: async () => await postApi.deletePost(postId),
    onMutate: () => {
      const previousPosts = queryClient.getQueryData<Posts>(['topPosts'])

      queryClient.cancelQueries({ queryKey: ['topPosts'] })
      queryClient.setQueryData(['topPosts'], (prev: Posts) => ({
        ...prev,
        posts: prev.posts.filter((post) => post._id !== postId),
      }))

      onMutateAction()
      return { previousPosts }
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(['topPosts'], context?.previousPosts)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['topPosts'] })
    },
  })

  return {
    deletePost,
    isDeletingPost,
    isDeletingPostError,
    deletingPostError,
    deletePostReset,
  }
}
