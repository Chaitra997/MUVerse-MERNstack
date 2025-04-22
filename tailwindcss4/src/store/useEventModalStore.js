// store/useEventModalStore.js
import { create } from "zustand";

export const useEventModalStore = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
