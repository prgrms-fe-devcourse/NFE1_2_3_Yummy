import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

// 프로필 이미지 가져오기
const fetchProfileImage = async () => {
  const userId = localStorage.getItem('userId')
  const { data } = await axios.get(`/api/user/${userId}`)
  return data.profileImageUrl
}

// 프로필 이미지 업데이트
const updateProfileImage = async (newImageUrl: string) => {
  const { data } = await axios.put('/api/user/profile', {
    profileImageUrl: newImageUrl,
  })
  return data.profileImageUrl
}

export const useProfileImage = () => {
  const queryClient = useQueryClient()

  // useQuery로 프로필 이미지 가져오기 (객체 형식으로 queryKey와 queryFn 명시)
  const profileImageQuery = useQuery({
    queryKey: ['profileImage'],
    queryFn: fetchProfileImage,
  })

  // useMutation으로 프로필 이미지 업데이트하기 (mutationFn을 명시적으로 지정)
  const profileImageMutation = useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      // 업데이트 후 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['profileImage'] })
    },
  })

  return { profileImageQuery, profileImageMutation }
}
