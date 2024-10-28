import { Post, Comment } from '@/typings/db'
import { CommentForm } from '@/utils/Model/commentModel'
import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const queryClient = new QueryClient()

const END_POINT = '/api'

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
  const response = await axios.get<Post[]>(`${END_POINT}/post`)
  return response.data
}

export const getComment = async (postId: string) => {
  const response = await axios.get<Comment[]>(
    `${END_POINT}/post/${postId}/comment`,
  )
  return response.data
}

export const createComment = async (commentData: CommentForm) => {
  const response = await axios.post<CommentForm>(
    `${END_POINT}/post/${commentData.postId}/comment`,
    commentData,
  )
  return response.data
}

export const updateComment = async (
  commentData: CommentForm,
  comment_id: string,
) => {
  const response = await axios.put<CommentForm>(
    `${END_POINT}/post/${commentData.postId}/comment/${comment_id}`,
    commentData,
  )
  return response.data
}

export const deleteComment = async (postId: string, comment_id: string) => {
  const response = await axios.delete(
    `${END_POINT}/post/${postId}/comment/${comment_id}`,
  )
  return response.data
}
