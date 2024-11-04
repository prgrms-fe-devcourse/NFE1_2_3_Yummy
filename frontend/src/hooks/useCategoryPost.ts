import { useQuery } from '@tanstack/react-query'
import postApi from '@apis/postService'
import { Post } from '@/typings/db'

const QUERY_KEY = 'categoryPosts'
const CATEGORY_POSTS_QUERY_KEY = (category: string) => [QUERY_KEY, category]

const useCategoryPost = (category: string) => {
  const {
    data: categoryPosts,
    isLoading: isCategoryPostsLoading,
    isError: isCategoryPostsError,
    error: categoryPostsError,
  } = useQuery<Post[]>({
    queryKey: CATEGORY_POSTS_QUERY_KEY(category),
    queryFn: () => postApi.getCategoryPosts(category),
  })

  return {
    categoryPosts,
    isCategoryPostsLoading,
    isCategoryPostsError,
    categoryPostsError,
  }
}

export default useCategoryPost
