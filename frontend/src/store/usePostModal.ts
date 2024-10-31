import { create } from 'zustand'

interface PostModalState {
  isModalOpen: { open: boolean; type: 'post' | 'comment' | null }
  openModal: (type: 'post' | 'comment') => void
  closeModal: () => void
}

export const usePostModal = create<PostModalState>((set) => ({
  isModalOpen: { open: false, type: null },
  openModal: (type) => set({ isModalOpen: { open: true, type } }),
  closeModal: () => set({ isModalOpen: { open: false, type: null } }),
}))

export default usePostModal
