import { useQuery } from '@tanstack/react-query'
import userApi from '@/apis/userService'
import { User } from '@/typings/db'

const QUERY_KEY = 'userData'
export const USER_INFO_QUERY = (userId: string) => [QUERY_KEY, userId]

export const useUserInfoQuery = (userId: string) => {
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
    error: userDataError,
  } = useQuery<User>({
    queryKey: USER_INFO_QUERY(userId),
    queryFn: () => userApi.getUserData(userId),
  })

  return { userData, isUserDataLoading, isUserDataError, userDataError }
}
