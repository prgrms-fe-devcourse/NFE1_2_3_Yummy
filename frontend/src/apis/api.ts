import { Post, Comment } from '@/typings/db'
import { CommentForm } from '@/utils/Model/commentModel'
import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const queryClient = new QueryClient()

const END_POINT = '/api'
const TOKEN = import.meta.env.VITE_TOKEN
const REQUEST_HEADER = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
}

interface CustomError extends Error {
  code: number
  info: string
}

const handleError = async (error: CustomError) => {
  const customError: CustomError = {
    name: 'API 호출 에러',
    message: error.message,
    code: error.code,
    info: error.info,
  }
  throw customError
}

export const getPostById = async (id: string) => {
  try {
    const response = await axios.get<Post>(`${END_POINT}/post/${id}`)
    return response.data
  } catch (error) {
    handleError(error as CustomError)
  }
}

export const getPost = async () => {
  try {
    const response = await axios.get<Post[]>(`${END_POINT}/post`)
    return response.data
  } catch (error) {
    handleError(error as CustomError)
  }
}

export const getComment = async (postId: string) => {
  try {
    const response = await axios.get<Comment[]>(
      `${END_POINT}/post/${postId}/comment`,
    )
    return response.data
  } catch (error) {
    handleError(error as CustomError)
  }
}

export const createComment = async (commentData: CommentForm) => {
  try {
    const response = await axios.post<CommentForm>(
      `${END_POINT}/post/${commentData.postId}/comment`,
      { content: commentData.content },
      REQUEST_HEADER,
    )
    return response.data
  } catch (error) {
    handleError(error as CustomError)
  }
}

export const updateComment = async (
  commentData: CommentForm,
  comment_id: string,
) => {
  try {
    const response = await axios.put<CommentForm>(
      `${END_POINT}/post/${commentData.postId}/comment/${comment_id}`,
      commentData,
    )
    return response.data
  } catch (error) {
    handleError(error as CustomError)
  }
}

export const deleteComment = async (postId: string, comment_id: string) => {
  try {
    const response = await axios.delete(
      `${END_POINT}/post/${postId}/comment/${comment_id}`,
    )
    return response.data
  } catch (error) {
    handleError(error as CustomError)
  }
}
