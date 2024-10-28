import { Post, Comment } from '@/typings/db'
import { CommentForm } from '@/utils/Model/commentModel'
import api from './ky'

const postApi = {
  getPost: async () => {
    const response = await api.get<Post[]>('post').json()
    return response
  },

  getPostById: async (id: string) => {
    const response = await api.get<Post>(`post/${id}`).json()
    return response
  },

  getComment: async (id: string) => {
    const response = await api.get<Comment[]>(`post/${id}/comment`).json()
    return response
  },

  createComment: async (id: string, commentData: CommentForm) => {
    const response = await api.post(`post/${id}/comment`, {
      json: commentData,
    })
    return response
  },

  updateComment: async (id: string, commentData: CommentForm) => {
    const response = await api.post(`post/${id}/comment`, {
      json: commentData,
    })
    return response
  },

  deleteComment: async (id: string, comment_id: string) => {
    const response = await api.delete(`post/${id}/comment/${comment_id}`)
    return response
  },
}

export default postApi
