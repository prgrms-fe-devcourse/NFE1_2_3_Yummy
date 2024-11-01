import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// 프로필 이미지 가져오기
const fetchProfileImage = async () => {
  const userId = localStorage.getItem('userId')
  const { data } = await axios.get(`/api/user/${userId}`)
  return data.profileImageUrl
}

export const useProfileImage = () => {
  // useQuery로 프로필 이미지 가져오기 (객체 형식으로 queryKey와 queryFn 명시)
  const profileImageQuery = useQuery({
    queryKey: ['profileImage'],
    queryFn: fetchProfileImage,
  })

  return { profileImageQuery }
}
