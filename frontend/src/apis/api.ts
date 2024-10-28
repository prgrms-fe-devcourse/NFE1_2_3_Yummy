import { Post } from '@/typings/db'
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

getPost().then((res) => {
  console.log(res)
})
