import { create } from 'zustand'

export const counterStore = create((set) => ({
  count: 0,
  services: [],
  uploading: false,
  inc: (num: number) => set(() => ({ count: num })),
  setServices: (services: any) => set(() => ({ services: services })),
  setUploading: (uploading: boolean) => set(() => ({ uploading: uploading })),
}))
