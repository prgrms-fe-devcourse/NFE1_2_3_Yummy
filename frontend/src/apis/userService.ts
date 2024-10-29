import { User } from '@/typings/db'
import api from './ky'

const userApi = {
  getUserData: async (id: string) => {
    const response = await api.get(`user/${id}`).json()
    return response
  },

  updateUserData: async (userForm: User) => {
    const response = await api.put<User>('user/profile', {
      json: userForm,
    })
    return response
  },
}

export default userApi
