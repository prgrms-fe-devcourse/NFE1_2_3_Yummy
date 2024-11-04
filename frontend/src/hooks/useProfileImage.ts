import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// query 함수
const fetchProfileImage = async (userId: any) => {
  const { data } = await axios.get(`/api/user/${userId}`)
  return data.profileImageUrl
}

export const useProfileImage = () => {
  const userId = localStorage.getItem('userId')

  // useQuery로 프로필 이미지 가져오기
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profileImage', userId],
    queryFn: () => fetchProfileImage(userId),
    enabled: !!userId, // 쿼리 실행 조건
  })

  // 에러 처리 -> 기본 아바타 이미지
  const profileImageUrl = isError
    ? 'https://example.com/default-avatar.jpg'
    : data

  return { profileImageUrl, isLoading, isError, error }
}
