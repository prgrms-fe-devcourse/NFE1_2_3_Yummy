import { useNavigate } from 'react-router-dom'

export const useNavigateTo = () => {
  const navigate = useNavigate()
  const handleNavigateTo = (path: string) => {
    navigate(path)
  }

  return handleNavigateTo
}
