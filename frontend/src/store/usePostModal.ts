import { create } from 'zustand'

interface PostModalState {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const usePostModal = create<PostModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}))

export default usePostModal
