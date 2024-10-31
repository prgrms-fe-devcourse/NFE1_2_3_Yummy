import { User, UserForm } from '@/typings/db'
import api from './ky'

const userApi = {
  getUserData: async (id: string) => {
    const response = await api<User>(`user/${id}`).json()
    return response
  },

  updateUserData: async (userForm: UserForm) => {
    const response = await api.put<User>('user/profile', {
      json: userForm,
    })
    return response
  },
}

export default userApi
