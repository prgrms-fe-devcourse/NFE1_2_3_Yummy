import { User } from '@/typings/db'
import { create } from 'zustand'

interface UserInfoState {
  userInfo: User | null
  setUserInfo: (userInfo: User) => void
}

const useUserInfo = create<UserInfoState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
}))

export default useUserInfo
