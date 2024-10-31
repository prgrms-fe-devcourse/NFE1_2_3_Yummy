import axios from 'axios'

const API_URL = 'http://localhost:3000/post'

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

import { Post, Comment, PostForm, Posts } from '@/typings/db'
import { CommentForm } from '@/utils/Model/commentModel'
import api from './ky'

interface SearchEvent {
  type: 'title' | 'content' | 'nickname'
  keyword: string
  length: number
  page: number
}

const postApi = {
  getPost: async (pageSize: number, pageNumber: number) => {
    const response = await api
      .get<Posts>(`post?limit=${pageSize}&page=${pageNumber}`)
      .json()
    return response
  },

  deletePost: async (id: string) => {
    const response = await api.delete(`post/${id}`)
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

  updatePost: async (id: string, postData: PostForm) => {
    const response = await api.put(`post/${id}`, {
      json: postData,
    })
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

  searchPost: async (searchEvent: SearchEvent) => {
    const { type, keyword, length, page } = searchEvent
    const response = await api
      .get<Posts>(
        `post/search/${type}?keyword=${keyword}&limit=${length}&page=${page}`,
      )
      .json()
    return response
  },

  getTopPosts: async (): Promise<Posts> => {
    const response = await api.get<Posts>('post').json()
    const posts = Array.isArray(response) ? response : response.posts || []
    const sortedPosts = posts.sort((a, b) => b.hearts.length - a.hearts.length)
    return {
      posts: sortedPosts.slice(0, 4),
      totalCount: sortedPosts.length,
    }
  },
}

export default postApi
