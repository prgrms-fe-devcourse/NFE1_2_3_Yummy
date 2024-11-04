import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// 프로필 이미지 가져오기
const fetchProfileImage = async (userId: any) => {
  const { data } = await axios.get(`/api/user/${userId}`)
  return data.profileImageUrl
}

export const useProfileImage = () => {
  // userId가 존재하는지 확인
  const userId = localStorage.getItem('userId')

  // useQuery로 프로필 이미지 가져오기 (객체 형식으로 queryKey와 queryFn 명시)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profileImage', userId],
    queryFn: () => fetchProfileImage(userId),
    enabled: !!userId, // userId가 있을 때만 쿼리를 실행
  })

  // 에러가 발생할 경우 기본 아바타 URL을 사용하도록 설정
  const profileImageUrl = isError
    ? 'https://example.com/default-avatar.jpg'
    : data

  return { profileImageUrl, isLoading, isError, error }
}
