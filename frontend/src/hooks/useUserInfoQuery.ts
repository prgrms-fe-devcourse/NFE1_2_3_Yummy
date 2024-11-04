import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '@/apis/userService'
import { User, UserForm } from '@/typings/db'
import { queryClient } from '@/apis/api'
import uploadImage from '@/apis/cloudianry'

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

export const useUpdateUserInfoQuery = (
  userId: string,
  onMutateAction: () => void,
) => {
  const {
    mutate: updateUserInfo,
    isPending: isUpdatingUserInfo,
    isError: isUpdatingUserInfoError,
    error: updatingUserInfoError,
  } = useMutation({
    mutationFn: async (userData: UserForm) => {
      const updatedUserData = { ...userData }

      if (updatedUserData.profileImageUrl instanceof File) {
        const imageUrl = await uploadImage(updatedUserData.profileImageUrl)
        updatedUserData.profileImageUrl = imageUrl.secure_url
      }

      return userApi.updateUserData(updatedUserData)
    },

    onMutate: async (userData) => {
      const prevUserData = queryClient.getQueryData<User>(
        USER_INFO_QUERY(userId),
      )

      queryClient.cancelQueries({ queryKey: USER_INFO_QUERY(userId) })

      const optimisticData = { ...userData }

      // 이미지 파일인 경우 이미지를 base64로 변환
      if (optimisticData.profileImageUrl instanceof File) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()

          reader.onload = (event) => {
            if (typeof event.target?.result === 'string') {
              resolve(event.target.result)
            }
          }

          reader.readAsDataURL(optimisticData.profileImageUrl as File)
        })

        optimisticData.profileImageUrl = base64
      }

      queryClient.setQueryData(USER_INFO_QUERY(userId), (prev: User) => ({
        ...prev,
        ...optimisticData,
      }))

      onMutateAction()

      return { prevUserData }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(USER_INFO_QUERY(userId), context?.prevUserData)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_INFO_QUERY(userId) })
    },
  })

  return {
    updateUserInfo,
    isUpdatingUserInfo,
    isUpdatingUserInfoError,
    updatingUserInfoError,
  }
}
